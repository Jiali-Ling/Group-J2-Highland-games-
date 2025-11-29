import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData, Link, useNavigation, useSearchParams } from "@remix-run/react";
import { requireUser, getUser } from "~/utils/session.server";
import { storage } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";
import { useState } from "react";
import { siteContent } from "~/config/site-content";
import teamsStyles from "~/styles/teams.css";

export function links() {
  return [{ rel: "stylesheet", href: teamsStyles }];
}

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/auth?returnTo=/teams");
  }

  const session = await storage.getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("admin") === true;

  if (isAdmin) {
    const allTeams = await prisma.team.findMany({
      include: {
        owner: { 
          select: { 
            id: true, 
            email: true 
          } 
        },
        members: {
          include: {
            user: { 
              select: { 
                id: true, 
                email: true 
              } 
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    const allTeamsWithOwnership = allTeams.map(team => ({
      team,
      isOwner: team.ownerId === user.id
    }));

    console.log(`[Teams Loader] Admin view - All teams: ${allTeams.length}`);
    console.log(`[Teams Loader] Teams by owner:`, allTeams.map(t => ({ id: t.id, name: t.name, ownerEmail: t.owner?.email })));

    return json({ 
      userTeams: [], 
      ownedTeams: allTeams.filter(t => t.ownerId === user.id), 
      allTeams: allTeamsWithOwnership, 
      user,
      isAdmin: true
    });
  }

  const userTeams = await prisma.teamMember.findMany({
    where: { userId: user.id },
    include: {
      team: {
        include: {
          owner: { select: { email: true } },
          members: {
            include: {
              user: { select: { id: true, email: true } }
            }
          }
        }
      }
    }
  });

  const ownedTeams = await prisma.team.findMany({
    where: { ownerId: user.id },
    include: {
      owner: { select: { email: true } },
      members: {
        include: {
          user: { select: { id: true, email: true } }
        }
      }
    }
  });

  const allTeamIds = new Set();
  const allTeams = [];
  
  ownedTeams.forEach(team => {
    if (!allTeamIds.has(team.id)) {
      allTeamIds.add(team.id);
      allTeams.push({ team, isOwner: true });
    }
  });
  
  userTeams.forEach(({ team }) => {
    if (!allTeamIds.has(team.id)) {
      allTeamIds.add(team.id);
      allTeams.push({ team, isOwner: team.ownerId === user.id });
    }
  });

  console.log(`[Teams Loader] User ID: ${user.id}, Owned: ${ownedTeams.length}, UserTeams: ${userTeams.length}, AllTeams: ${allTeams.length}`);

  return json({ userTeams, ownedTeams, allTeams, user, isAdmin: false });
}

export async function action({ request }) {
  const userId = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "create") {
      const name = formData.get("name")?.toString().trim();
      const description = formData.get("description")?.toString().trim();

      if (!name || name.length < 2) {
        return json({ error: "Team name must be at least 2 characters" }, { status: 400 });
      }

      const existingTeam = await prisma.team.findFirst({
        where: {
          name: name,
          ownerId: userId
        }
      });

      if (existingTeam) {
        return json({ error: `You already have a team named "${name}". Please choose a different name.` }, { status: 400 });
      }

      let inviteCode;
      let isUnique = false;
      let attempts = 0;
      while (!isUnique && attempts < 10) {
        inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();
        const existing = await prisma.team.findUnique({
          where: { inviteCode }
        });
        if (!existing) {
          isUnique = true;
        }
        attempts++;
      }

      if (!isUnique) {
        return json({ error: "Failed to generate unique invite code. Please try again." }, { status: 500 });
      }

      const team = await prisma.team.create({
        data: {
          name,
          description: description || "",
          inviteCode,
          ownerId: userId
        }
      });

      await prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: userId,
          role: "owner"
        }
      });

      console.log(`[Teams Action] Team created: ${team.name} (ID: ${team.id}, Invite: ${team.inviteCode}) by user ${userId}`);

      return redirect("/teams?created=1");
    }

    if (intent === "join") {
      const inviteCode = formData.get("inviteCode")?.toString().trim().toUpperCase();

      if (!inviteCode) {
        return json({ error: "Please enter an invite code" }, { status: 400 });
      }

      const team = await prisma.team.findUnique({
        where: { inviteCode }
      });

      if (!team) {
        return json({ error: "Invalid invite code" }, { status: 404 });
      }

      const existing = await prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId: team.id,
            userId: userId
          }
        }
      });

      if (existing) {
        return json({ error: "You are already a member of this team" }, { status: 400 });
      }

      await prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: userId,
          role: "member"
        }
      });

      return redirect("/teams?joined=1");
    }

    if (intent === "leave") {
      const teamId = parseInt(formData.get("teamId"));

      const teamMember = await prisma.teamMember.findUnique({
        where: {
          teamId_userId: {
            teamId,
            userId
          }
        }
      });

      if (!teamMember) {
        return json({ error: "You are not a member of this team" }, { status: 404 });
      }

      const team = await prisma.team.findUnique({
        where: { id: teamId }
      });

      if (team && team.ownerId === userId) {
        return json({ error: "Team owners cannot leave their own team. Please delete the team instead." }, { status: 400 });
      }

      await prisma.teamMember.delete({
        where: {
          teamId_userId: {
            teamId,
            userId
          }
        }
      });

      return redirect("/teams?left=1");
    }

    if (intent === "update") {
      const teamId = parseInt(formData.get("teamId"));
      const name = formData.get("name")?.toString().trim();
      const description = formData.get("description")?.toString().trim();

      const team = await prisma.team.findUnique({
        where: { id: teamId }
      });

      if (!team || team.ownerId !== userId) {
        return json({ error: "You don't have permission to update this team" }, { status: 403 });
      }

      if (!name || name.length < 2) {
        return json({ error: "Team name must be at least 2 characters" }, { status: 400 });
      }

      await prisma.team.update({
        where: { id: teamId },
        data: {
          name,
          description: description || ""
        }
      });

      return json({ success: true, message: "Team updated successfully" });
    }

    if (intent === "delete") {
      const teamId = parseInt(formData.get("teamId"));

      const session = await storage.getSession(request.headers.get("Cookie"));
      const isAdmin = session.get("admin") === true;

      const team = await prisma.team.findUnique({
        where: { id: teamId }
      });

      if (!team) {
        return json({ error: "Team not found" }, { status: 404 });
      }

      if (!isAdmin && team.ownerId !== userId) {
        return json({ error: "You don't have permission to delete this team" }, { status: 403 });
      }

      await prisma.teamMember.deleteMany({
        where: { teamId }
      });

      await prisma.team.delete({
        where: { id: teamId }
      });

      return redirect("/teams?deleted=1");
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Team action error:", error);
    return json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export default function Teams() {
  const { userTeams, ownedTeams, allTeams, user, isAdmin } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const content = siteContent.teams;
  const isCreated = searchParams.get("created") === "1";
  const isJoined = searchParams.get("joined") === "1";
  const isDeleted = searchParams.get("deleted") === "1";
  const isLeft = searchParams.get("left") === "1";

  return (
    <main className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>{content.pageTitle}</h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          {content.pageDescription}
        </p>
      </div>

      {actionData?.error && (
        <div style={{
          background: "var(--error-bg)",
          border: "1px solid var(--error-border)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          color: "var(--error-text)"
        }}>
          ⚠️ {actionData.error}
        </div>
      )}

      {(actionData?.success && actionData?.message) || isCreated || isJoined || isDeleted || isLeft ? (
        <div style={{
          background: "var(--success-bg)",
          border: "1px solid var(--success-border)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          color: "var(--success-text)"
        }}>
          ✓ {actionData?.message || (isCreated ? "Team created successfully!" : isJoined ? "Successfully joined team!" : isDeleted ? "Team deleted successfully!" : isLeft ? "Left team successfully!" : "")}
        </div>
      ) : null}

      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <button
          onClick={() => {
            setShowCreateForm(!showCreateForm);
            setShowJoinForm(false);
          }}
          style={{
            padding: "0.75rem 1.5rem",
            background: "var(--brand)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {showCreateForm ? "Cancel" : "Create Team"}
        </button>
        <button
          onClick={() => {
            setShowJoinForm(!showJoinForm);
            setShowCreateForm(false);
          }}
          style={{
            padding: "0.75rem 1.5rem",
            background: "white",
            color: "var(--brand)",
            border: "2px solid var(--brand)",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          {showJoinForm ? "Cancel" : "Join Team"}
        </button>
      </div>

      {showCreateForm && (
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1.5rem", color: "var(--heading-text)" }}>Create New Team</h3>
          <Form method="post">
            <input type="hidden" name="intent" value="create" />
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
                Team Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--input-border)",
                  borderRadius: "8px",
                  background: "var(--input-bg)",
                  color: "var(--input-text)"
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--input-border)",
                  borderRadius: "8px",
                  background: "var(--input-bg)",
                  color: "var(--input-text)"
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.75rem 2rem",
                background: "var(--brand)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {isSubmitting ? "Creating..." : "Create Team"}
            </button>
          </Form>
        </div>
      )}

      {showJoinForm && (
        <div style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1.5rem", color: "var(--heading-text)" }}>Join Team</h3>
          <Form method="post">
            <input type="hidden" name="intent" value="join" />
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="inviteCode" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
                Team Invite Code
              </label>
              <input
                type="text"
                id="inviteCode"
                name="inviteCode"
                required
                placeholder="Enter 8-character code"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid var(--input-border)",
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  background: "var(--input-bg)",
                  color: "var(--input-text)"
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: "0.75rem 2rem",
                background: "var(--brand)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {isSubmitting ? "Joining..." : "Join Team"}
            </button>
          </Form>
        </div>
      )}

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
          {isAdmin ? "All Teams" : "Your Teams"} ({allTeams?.length || userTeams.length})
        </h2>
        {isAdmin && (
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "1rem", fontStyle: "italic" }}>
            Admin view: Showing all teams in the system
          </p>
        )}
        {(!allTeams || allTeams.length === 0) && userTeams.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>You haven't joined any teams yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {(allTeams || userTeams.map(({ team }) => ({ team, isOwner: team.ownerId === user.id }))).map(({ team, isOwner }) => (
              <div key={team.id} style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <h3 style={{ marginBottom: "0.5rem", color: "var(--heading-text)" }}>{team.name}</h3>
                    {team.description && (
                      <p style={{ color: "var(--description-text)", marginBottom: "0.5rem" }}>{team.description}</p>
                    )}
                    <p style={{ fontSize: "0.9rem", color: "var(--description-text)" }}>
                      Owner: {team.owner.email}
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>
                      Members: {team.members.length}
                    </p>
                    <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                      <strong>Invite Code:</strong> <code style={{
                        background: "#f5f5f5",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px"
                      }}>{team.inviteCode}</code>
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                    {isAdmin ? (
                      <Form method="post">
                        <input type="hidden" name="intent" value="delete" />
                        <input type="hidden" name="teamId" value={team.id} />
                        <button
                          type="submit"
                          style={{
                            padding: "0.5rem 1rem",
                            background: "var(--danger-bg)",
                            color: "var(--danger-text)",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.9rem"
                          }}
                          onClick={(e) => {
                            if (!confirm(`Are you sure you want to delete team "${team.name}"? This action cannot be undone.`)) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Delete Team
                        </button>
                      </Form>
                    ) : (
                      <>
                        {!isOwner && (
                          <Form method="post">
                            <input type="hidden" name="intent" value="leave" />
                            <input type="hidden" name="teamId" value={team.id} />
                            <button
                              type="submit"
                              style={{
                                padding: "0.5rem 1rem",
                                background: "var(--danger-bg)",
                                color: "var(--danger-text)",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontSize: "0.9rem"
                              }}
                            >
                              Leave Team
                            </button>
                          </Form>
                        )}
                        {isOwner && (
                          <span style={{
                            padding: "0.25rem 0.5rem",
                            background: "var(--brand)",
                            color: "white",
                            borderRadius: "4px",
                            fontSize: "0.85rem",
                            fontWeight: "600"
                          }}>
                            Owner
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {!isAdmin && (
      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Teams You Own</h2>
        {ownedTeams.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>You haven't created any teams yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {ownedTeams.map((team) => (
              <div key={team.id} style={{
                background: "var(--card-bg)",
                border: "2px solid var(--brand)",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                {editingTeam === team.id ? (
                  <Form method="post" onSubmit={() => setEditingTeam(null)}>
                    <input type="hidden" name="intent" value="update" />
                    <input type="hidden" name="teamId" value={team.id} />
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
                        Team Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={team.name}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid var(--input-border)",
                          borderRadius: "8px",
                          background: "var(--input-bg)",
                          color: "var(--input-text)"
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
                        Description
                      </label>
                      <textarea
                        name="description"
                        rows="3"
                        defaultValue={team.description}
                        style={{
                          width: "100%",
                          padding: "0.75rem",
                          border: "1px solid var(--input-border)",
                          borderRadius: "8px",
                          background: "var(--input-bg)",
                          color: "var(--input-text)"
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        type="submit"
                        style={{
                          padding: "0.5rem 1rem",
                          background: "var(--brand)",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer",
                          fontWeight: "600"
                        }}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingTeam(null)}
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#666",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                ) : (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ marginBottom: "0.5rem", color: "var(--heading-text)" }}>{team.name}</h3>
                        {team.description && (
                          <p style={{ color: "var(--description-text)", marginBottom: "0.5rem" }}>{team.description}</p>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          onClick={() => setEditingTeam(team.id)}
                          style={{
                            padding: "0.5rem 1rem",
                            background: "var(--brand)",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontSize: "0.9rem"
                          }}
                        >
                          Edit
                        </button>
                        <Form method="post" onSubmit={(e) => {
                          if (!confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
                            e.preventDefault();
                          }
                        }}>
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="teamId" value={team.id} />
                          <button
                            type="submit"
                            style={{
                              padding: "0.5rem 1rem",
                              background: "var(--danger-bg)",
                              color: "var(--danger-text)",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.9rem"
                            }}
                          >
                            Delete
                          </button>
                        </Form>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.9rem", marginBottom: "1rem" }}>
                      <strong>Invite Code:</strong> <code style={{
                        background: "#f5f5f5",
                        padding: "0.25rem 0.5rem",
                        borderRadius: "4px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        color: "#333"
                      }}>{team.inviteCode}</code>
                    </p>
                    <div>
                      <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem", color: "var(--heading-text)" }}>Members ({team.members.length}):</h4>
                      <ul style={{ listStyle: "none", padding: 0 }}>
                        {team.members.map((member) => (
                          <li key={member.id} style={{ padding: "0.25rem 0", fontSize: "0.9rem", color: "var(--description-text)" }}>
                            • {member.user.email} ({member.role})
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
      )}
    </main>
  );
}
