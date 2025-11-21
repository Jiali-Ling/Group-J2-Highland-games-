import {
  require_db
} from "/build/_shared/chunk-I53UWI2S.js";
import {
  require_session
} from "/build/_shared/chunk-5HGWGMBK.js";
import {
  require_email
} from "/build/_shared/chunk-EVLWXUZD.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation
} from "/build/_shared/chunk-VR6SNSOD.js";
import "/build/_shared/chunk-PLT55Z5M.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-F4KNNEUR.js";
import "/build/_shared/chunk-2Z2JGDFU.js";
import {
  createHotContext
} from "/build/_shared/chunk-7XNRFNOA.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/privacy._index.jsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_db = __toESM(require_db(), 1);
var import_email = __toESM(require_email(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\privacy._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\privacy._index.jsx"
  );
  import.meta.hot.lastModified = "1763732613703.8823";
}
function Privacy() {
  _s();
  const {
    user,
    dataRequests,
    consentLogs
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container", style: {
    paddingTop: "2rem",
    paddingBottom: "4rem",
    maxWidth: "900px"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        fontSize: "2.5rem",
        marginBottom: "0.5rem"
      }, children: "Privacy & Data Rights" }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 178,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)",
        fontSize: "1.1rem"
      }, children: "Manage your personal data and exercise your GDPR rights" }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 182,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 175,
      columnNumber: 7
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "rgba(255, 107, 107, 0.1)",
      border: "1px solid rgba(255, 107, 107, 0.3)",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1.5rem",
      color: "#ff6b6b"
    }, children: [
      "\u26A0\uFE0F ",
      actionData.error
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 190,
      columnNumber: 29
    }, this),
    actionData?.success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "rgba(40, 167, 69, 0.1)",
      border: "1px solid rgba(40, 167, 69, 0.3)",
      borderRadius: "8px",
      padding: "1rem",
      marginBottom: "1.5rem",
      color: "#28a745"
    }, children: [
      "\u2713 ",
      actionData.message
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 201,
      columnNumber: 31
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "grid",
      gap: "1.5rem",
      marginBottom: "3rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
          fontSize: "1.5rem",
          marginBottom: "0.5rem"
        }, children: "\u{1F4E6} Export Your Data" }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 224,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: "var(--muted)",
          marginBottom: "1rem"
        }, children: "Download a copy of all your personal data in JSON format. This includes your profile, registrations, team memberships, and consent records." }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 228,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "exportData" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 235,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
            padding: "0.75rem 1.5rem",
            background: "var(--brand)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }, children: isSubmitting ? "Processing..." : "Request Data Export" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 236,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 234,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 218,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "2rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
          fontSize: "1.5rem",
          marginBottom: "0.5rem"
        }, children: "\u270F\uFE0F Correct Your Data" }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 257,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: "var(--muted)",
          marginBottom: "1rem"
        }, children: "If any of your personal information is inaccurate or incomplete, you can request a correction." }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 261,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "correctData" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 268,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            marginBottom: "1rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "reason", style: {
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600"
            }, children: "What needs to be corrected? *" }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 272,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "reason", name: "reason", required: true, rows: "4", placeholder: "Please describe what information is incorrect and what it should be...", style: {
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px"
            } }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 279,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 269,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
            padding: "0.75rem 1.5rem",
            background: "var(--brand)",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }, children: isSubmitting ? "Submitting..." : "Submit Correction Request" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 286,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 267,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 251,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "2px solid #ff6b6b",
        borderRadius: "12px",
        padding: "2rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
          fontSize: "1.5rem",
          marginBottom: "0.5rem",
          color: "#ff6b6b"
        }, children: "\u{1F5D1}\uFE0F Delete Your Account" }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 307,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: "var(--muted)",
          marginBottom: "0.5rem"
        }, children: "Permanently delete your account and all associated personal data." }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 312,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          background: "rgba(255, 107, 107, 0.1)",
          border: "1px solid rgba(255, 107, 107, 0.3)",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
          fontSize: "0.9rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "\u26A0\uFE0F Warning:" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 326,
            columnNumber: 13
          }, this),
          " This action cannot be undone. The following data will be permanently deleted:",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
            marginTop: "0.5rem",
            marginLeft: "1.5rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Your profile and personal information" }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 331,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "All your event registrations" }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 332,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Team memberships and owned teams" }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 333,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: "Consent and audit logs" }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 334,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 327,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            marginTop: "0.5rem"
          }, children: "Some aggregated, anonymized data may be retained for legal compliance and statistical purposes." }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 336,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 318,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "deleteAccount" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 343,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            marginBottom: "1rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "confirmation", style: {
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "600"
            }, children: 'Type "DELETE" to confirm *' }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 347,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "confirmation", name: "confirmation", required: true, placeholder: "DELETE", style: {
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px"
            } }, void 0, false, {
              fileName: "app/routes/privacy._index.jsx",
              lineNumber: 354,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 344,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
            padding: "0.75rem 1.5rem",
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600"
          }, children: isSubmitting ? "Processing..." : "Delete My Account" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 361,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 342,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 301,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 212,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { style: {
      marginBottom: "3rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        fontSize: "1.8rem",
        marginBottom: "1rem"
      }, children: "Your Data Requests" }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 380,
        columnNumber: 9
      }, this),
      dataRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)"
      }, children: "You haven't made any data requests yet." }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 384,
        columnNumber: 38
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { style: {
        width: "100%",
        borderCollapse: "collapse"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { style: {
          background: "#f5f5f5"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Type" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 400,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Status" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 404,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Date" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 408,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Details" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 412,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 397,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 396,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: dataRequests.map((request) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { style: {
          borderTop: "1px solid #e0e0e0"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem"
          }, children: request.requestType }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 422,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem"
          }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            padding: "0.25rem 0.75rem",
            borderRadius: "12px",
            fontSize: "0.85rem",
            fontWeight: "600",
            background: request.status === "completed" ? "#d4edda" : "#fff3cd",
            color: request.status === "completed" ? "#155724" : "#856404"
          }, children: request.status }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 428,
            columnNumber: 23
          }, this) }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 425,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem",
            fontSize: "0.9rem"
          }, children: new Date(request.createdAt).toLocaleDateString() }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 439,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem",
            fontSize: "0.9rem"
          }, children: request.reason || "\u2014" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 445,
            columnNumber: 21
          }, this)
        ] }, request.id, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 419,
          columnNumber: 46
        }, this)) }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 418,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 392,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 386,
        columnNumber: 56
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 377,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        fontSize: "1.8rem",
        marginBottom: "1rem"
      }, children: "Consent History" }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 459,
        columnNumber: 9
      }, this),
      consentLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)"
      }, children: "No consent records found." }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 463,
        columnNumber: 37
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        overflow: "hidden"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("table", { style: {
        width: "100%",
        borderCollapse: "collapse"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("thead", { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { style: {
          background: "#f5f5f5"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Type" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 479,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Status" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 483,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("th", { style: {
            padding: "1rem",
            textAlign: "left"
          }, children: "Date" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 487,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 476,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 475,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tbody", { children: consentLogs.map((log) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("tr", { style: {
          borderTop: "1px solid #e0e0e0"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem"
          }, children: log.consentType }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 497,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem"
          }, children: log.agreed ? "\u2713 Agreed" : "\u2717 Declined" }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 500,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("td", { style: {
            padding: "1rem",
            fontSize: "0.9rem"
          }, children: new Date(log.createdAt).toLocaleString() }, void 0, false, {
            fileName: "app/routes/privacy._index.jsx",
            lineNumber: 505,
            columnNumber: 21
          }, this)
        ] }, log.id, true, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 494,
          columnNumber: 41
        }, this)) }, void 0, false, {
          fileName: "app/routes/privacy._index.jsx",
          lineNumber: 493,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 471,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "app/routes/privacy._index.jsx",
        lineNumber: 465,
        columnNumber: 42
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/privacy._index.jsx",
      lineNumber: 458,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/privacy._index.jsx",
    lineNumber: 170,
    columnNumber: 10
  }, this);
}
_s(Privacy, "Z6VfsJf4fR9Q7jrI+4ciLibJaAE=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = Privacy;
var _c;
$RefreshReg$(_c, "Privacy");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Privacy as default
};
//# sourceMappingURL=/build/routes/privacy._index-6IJURCPW.js.map
