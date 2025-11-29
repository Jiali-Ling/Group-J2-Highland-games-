import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData, useNavigation, useSearchParams } from "@remix-run/react";
import { requireUser, getUser } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";
import profileStyles from "~/styles/profile.css";

export function links() {
  return [{ rel: "stylesheet", href: profileStyles }];
}

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/auth?returnTo=/profile");
  }

  const userWithProfile = await prisma.user.findUnique({
    where: { id: user.id },
    include: { profile: true }
  });

  return json({ user: userWithProfile });
}

export async function action({ request }) {
  const userId = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "updateProfile") {
      const fullName = formData.get("fullName")?.toString().trim();
      const phone = formData.get("phone")?.toString().trim();
      const address = formData.get("address")?.toString().trim();
      const emergencyContact = formData.get("emergencyContact")?.toString().trim();
      const medicalInfo = formData.get("medicalInfo")?.toString().trim();
      const dateOfBirth = formData.get("dateOfBirth");

      if (!fullName || fullName.length < 2) {
        return json({ error: "Full name must be at least 2 characters" }, { status: 400 });
      }

      const existingProfile = await prisma.userProfile.findUnique({
        where: { userId }
      });

      if (existingProfile) {
        await prisma.userProfile.update({
          where: { userId },
          data: {
            fullName,
            phone: phone || null,
            address: address || null,
            emergencyContact: emergencyContact || null,
            medicalInfo: medicalInfo || null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
          }
        });
      } else {
        await prisma.userProfile.create({
          data: {
            userId,
            fullName,
            phone: phone || null,
            address: address || null,
            emergencyContact: emergencyContact || null,
            medicalInfo: medicalInfo || null,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null
          }
        });
      }

      return redirect("/profile?updated=1");
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Profile update error:", error);
    return json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export default function Profile() {
  const { user } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";
  const isUpdated = searchParams.get("updated") === "1";

  return (
    <main className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem", maxWidth: "800px" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Your Profile</h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          Manage your personal information and preferences
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

      {(actionData?.success || isUpdated) && (
        <div style={{
          background: "var(--success-bg)",
          border: "1px solid var(--success-border)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1.5rem",
          color: "var(--success-text)"
        }}>
          ✓ {actionData?.message || "Profile updated successfully"}
        </div>
      )}

      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem"
      }}>
        <h2 style={{ marginBottom: "0.5rem", color: "var(--heading-text)" }}>Account Information</h2>
        <p style={{ color: "var(--description-text)", marginBottom: "1rem", fontSize: "0.9rem" }}>
          Your email address is used for login and notifications
        </p>
        <div style={{ padding: "1rem", background: "#f5f5f5", borderRadius: "8px" }}>
          <p style={{ margin: 0 }}>
            <strong>Email:</strong> {user.email}
          </p>
          <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.9rem", color: "#666" }}>
            Status: {user.emailVerified ? "✓ Verified" : "⚠️ Not verified"}
          </p>
        </div>
      </div>

      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "12px",
        padding: "2rem"
      }}>
        <h2 style={{ marginBottom: "1rem", color: "var(--heading-text)" }}>Personal Information</h2>
        <Form method="post">
          <input type="hidden" name="intent" value="updateProfile" />
          
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              defaultValue={user.profile?.fullName || ""}
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
            <label htmlFor="dateOfBirth" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Date of Birth
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              defaultValue={user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split('T')[0] : ""}
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
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              defaultValue={user.profile?.phone || ""}
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
            <label htmlFor="address" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows="3"
              defaultValue={user.profile?.address || ""}
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
            <label htmlFor="emergencyContact" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Emergency Contact
            </label>
            <input
              type="text"
              id="emergencyContact"
              name="emergencyContact"
              placeholder="Name and phone number"
              defaultValue={user.profile?.emergencyContact || ""}
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
            <label htmlFor="medicalInfo" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "var(--label-text)" }}>
              Medical Information
            </label>
            <textarea
              id="medicalInfo"
              name="medicalInfo"
              rows="3"
              placeholder="Allergies, medical conditions, medications, etc."
              defaultValue={user.profile?.medicalInfo || ""}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid var(--input-border)",
                borderRadius: "8px",
                background: "var(--input-bg)",
                color: "var(--input-text)"
              }}
            />
            <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
              This information is kept confidential and only used for safety purposes
            </p>
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
              fontWeight: "600",
              fontSize: "1rem"
            }}
          >
            {isSubmitting ? "Saving..." : "Save Profile"}
          </button>
        </Form>
      </div>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <a
          href="/privacy"
          style={{
            color: "var(--brand)",
            textDecoration: "none",
            marginRight: "1rem"
          }}
        >
          Privacy & Data Rights
        </a>
        <a
          href="/auth/logout"
          style={{
            color: "#666",
            textDecoration: "none"
          }}
        >
          Sign Out
        </a>
      </div>
    </main>
  );
}
