import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData, Link, useNavigation } from "@remix-run/react";
import { requireUser, getUser } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";
import { useState } from "react";

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/auth?returnTo=/teams");
  }

  // Get user's teams
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

  // Get teams owned by user
  const ownedTeams = await prisma.team.findMany({
    where: { ownerId: user.id },
    include: {
      members: {
        include: {
          user: { select: { id: true, email: true } }
        }
      }
    }
  });

  return json({ userTeams, ownedTeams, user });
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

      // Generate unique invite code
      const inviteCode = Math.random().toString(36).substring(2, 10).toUpperCase();

      const team = await prisma.team.create({
        data: {
          name,
          description: description || "",
          inviteCode,
          ownerId: userId
        }
      });

      // Add owner as team member
      await prisma.teamMember.create({
        data: {
          teamId: team.id,
          userId: userId,
          role: "owner"
        }
      });

      return json({ success: true, team });
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

      // Check if already a member
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

      return json({ success: true, message: "Successfully joined team!" });
    }

    if (intent === "leave") {
      const teamId = parseInt(formData.get("teamId"));

      await prisma.teamMember.delete({
        where: {
          teamId_userId: {
            teamId,
            userId
          }
        }
      });

      return json({ success: true, message: "Left team successfully" });
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Team action error:", error);
    return json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export default function Teams() {
  const { userTeams, ownedTeams, user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);

  return (
    <main className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Teams</h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          Create or join teams to compete together in Highland Games events
        </p>
      </div>

      {actionData?.error && (
        <div style={{
          background: "rgba(255, 107, 107, 0.1)",
          border: "1px solid rgba(255, 107, 107, 0.3)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          color: "#ff6b6b"
        }}>
          ⚠️ {actionData.error}
        </div>
      )}

      {actionData?.success && actionData?.message && (
        <div style={{
          background: "rgba(40, 167, 69, 0.1)",
          border: "1px solid rgba(40, 167, 69, 0.3)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          color: "#28a745"
        }}>
          ✓ {actionData.message}
        </div>
      )}

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
          background: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Create New Team</h3>
          <Form method="post">
            <input type="hidden" name="intent" value="create" />
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="name" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Team Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px"
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="description" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px"
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
          background: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "2rem",
          marginBottom: "2rem"
        }}>
          <h3 style={{ marginBottom: "1.5rem" }}>Join Team</h3>
          <Form method="post">
            <input type="hidden" name="intent" value="join" />
            <div style={{ marginBottom: "1.5rem" }}>
              <label htmlFor="inviteCode" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Team Invite Code *
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
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  textTransform: "uppercase"
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

      {actionData?.success && actionData?.team && (
        <div style={{
          background: "rgba(40, 167, 69, 0.1)",
          border: "1px solid rgba(40, 167, 69, 0.3)",
          borderRadius: "12px",
          padding: "1.5rem",
          marginBottom: "2rem"
        }}>
          <h3 style={{ color: "#28a745", marginBottom: "1rem" }}>✓ Team Created Successfully!</h3>
          <p style={{ marginBottom: "0.5rem" }}>
            <strong>Team Name:</strong> {actionData.team.name}
          </p>
          <p style={{ marginBottom: "1rem" }}>
            <strong>Invite Code:</strong> <code style={{
              background: "white",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "1.2rem",
              fontWeight: "bold"
            }}>{actionData.team.inviteCode}</code>
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Share this code with teammates to invite them!
          </p>
        </div>
      )}

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Your Teams</h2>
        {userTeams.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>You haven't joined any teams yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {userTeams.map(({ team }) => (
              <div key={team.id} style={{
                background: "white",
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <div>
                    <h3 style={{ marginBottom: "0.5rem" }}>{team.name}</h3>
                    {team.description && (
                      <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>{team.description}</p>
                    )}
                    <p style={{ fontSize: "0.9rem", color: "#666" }}>
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
                  {team.ownerId !== user.id && (
                    <Form method="post">
                      <input type="hidden" name="intent" value="leave" />
                      <input type="hidden" name="teamId" value={team.id} />
                      <button
                        type="submit"
                        style={{
                          padding: "0.5rem 1rem",
                          background: "#ff6b6b",
                          color: "white",
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
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Teams You Own</h2>
        {ownedTeams.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>You haven't created any teams yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "1rem" }}>
            {ownedTeams.map((team) => (
              <div key={team.id} style={{
                background: "white",
                border: "2px solid var(--brand)",
                borderRadius: "12px",
                padding: "1.5rem"
              }}>
                <h3 style={{ marginBottom: "0.5rem" }}>{team.name}</h3>
                {team.description && (
                  <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>{team.description}</p>
                )}
                <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  <strong>Invite Code:</strong> <code style={{
                    background: "#f5f5f5",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "4px",
                    fontSize: "1.1rem",
                    fontWeight: "bold"
                  }}>{team.inviteCode}</code>
                </p>
                <div style={{ marginTop: "1rem" }}>
                  <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Members ({team.members.length}):</h4>
                  <ul style={{ listStyle: "none", padding: 0 }}>
                    {team.members.map((member) => (
                      <li key={member.id} style={{ padding: "0.25rem 0", fontSize: "0.9rem" }}>
                        • {member.user.email} ({member.role})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
