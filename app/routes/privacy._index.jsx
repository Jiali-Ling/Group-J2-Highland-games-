import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useActionData, useNavigation } from "@remix-run/react";
import { requireUser, getUser, storage } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";
import { sendDataRequestConfirmation } from "~/utils/email.server";
import privacyStyles from "~/styles/privacy.css";

export function links() {
  return [{ rel: "stylesheet", href: privacyStyles }];
}

export async function loader({ request }) {
  const user = await getUser(request);
  if (!user) {
    return redirect("/auth?returnTo=/privacy");
  }

  const dataRequests = await prisma.dataRequest.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  const consentLogs = await prisma.consentLog.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" }
  });

  return json({ user, dataRequests, consentLogs });
}

export async function action({ request }) {
  const userId = await requireUser(request);
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    if (intent === "exportData") {
      await prisma.dataRequest.create({
        data: {
          userId,
          requestType: "export",
          status: "pending"
        }
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      await sendDataRequestConfirmation(user.email, "Data Export");

      return json({
        success: true,
        message: "Data export request submitted. You will receive your data within 30 days."
      });
    }

    if (intent === "correctData") {
      const reason = formData.get("reason")?.toString().trim();

      if (!reason || reason.length < 10) {
        return json({ error: "Please provide details about what needs to be corrected (at least 10 characters)" }, { status: 400 });
      }

      await prisma.dataRequest.create({
        data: {
          userId,
          requestType: "correction",
          status: "pending",
          reason
        }
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      await sendDataRequestConfirmation(user.email, "Data Correction");

      return json({
        success: true,
        message: "Data correction request submitted. We will review and process your request."
      });
    }

    if (intent === "deleteAccount") {
      const confirmation = formData.get("confirmation")?.toString().trim();

      if (confirmation !== "DELETE") {
        return json({ error: 'Please type "DELETE" to confirm account deletion' }, { status: 400 });
      }

      await prisma.dataRequest.create({
        data: {
          userId,
          requestType: "deletion",
          status: "pending"
        }
      });

      const user = await prisma.user.findUnique({ where: { id: userId } });
      await sendDataRequestConfirmation(user.email, "Account Deletion");

      const session = await storage.getSession(request.headers.get("Cookie"));
      return redirect("/", {
        headers: {
          "Set-Cookie": await storage.destroySession(session)
        }
      });
    }

    return json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Privacy action error:", error);
    return json({ error: error.message || "An error occurred" }, { status: 500 });
  }
}

export default function Privacy() {
  const { user, dataRequests, consentLogs } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem", maxWidth: "900px", minHeight: "auto" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Privacy & Data Rights</h1>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem" }}>
          Manage your personal data and exercise your GDPR rights
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

      <div style={{ display: "grid", gap: "1.5rem", marginBottom: "3rem" }}>
        <div style={{
          background: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "1.5rem"
        }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>📦 Export Your Data</h2>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
            Download a copy of all your personal data in JSON format. This includes your profile, registrations, team memberships, and consent records.
          </p>
          <Form method="post">
            <input type="hidden" name="intent" value="exportData" />
            <button
              type="submit"
              disabled={isSubmitting}
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
              {isSubmitting ? "Processing..." : "Request Data Export"}
            </button>
          </Form>
        </div>

        <div style={{
          background: "white",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          padding: "1.5rem"
        }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>✏️ Correct Your Data</h2>
          <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
            If any of your personal information is inaccurate or incomplete, you can request a correction.
          </p>
          <Form method="post">
            <input type="hidden" name="intent" value="correctData" />
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="reason" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                What needs to be corrected?
              </label>
              <textarea
                id="reason"
                name="reason"
                required
                rows="3"
                placeholder="Please describe what information is incorrect and what it should be..."
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
                padding: "0.75rem 1.5rem",
                background: "var(--brand)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {isSubmitting ? "Submitting..." : "Submit Correction Request"}
            </button>
          </Form>
        </div>

        <div style={{
          background: "white",
          border: "2px solid #ff6b6b",
          borderRadius: "12px",
          padding: "1.5rem"
        }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: "0.5rem", color: "#ff6b6b" }}>🗑️ Delete Your Account</h2>
          <p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
            Permanently delete your account and all associated personal data.
          </p>
          <div style={{
            background: "rgba(255, 107, 107, 0.1)",
            border: "1px solid rgba(255, 107, 107, 0.3)",
            borderRadius: "8px",
            padding: "0.75rem",
            marginBottom: "1rem",
            fontSize: "0.85rem"
          }}>
            <strong>⚠️ Warning:</strong> This action cannot be undone. The following data will be permanently deleted:
            <ul style={{ marginTop: "0.5rem", marginLeft: "1.5rem" }}>
              <li>Your profile and personal information</li>
              <li>All your event registrations</li>
              <li>Team memberships and owned teams</li>
              <li>Consent and audit logs</li>
            </ul>
            <p style={{ marginTop: "0.5rem" }}>
              Some aggregated, anonymized data may be retained for legal compliance and statistical purposes.
            </p>
          </div>
          <Form method="post">
            <input type="hidden" name="intent" value="deleteAccount" />
            <div style={{ marginBottom: "1rem" }}>
              <label htmlFor="confirmation" style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600" }}>
                Type "DELETE" to confirm
              </label>
              <input
                type="text"
                id="confirmation"
                name="confirmation"
                required
                placeholder="DELETE"
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
                padding: "0.75rem 1.5rem",
                background: "#ff6b6b",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              {isSubmitting ? "Processing..." : "Delete My Account"}
            </button>
          </Form>
        </div>
      </div>

      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Your Data Requests</h2>
        {dataRequests.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>You haven't made any data requests yet.</p>
        ) : (
          <div style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Type</th>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Date</th>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Details</th>
                </tr>
              </thead>
              <tbody>
                {dataRequests.map((request) => (
                  <tr key={request.id} style={{ borderTop: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "1rem" }}>{request.requestType}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "12px",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        background: request.status === "completed" ? "#d4edda" : "#fff3cd",
                        color: request.status === "completed" ? "#155724" : "#856404"
                      }}>
                        {request.status}
                      </span>
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem" }}>
                      {new Date(request.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem" }}>
                      {request.reason || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>Consent History</h2>
        {consentLogs.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No consent records found.</p>
        ) : (
          <div style={{
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            overflow: "hidden"
          }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f5f5f5" }}>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Type</th>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Status</th>
                  <th style={{ padding: "1rem", textAlign: "left" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {consentLogs.map((log) => (
                  <tr key={log.id} style={{ borderTop: "1px solid #e0e0e0" }}>
                    <td style={{ padding: "1rem" }}>{log.consentType}</td>
                    <td style={{ padding: "1rem" }}>
                      {log.agreed ? "✓ Agreed" : "✗ Declined"}
                    </td>
                    <td style={{ padding: "1rem", fontSize: "0.9rem" }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
