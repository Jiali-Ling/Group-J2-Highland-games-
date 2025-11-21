import { Links, Meta, Outlet, Scripts, ScrollRestoration, LiveReload, Link, useLoaderData, Form } from "@remix-run/react";
import { json } from "@remix-run/node";
import { storage } from "~/utils/session.server";
import globalStyles from "./styles/global.css?url";

export const meta = () => [
  { title: "Paisley Highland Games" },
  { name: "viewport", content: "width=device-width, initial-scale=1" }
];

export const links = () => [
  { rel: "stylesheet", href: globalStyles }
];

export async function loader({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const userEmail = session.get("userEmail");
  
  return json({
    user: userId ? { id: userId, email: userEmail } : null
  });
}

export default function App() {
  const { user } = useLoaderData();
  
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header className="site-header">
          <div className="container header-inner">
            <Link to="/" className="brand">Paisley Highland Games</Link>
            <nav className="nav">
              <Link to="/events" className="nav-link">Events</Link>
              <Link to="/winners" className="nav-link">Winners</Link>
              {user ? (
                <>
                  <Link to="/teams" className="nav-link">Teams</Link>
                  <Link to="/profile" className="nav-link">Profile</Link>
                  <Link to="/privacy" className="nav-link">Privacy</Link>
                  <Link to="/admin" className="nav-link">Admin</Link>
                  <div className="user-menu">
                    <span className="user-email">{user.email}</span>
                    <Form method="post" action="/auth/logout" style={{ display: 'inline' }}>
                      <button type="submit" className="nav-link logout-btn">Logout</button>
                    </Form>
                  </div>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=login" className="nav-link">Login</Link>
                  <Link to="/auth?mode=register" className="nav-link" style={{ background: "var(--brand)", color: "white", padding: "0.5rem 1rem", borderRadius: "6px" }}>Sign Up</Link>
                </>
              )}
            </nav>
          </div>
        </header>

        <Outlet />

        <footer className="site-footer">
          <div className="container footer-inner">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <p>© {new Date().getFullYear()} Paisley Highland Games · Built with Remix</p>
              <div style={{ display: "flex", gap: "1.5rem" }}>
                <Link to="/privacy" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem" }}>Privacy Policy</Link>
                <Link to="/terms" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem" }}>Terms of Service</Link>
                <a href="mailto:info@highlandgames.com" style={{ color: "#666", textDecoration: "none", fontSize: "0.9rem" }}>Contact Us</a>
              </div>
            </div>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
