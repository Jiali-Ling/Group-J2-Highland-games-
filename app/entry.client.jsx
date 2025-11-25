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
        removeInjectedNodes();
        hydrateRoot(document, <RemixBrowser />);
      });
    }
  });
}

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
