import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { requireUser, getUser } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";

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

      // Check if profile exists
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

      return json({ success: true, message: "Profile updated successfully" });
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
  const isSubmitting = navigation.state === "submitting";

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

      {actionData?.success && (
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

      <div style={{
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem",
        marginBottom: "2rem"
      }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Account Information</h2>
        <p style={{ color: "var(--muted)", marginBottom: "1rem", fontSize: "0.9rem" }}>
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
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem"
      }}>
        <h2 style={{ marginBottom: "1rem" }}>Personal Information</h2>
        <Form method="post">
          <input type="hidden" name="intent" value="updateProfile" />
          
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="fullName" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
              Full Name *
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
                border: "1px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="dateOfBirth" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
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
                border: "1px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="phone" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
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
                border: "1px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="address" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
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
                border: "1px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="emergencyContact" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
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
                border: "1px solid #ddd",
                borderRadius: "8px"
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label htmlFor="medicalInfo" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
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
                border: "1px solid #ddd",
                borderRadius: "8px"
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
