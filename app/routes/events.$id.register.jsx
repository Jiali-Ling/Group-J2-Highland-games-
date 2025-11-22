import { prisma } from "../utils/db.server";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData, useNavigation, Link } from "@remix-run/react";
import { requireUser, getUser } from "~/utils/session.server";
import registerStyles from "../styles/register.css?url";
import { useEffect } from "react";

export const links = () => [{ rel: "stylesheet", href: registerStyles }];

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const options = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  };
  return date.toLocaleString('en-US', options);
}

export async function loader({ params, request }) {
  try {
    const user = await getUser(request);
    if (!user) {
      const url = new URL(request.url);
      return redirect(`/auth?mode=login&returnTo=${encodeURIComponent(url.pathname)}`);
    }
    
    const eventId = Number(params.id);
    if (isNaN(eventId)) {
      throw new Response("Invalid event ID", { status: 400 });
    }
    
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      throw new Response("Event not found", { status: 404 });
    }
    
    const userProfile = await prisma.userProfile.findUnique({
      where: { userId: user.id }
    });
    
    const userTeams = await prisma.teamMember.findMany({
      where: { userId: user.id },
      include: {
        team: {
          select: { id: true, name: true }
        }
      }
    });
    
    return json({ event, user, userProfile, userTeams });
  } catch (error) {
    console.error("Register page loader error:", error);
    if (error instanceof Response) {
      throw error;
    }
    throw new Response("Failed to load registration page", { status: 500 });
  }
}

export async function action({ request, params }) {
  const userId = await requireUser(request);
  const user = await getUser(request);
  
  let form;
  try {
    form = await request.formData();
    const name = form.get("name")?.toString().trim();
    const category = form.get("category")?.toString().trim();
    const teamId = form.get("teamId") ? Number(form.get("teamId")) : null;
    const agree = form.get("agree") === "on";
    const consentPrivacy = form.get("consentPrivacy") === "on";
    const consentRisk = form.get("consentRisk") === "on";


    const errors = {};
    if (!name || name.length < 2) errors.name = "Name must be at least 2 characters";
    if (!category || category.length < 2) errors.category = "Please specify which event you want to compete in";
    if (!agree) errors.agree = "You must agree to all terms to register";
    if (!consentPrivacy) errors.consentPrivacy = "You must agree to the privacy policy";
    if (!consentRisk) errors.consentRisk = "You must acknowledge the risks involved";

    if (Object.keys(errors).length) {
      return json({ errors, values: { name, category, teamId, agree } }, { status: 400 });
    }

    const registration = await prisma.registration.create({
      data: {
        eventId: Number(params.id),
        userId: userId,
        teamId: teamId,
        name, 
        email: user.email,
        category,
        status: "pending"
      }
    });

    await prisma.consentLog.create({
      data: {
        userId: userId,
        consentType: "event_registration",
        agreed: true,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown"
      }
    });

    await prisma.consentLog.create({
      data: {
        userId: userId,
        consentType: "privacy_policy",
        agreed: true,
        ipAddress: request.headers.get("x-forwarded-for") || "unknown"
      }
    });

    return redirect(`/events/${params.id}?registered=1`);
  } catch (error) {
    console.error("Registration error:", error);
    return json({ 
      error: "Failed to submit registration. Please try again.",
      values: form ? { 
        name: form.get("name")?.toString().trim() || "", 
        category: form.get("category")?.toString().trim() || "",
        teamId: form.get("teamId") ? Number(form.get("teamId")) : null,
        agree: form.get("agree") === "on"
      } : {}
    }, { status: 500 });
  }
}

export function ErrorBoundary() {
  return (
    <main className="container register-page">
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>Something went wrong</h2>
        <p>There was an error loading the registration page. Please try again.</p>
        <Link to="/events" style={{ color: "#007c89", textDecoration: "underline" }}>
          Back to Events
        </Link>
      </div>
    </main>
  );
}

export default function Register() {
  const loaderData = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoading = navigation.state === "loading";

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const main = document.querySelector('.register-page');
    if (main) {
      main.style.display = 'block';
      main.style.visibility = 'visible';
      main.style.opacity = '1';
    }
    
    const eventDetailPage = document.querySelector('.event-detail-page');
    if (eventDetailPage) {
      eventDetailPage.style.display = 'none';
    }
  }, []);

  if (!loaderData || isLoading) {
    return (
      <main className="container register-page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p style={{ fontSize: '18px', color: '#1e3a8a' }}>Loading registration page...</p>
        </div>
      </main>
    );
  }

  const { event, user, userProfile, userTeams } = loaderData;

  if (!event || !user) {
    return (
      <main className="container register-page">
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Error: Missing event or user data</p>
          <Link to="/events" style={{ color: "#007c89", textDecoration: "underline" }}>
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container register-page" style={{ display: 'block', visibility: 'visible', opacity: 1 }}>
      <div className="register-header">
        <h1>Register for Competition</h1>
        <p>Join us for an authentic Highland Games experience</p>
      </div>

      <div className="event-info">
        <h3>{event.name}</h3>
        <p suppressHydrationWarning>
          {formatEventDate(event.date)} • {event.location}
        </p>
        <p className="user-email-display">Registering as: <strong>{user.email}</strong></p>
      </div>

      {!userProfile && (
        <div style={{ 
          background: "rgba(255, 193, 7, 0.1)", 
          border: "1px solid rgba(255, 193, 7, 0.3)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          color: "#856404"
        }}>
          ⚠️ You haven't completed your profile yet. <Link to="/profile" style={{ color: "#007c89", fontWeight: "600" }}>Complete your profile</Link> for a better experience.
        </div>
      )}

      {actionData?.error && (
        <div style={{ 
          background: "rgba(255, 107, 107, 0.1)", 
          border: "1px solid rgba(255, 107, 107, 0.3)",
          borderRadius: "8px",
          padding: "16px",
          marginBottom: "24px",
          color: "#ff6b6b",
          textAlign: "center"
        }}>
          ⚠ {actionData.error}
        </div>
      )}

      <Form 
        method="post" 
        className="register-form"
      >
        <div className="form-field">
          <label htmlFor="name">Full Name *</label>
          <input 
            id="name"
            name="name" 
            type="text"
            required
            placeholder="Enter your full name"
            defaultValue={actionData?.values?.name || userProfile?.fullName || ""} 
            aria-invalid={!!actionData?.errors?.name}
            disabled={isSubmitting}
          />
          {actionData?.errors?.name && (
            <div className="error-message">{actionData.errors.name}</div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="category">Competition Event *</label>
          <select 
            id="category"
            name="category" 
            required
            defaultValue={actionData?.values?.category || ""} 
            aria-invalid={!!actionData?.errors?.category}
            disabled={isSubmitting}
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "1rem"
            }}
          >
            <option value="">Select an event...</option>
            <option value="Caber Toss">Caber Toss</option>
            <option value="Stone Put">Stone Put</option>
            <option value="Hammer Throw">Hammer Throw</option>
            <option value="Weight for Height">Weight for Height</option>
            <option value="Tug o' War">Tug o' War</option>
            <option value="Hill Race">Hill Race</option>
            <option value="Highland Dancing">Highland Dancing</option>
            <option value="Piping">Piping</option>
          </select>
          {actionData?.errors?.category && (
            <div className="error-message">{actionData.errors.category}</div>
          )}
        </div>

        {userTeams.length > 0 && (
          <div className="form-field">
            <label htmlFor="teamId">Compete as Team (Optional)</label>
            <select 
              id="teamId"
              name="teamId"
              defaultValue={actionData?.values?.teamId || ""}
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem"
              }}
            >
              <option value="">Individual (No Team)</option>
              {userTeams.map(({ team }) => (
                <option key={team.id} value={team.id}>{team.name}</option>
              ))}
            </select>
            <p style={{ fontSize: "0.85rem", color: "#666", marginTop: "0.25rem" }}>
              Select a team if you want to compete as part of a team
            </p>
          </div>
        )}

        <div style={{ 
          background: "#f5f5f5", 
          padding: "1.5rem", 
          borderRadius: "8px", 
          marginBottom: "1.5rem" 
        }}>
          <h4 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Terms & Consent</h4>
          
          <div className="checkbox-field" style={{ marginBottom: "1rem" }}>
            <input 
              id="consentPrivacy"
              type="checkbox" 
              name="consentPrivacy" 
              required
              disabled={isSubmitting}
            />
            <label htmlFor="consentPrivacy">
              I agree to the <Link to="/privacy" target="_blank" style={{ color: "#007c89" }}>Privacy Policy</Link> and consent to my information being used for event organization purposes.
            </label>
            {actionData?.errors?.consentPrivacy && (
              <div className="error-message">{actionData.errors.consentPrivacy}</div>
            )}
          </div>

          <div className="checkbox-field" style={{ marginBottom: "1rem" }}>
            <input 
              id="consentRisk"
              type="checkbox" 
              name="consentRisk" 
              required
              disabled={isSubmitting}
            />
            <label htmlFor="consentRisk">
              I understand that Highland Games involve physical activities and potential risks, and I agree to participate at my own risk.
            </label>
            {actionData?.errors?.consentRisk && (
              <div className="error-message">{actionData.errors.consentRisk}</div>
            )}
          </div>

          <div className="checkbox-field">
            <input 
              id="agree"
              type="checkbox" 
              name="agree" 
              required
              disabled={isSubmitting}
            />
            <label htmlFor="agree">
              I confirm that all information provided is accurate and complete. *
            </label>
            {actionData?.errors?.agree && (
              <div className="error-message">{actionData.errors.agree}</div>
            )}
          </div>
        </div>

        <div className="submit-section">
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Register Now"}
          </button>
          <p style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
            Your registration will be reviewed by administrators before approval.
          </p>
        </div>
      </Form>
    </main>
  );
}
