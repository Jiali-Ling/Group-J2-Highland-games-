import { RemixBrowser } from "@remix-run/react";
import { startTransition } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";

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

let hydrationAttempted = false;
let rootInstance = null;

function hydrate() {
  removeInjectedNodes();

  startTransition(() => {
    if (hydrationAttempted && rootInstance) {
      try {
        rootInstance.render(<RemixBrowser />);
        return;
      } catch (error) {
        console.error("Failed to re-render with existing root, creating new root", error);
      }
    }

    if (!hydrationAttempted) {
      try {
        hydrationAttempted = true;
        rootInstance = hydrateRoot(document, <RemixBrowser />);
        return;
      } catch (error) {
        console.error("Hydration failed, falling back to client-side rendering", error);
      }
    }

    try {
      removeInjectedNodes();
      
      if (rootInstance && typeof rootInstance.unmount === 'function') {
        try {
          rootInstance.unmount();
        } catch (unmountError) {
          console.warn("Error unmounting previous root:", unmountError);
        }
      }
      
      rootInstance = createRoot(document);
      rootInstance.render(<RemixBrowser />);
    } catch (fallbackError) {
      console.error("Failed to render application with createRoot", fallbackError);
      document.body.innerHTML = `
        <div style="padding: 2rem; text-align: center; font-family: sans-serif;">
          <h1>Application Error</h1>
          <p>Unable to load the application. Please refresh the page.</p>
          <button onclick="window.location.reload()" style="padding: 0.5rem 1rem; margin-top: 1rem; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      `;
    }
  });
}

if ("requestIdleCallback" in window) {
  window.requestIdleCallback(hydrate);
} else {
  window.setTimeout(hydrate, 1);
}
