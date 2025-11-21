import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  console.warn("⚠️ SESSION_SECRET is not set. Using a fallback is insecure in production.");
}

export const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [sessionSecret || "dev-secret"],
    secure: process.env.NODE_ENV === "production"
  }
});

export async function requireAdmin(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  if (session.get("admin") === true) return;
  throw redirect("/admin?msg=login");
}

export async function requireUser(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  
  if (!userId) {
    throw redirect("/auth/login");
  }
  
  return userId;
}

export async function getUser(request) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  const userEmail = session.get("userEmail");
  
  if (!userId) return null;
  
  return { id: userId, email: userEmail };
}
