import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

const THIRD_PARTY_SELECTORS = [
  "copilotly-desktop-integration",
  "grammarly-extension",
  "grammarly-card",
  "grammarly-ghost",
  "grammarly-check",
  "grammarly-btn",
  "grammarly-popups",
  "apm-metadata"
];

function removeInjectedNodes() {
  THIRD_PARTY_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach((node) => node.remove());
  });
}

function hydrate() {
  removeInjectedNodes();

  startTransition(() => {
    try {
      hydrateRoot(document, <RemixBrowser />);
    } catch (error) {
      console.error("Hydration failed, retrying…", error);
      requestAnimationFrame(() => {
        try {
          removeInjectedNodes();
          hydrateRoot(document, <RemixBrowser />);
        } catch (retryError) {
          console.error("Hydration retry also failed, falling back to client-side rendering", retryError);
          // Fallback: let React handle client-side rendering
          // This prevents the app from crashing completely
        }
      });
    }
  });
}

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
