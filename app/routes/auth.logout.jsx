import { redirect } from "@remix-run/node";
import { storage } from "~/utils/session.server";

export async function action({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}

export async function loader({ request }) {
  const session = await storage.getSession(request.headers.get("Cookie"));
  
  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session)
    }
  });
}
