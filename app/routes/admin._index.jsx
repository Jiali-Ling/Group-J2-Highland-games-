import { storage } from "../utils/session.server";
import { prisma } from "../utils/db.server";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useSearchParams, useActionData } from "@remix-run/react";
import { sendApprovalNotification } from "~/utils/email.server";
import adminStyles from "../styles/admin.css?url";

export const links = () => [{ rel: "stylesheet", href: adminStyles }];

export async function loader({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const isAdmin = session.get("admin") === true;
  const userEmail = session.get("userEmail");
  if (!isAdmin) return json({ isAdmin: false });
  
  const regs = await prisma.registration.findMany({
    include: {
      event: true,
      user: { select: { email: true } },
      team: { select: { name: true } }
    },
    orderBy: { submittedAt: "desc" },
    take: 100
  });
  
  const events = await prisma.event.findMany({ orderBy: { date: "asc" } });
  
  const pendingCount = await prisma.registration.count({
    where: { status: "pending" }
  });
  
  const dataRequests = await prisma.dataRequest.findMany({
    where: { status: "pending" },
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" }
  });
  
  return json({ isAdmin: true, regs, events, pendingCount, dataRequests, userEmail });
}

export async function action({ request }) {
  const form = await request.formData();
  const intent = form.get("_intent");
  const session = await storage.getSession(request.headers.get("Cookie"));
  
  if (intent === "login") {
    const email = form.get("email")?.toString();
    const password = form.get("password")?.toString();
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      session.set("admin", true);
      session.set("userEmail", email);
      return redirect("/admin", { headers: { "Set-Cookie": await storage.commitSession(session) } });
    }
    return json({ error: "Invalid credentials" }, { status: 400 });
  }
  
  if (intent === "approve" || intent === "reject") {
    const id = Number(form.get("id"));
    const rejectionReason = form.get("rejectionReason")?.toString().trim();
    const adminEmail = session.get("userEmail") || "admin";
    
    if (intent === "reject" && (!rejectionReason || rejectionReason.length < 5)) {
      return json({ error: "Please provide a reason for rejection (at least 5 characters)" }, { status: 400 });
    }
    
    const registration = await prisma.registration.findUnique({
      where: { id },
      include: { event: true, user: true }
    });
    
    await prisma.registration.update({
      where: { id },
      data: {
        status: intent === "approve" ? "approved" : "rejected",
        rejectionReason: intent === "reject" ? rejectionReason : null,
        reviewedAt: new Date(),
        reviewedBy: adminEmail
      }
    });
    
    await sendApprovalNotification(
      registration.email,
      registration.event.name,
      intent === "approve" ? "approved" : "rejected",
      rejectionReason
    );
    
    return json({ success: true });
  }
  
  if (intent === "processDataRequest") {
    const requestId = Number(form.get("requestId"));
    const action = form.get("action");
    
    await prisma.dataRequest.update({
      where: { id: requestId },
      data: {
        status: action === "approve" ? "completed" : "rejected",
        processedAt: new Date()
      }
    });
    
    return json({ success: true });
  }
  
  return json({ ok: true });
}

export default function Admin() {
  const data = useLoaderData();
  const actionData = useActionData();
  const [sp] = useSearchParams();
  
  if (!data.isAdmin) {
    return (
      <main className="admin-login">
        <div className="login-card">
          <h2>Admin Login</h2>
          {sp.get("msg")==="login" && <p className="notice">Please login to continue</p>}
          {actionData?.error && (
            <div style={{ background: "#ffebee", color: "#c62828", padding: "0.75rem", borderRadius: "8px", marginBottom: "1rem" }}>
              {actionData.error}
            </div>
          )}
          <Form method="post" className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="admin@example.com" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" placeholder="Enter password" required />
            </div>
            <button type="submit" name="_intent" value="login" className="btn btn-primary">Login</button>
            <p className="hint">admin@example.com / admin123</p>
          </Form>
        </div>
      </main>
    );
  }
  
  const pendingRegs = data.regs.filter(r => r.status === "pending");
  const approvedRegs = data.regs.filter(r => r.status === "approved");
  const rejectedRegs = data.regs.filter(r => r.status === "rejected");
  
  return (
    <main className="container admin-dashboard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <div>
          <h2>Admin Dashboard</h2>
          <p style={{ color: "var(--muted)" }}>Logged in as: {data.userEmail}</p>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ background: "#fff3cd", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#856404" }}>{data.pendingCount}</div>
            <div style={{ fontSize: "0.9rem", color: "#856404" }}>Pending Reviews</div>
          </div>
          <div style={{ background: "#d4edda", padding: "1rem", borderRadius: "8px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: "bold", color: "#155724" }}>{approvedRegs.length}</div>
            <div style={{ fontSize: "0.9rem", color: "#155724" }}>Approved</div>
          </div>
        </div>
      </div>

      {actionData?.error && (
        <div style={{ background: "#ffebee", color: "#c62828", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          ⚠️ {actionData.error}
        </div>
      )}

      {actionData?.success && (
        <div style={{ background: "#d4edda", color: "#155724", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
          ✓ Action completed successfully
        </div>
      )}

      <section className="dashboard-section">
        <h3>Pending Registrations ({pendingRegs.length})</h3>
        {pendingRegs.length === 0 ? (
          <p className="empty-state">No pending registrations.</p>
        ) : (
          <div className="registrations-list">
            {pendingRegs.map(r => (
              <div key={r.id} className="registration-item" style={{ background: "#fff3cd", border: "1px solid #ffc107" }}>
                <div className="reg-info">
                  <span className="reg-id">#{r.id}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>{r.email}</div>
                    <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
                      Event: {r.event.name}
                    </div>
                  </div>
                  <span className="category">{r.category}</span>
                  {r.team && (
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>Team: {r.team.name}</span>
                  )}
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    {new Date(r.submittedAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <Form method="post" className="reg-actions" style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <input type="hidden" name="id" value={r.id} />
                  <button name="_intent" value="approve" className="btn-small" style={{ background: "#28a745" }}>
                    ✓ Approve
                  </button>
                  <details style={{ marginTop: "0.5rem" }}>
                    <summary style={{ cursor: "pointer", fontSize: "0.9rem", color: "#666" }}>Reject with reason</summary>
                    <textarea
                      name="rejectionReason"
                      placeholder="Reason for rejection..."
                      rows="2"
                      style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem", border: "1px solid #ddd", borderRadius: "4px" }}
                    />
                    <button name="_intent" value="reject" className="btn-small btn-secondary" style={{ width: "100%", marginTop: "0.5rem" }}>
                      ✗ Reject
                    </button>
                  </details>
                </Form>
              </div>
            ))}
          </div>
        )}
      </section>

      {data.dataRequests.length > 0 && (
        <section className="dashboard-section" style={{ marginTop: "2rem" }}>
          <h3>Pending Data Requests ({data.dataRequests.length})</h3>
          <div className="registrations-list">
            {data.dataRequests.map(req => (
              <div key={req.id} className="registration-item" style={{ background: "#e7f3ff", border: "1px solid #2196F3" }}>
                <div className="reg-info">
                  <span className="reg-id">#{req.id}</span>
                  <div>
                    <strong>{req.requestType}</strong>
                    <div style={{ fontSize: "0.9rem", color: "#666" }}>{req.user.email}</div>
                    {req.reason && (
                      <div style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
                        {req.reason}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: "0.85rem", color: "#666" }}>
                    {new Date(req.createdAt).toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <Form method="post" className="reg-actions">
                  <input type="hidden" name="requestId" value={req.id} />
                  <button name="_intent" value="processDataRequest" formValue="action=approve" className="btn-small">
                    Process
                  </button>
                </Form>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="dashboard-section" style={{ marginTop: "2rem" }}>
        <h3>Approved Registrations ({approvedRegs.length})</h3>
        {approvedRegs.length === 0 ? (
          <p className="empty-state">No approved registrations yet.</p>
        ) : (
          <div className="registrations-list">
            {approvedRegs.slice(0, 10).map(r => (
              <div key={r.id} className="registration-item" style={{ background: "#d4edda", border: "1px solid #28a745" }}>
                <div className="reg-info">
                  <span className="reg-id">#{r.id}</span>
                  <strong>{r.name}</strong>
                  <span>{r.email}</span>
                  <span className="category">{r.category}</span>
                  <span className={`status status-${r.status}`}>✓ {r.status}</span>
                  {r.reviewedBy && (
                    <span style={{ fontSize: "0.85rem", color: "#666" }}>by {r.reviewedBy}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="dashboard-section" style={{ marginTop: "2rem" }}>
        <h3>Events</h3>
        <div className="events-list">
          {data.events.map(e => (
            <div key={e.id} className="event-item">
              <strong>{e.name}</strong>
              <span>{new Date(e.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} @ {e.location}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
