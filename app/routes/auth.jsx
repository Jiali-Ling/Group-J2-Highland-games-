import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, useSearchParams, useLoaderData } from "@remix-run/react";
import { storage } from "~/utils/session.server";
import { prisma } from "~/utils/db.server";
import bcrypt from "bcryptjs";
import { useState } from "react";
import "~/styles/auth.css";

export async function action({ request }) {
  const formData = await request.formData();
  const authType = formData.get("authType");
  const email = formData.get("email")?.toString()?.trim()?.toLowerCase() || "";
  const password = formData.get("password");
  const returnTo = formData.get("returnTo") || "/events";

  const errors = {};
  
  if (!email || !email.includes("@")) {
    errors.email = "Please provide a valid email address";
  }
  
  if (!password || password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (authType === "register") {
    const name = formData.get("name");
    const confirmPassword = formData.get("confirmPassword");
    
    if (!name || name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      return json({ errors, authType }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return json({ 
        errors: { email: "An account with this email already exists" },
        authType
      }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "participant",
        profile: {
          create: {
            fullName: name
          }
        }
      },
      include: { profile: true }
    });

    const session = await storage.getSession(request.headers.get("Cookie"));
    session.set("userId", user.id);
    session.set("userEmail", user.email);
    session.set("userRole", user.role);

    return redirect(returnTo, {
      headers: {
        "Set-Cookie": await storage.commitSession(session)
      }
    });
  } else {
    if (Object.keys(errors).length > 0) {
      return json({ errors, authType }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return json({ 
        errors: { general: "Invalid email or password" },
        authType
      }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return json({ 
        errors: { general: "Invalid email or password" },
        authType
      }, { status: 401 });
    }

    const session = await storage.getSession(request.headers.get("Cookie"));
    session.set("userId", user.id);
    session.set("userEmail", user.email);
    session.set("userRole", user.role);

    return redirect(returnTo, {
      headers: {
        "Set-Cookie": await storage.commitSession(session)
      }
    });
  }
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") || "/events";
  return json({ returnTo });
}

export default function Auth() {
  const { returnTo } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const isSubmitting = navigation.state === "submitting";
  
  const defaultTab = searchParams.get("mode") === "register" ? "register" : "login";
  const [activeTab, setActiveTab] = useState(actionData?.authType || defaultTab);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchParams({ mode: tab });
  };

  return (
    <div className={`auth-container ${activeTab === "register" ? "register-mode" : "login-mode"}`} style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      background: '#ffffff',
      position: 'relative'
    }}>
      {activeTab === "login" && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          backgroundImage: 'linear-gradient(135deg, rgba(11,13,18,0.7) 0%, rgba(11,13,18,0.5) 100%), url("https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=1200")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />
      )}
      <div className="auth-card-combined" style={{
        gridColumn: 2,
        background: '#f8f9fa',
        padding: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        zIndex: 1
      }}>
        {activeTab === "register" && (
          <div style={{ marginBottom: '2rem' }}>
            <svg className="auth-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="48" fill="#007c89"/>
              <path d="M35 45 L50 30 L65 45 M50 35 L50 70" stroke="white" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="50" cy="70" r="4" fill="white"/>
            </svg>
          </div>
        )}
        <h1 style={{ color: '#000000', fontWeight: '700', letterSpacing: '0.5px', lineHeight: '1.4' }}>{activeTab === "login" ? "Welcome Back" : "Log In"}</h1>
        <p className="auth-subtitle" style={{ color: '#000000', fontWeight: '600', letterSpacing: '0.3px', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          {activeTab === "login" 
            ? "Sign in to register for Highland Games events"
            : (
              <>
                Need a Highland Games account?{" "}
                <a
                  href="/auth?mode=register"
                  onClick={(event) => {
                    event.preventDefault();
                    handleTabChange("register");
                  }}
                >
                  Create an account
                </a>
              </>
            )
          }
        </p>

        {actionData?.errors?.general && (
          <div className="error-banner">
            <span>⚠️</span>
            {actionData.errors.general}
          </div>
        )}

        {activeTab === "login" && (
          <Form method="post" className="auth-form">
            <input type="hidden" name="authType" value="login" />
            <input type="hidden" name="returnTo" value={returnTo} />

            <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <label htmlFor="login-email" style={{ color: '#000000', fontWeight: '700', letterSpacing: '0.3px', minWidth: '140px', textAlign: 'left' }}>Email Address</label>
              <input
                type="email"
                id="login-email"
                name="email"
                placeholder="your.email@example.com"
                required
                autoComplete="email"
                style={{ padding: '0.875rem', letterSpacing: '0.3px', flex: 1 }}
              />
              {actionData?.authType === "login" && actionData?.errors?.email && (
                <span className="error-message" role="alert">{actionData.errors.email}</span>
              )}
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <label htmlFor="login-password" style={{ color: '#000000', fontWeight: '700', letterSpacing: '0.3px', minWidth: '140px', textAlign: 'left' }}>Password</label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Enter your password"
                required
                minLength={6}
                autoComplete="current-password"
                style={{ padding: '0.875rem', letterSpacing: '0.3px', flex: 1 }}
              />
              {actionData?.authType === "login" && actionData?.errors?.password && (
                <span className="error-message" role="alert">{actionData.errors.password}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
              style={{ color: '#000000', fontWeight: '700', padding: '1rem', letterSpacing: '0.5px', marginTop: '1rem' }}
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>

            <div className="auth-switch" style={{ marginTop: '2.5rem' }}>
              <p style={{ color: '#000000', fontWeight: '600', letterSpacing: '0.3px', lineHeight: '1.6' }}>Don't have an account?{" "}
                <button 
                  type="button" 
                  className="switch-link"
                  onClick={() => handleTabChange("register")}
                  style={{ color: '#000000', fontWeight: '700' }}
                >
                  Create one here
                </button>
              </p>
              <p className="form-hint" style={{ color: '#000000', fontWeight: '500', fontSize: '0.75rem', marginTop: '1.5rem', letterSpacing: '0.3px', lineHeight: '1.5' }}>
                💡 Test account: <strong>b01812585@student.uws.ac.uk</strong> / <strong>password123</strong>
              </p>
            </div>
          </Form>
        )}

        {activeTab === "register" && (
          <Form method="post" className="auth-form">
            <input type="hidden" name="authType" value="register" />
            <input type="hidden" name="returnTo" value={returnTo} />

            <div className="form-group">
              <label htmlFor="register-name">Full Name</label>
              <input
                type="text"
                id="register-name"
                name="name"
                required
                minLength={2}
                autoComplete="name"
              />
              {actionData?.authType === "register" && actionData?.errors?.name && (
                <span className="error-message">{actionData.errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-email">Email Address</label>
              <input
                type="email"
                id="register-email"
                name="email"
                required
                autoComplete="email"
              />
              {actionData?.authType === "register" && actionData?.errors?.email && (
                <span className="error-message">{actionData.errors.email}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-password">Password</label>
              <input
                type="password"
                id="register-password"
                name="password"
                required
                minLength={6}
                autoComplete="new-password"
              />
              {actionData?.authType === "register" && actionData?.errors?.password && (
                <span className="error-message">{actionData.errors.password}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="register-confirm">Confirm Password</label>
              <input
                type="password"
                id="register-confirm"
                name="confirmPassword"
                required
                minLength={6}
                autoComplete="new-password"
              />
              {actionData?.authType === "register" && actionData?.errors?.confirmPassword && (
                <span className="error-message">{actionData.errors.confirmPassword}</span>
              )}
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>
          </Form>
        )}

        <div className="auth-footer" style={{ 
          marginTop: '1rem', 
          paddingTop: '1rem',
          color: '#000000', 
          fontWeight: '600',
          fontSize: '0.875rem',
          letterSpacing: '0.3px',
          lineHeight: '1.5'
        }}>
          (c) 2025 Paisley Highland Games | Privacy | Terms
        </div>
      </div>

      {activeTab === "register" && (
        <div className="auth-right-panel">
          <div className="auth-right-content">
            <h2>Build better relationships with your audience</h2>
            <p>Highland Games management tools help you understand who you're competing with and what they want to achieve.</p>
            <a href="#" className="cta-button">Learn How</a>
          
          <svg className="highland-illustration" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="200" width="400" height="20" fill="rgba(255,255,255,0.2)" rx="2"/>
            <path d="M100 200 Q150 120 200 200 T300 200 T400 200" stroke="rgba(255,255,255,0.3)" strokeWidth="2" fill="none"/>
            <circle cx="150" cy="120" r="8" fill="#FFD700"/>
            <path d="M150 128 L150 160 M140 140 L150 140 L160 140 M145 160 L150 180 M155 160 L150 180" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="250" cy="140" r="8" fill="#FFD700"/>
            <path d="M250 148 L250 180 M240 160 L250 160 L260 160 M245 180 L250 200 M255 180 L250 200" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="350" cy="130" r="8" fill="#FFD700"/>
            <path d="M350 138 L350 170 M340 150 L350 150 L360 150 M345 170 L350 190 M355 170 L350 190" stroke="#FFD700" strokeWidth="3" strokeLinecap="round"/>
            <path d="M80 80 L100 60 L120 80 L110 80 L110 110 L90 110 L90 80 Z" fill="rgba(255,255,255,0.4)"/>
            <path d="M380 90 L400 70 L420 90 L410 90 L410 120 L390 120 L390 90 Z" fill="rgba(255,255,255,0.4)"/>
            <circle cx="200" cy="100" r="20" fill="rgba(255,255,255,0.2)"/>
            <circle cx="320" cy="85" r="15" fill="rgba(255,255,255,0.2)"/>
          </svg>
        </div>
      </div>
      )}
    </div>
  );
}
