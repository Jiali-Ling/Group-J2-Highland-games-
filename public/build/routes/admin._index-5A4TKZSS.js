import {
  require_email
} from "/build/_shared/chunk-EVLWXUZD.js";
import {
  require_db
} from "/build/_shared/chunk-6H6GA5NQ.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams
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
  __commonJS,
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// empty-module:../utils/session.server
var require_session = __commonJS({
  "empty-module:../utils/session.server"(exports, module) {
    module.exports = {};
  }
});

// app/routes/admin._index.jsx
var import_session = __toESM(require_session(), 1);
var import_db = __toESM(require_db(), 1);
var import_node = __toESM(require_node(), 1);
var import_email = __toESM(require_email(), 1);

// app/styles/admin.css?url
var admin_default = "/build/_assets/admin-CWT3BAKK.css?url";

// app/routes/admin._index.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\admin._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\admin._index.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: admin_default
}];
function Admin() {
  _s();
  const data = useLoaderData();
  const actionData = useActionData();
  const [sp] = useSearchParams();
  if (!data.isAdmin) {
    return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "admin-login", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "login-card", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Admin Login" }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 189,
        columnNumber: 11
      }, this),
      sp.get("msg") === "login" && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "notice", children: "Please login to continue" }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 190,
        columnNumber: 41
      }, this),
      actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "#ffebee",
        color: "#c62828",
        padding: "0.75rem",
        borderRadius: "8px",
        marginBottom: "1rem"
      }, children: actionData.error }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 191,
        columnNumber: 33
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "login-form", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "email", children: "Email" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 202,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "email", name: "email", type: "email", placeholder: "admin@example.com", required: true }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 203,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 201,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-group", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "password", children: "Password" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 206,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "password", name: "password", type: "password", placeholder: "Enter password", required: true }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 207,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 205,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", name: "_intent", value: "login", className: "btn btn-primary", children: "Login" }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 209,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "hint", children: "Default: admin@example.com / admin123" }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 210,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 200,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 188,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 187,
      columnNumber: 12
    }, this);
  }
  const pendingRegs = data.regs.filter((r) => r.status === "pending");
  const approvedRegs = data.regs.filter((r) => r.status === "approved");
  const rejectedRegs = data.regs.filter((r) => r.status === "rejected");
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container admin-dashboard", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Admin Dashboard" }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: "var(--muted)"
        }, children: [
          "Logged in as: ",
          data.userEmail
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 227,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        gap: "1rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          background: "#fff3cd",
          padding: "1rem",
          borderRadius: "8px",
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#856404"
          }, children: data.pendingCount }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 241,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "0.9rem",
            color: "#856404"
          }, children: "Pending Reviews" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 246,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 235,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          background: "#d4edda",
          padding: "1rem",
          borderRadius: "8px",
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#155724"
          }, children: approvedRegs.length }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 257,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
            fontSize: "0.9rem",
            color: "#155724"
          }, children: "Approved" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 262,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 251,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 231,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 219,
      columnNumber: 7
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "#ffebee",
      color: "#c62828",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem"
    }, children: [
      "\u26A0\uFE0F ",
      actionData.error
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 270,
      columnNumber: 29
    }, this),
    actionData?.success && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "#d4edda",
      color: "#155724",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1.5rem"
    }, children: "\u2713 Action completed successfully" }, void 0, false, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 280,
      columnNumber: 31
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "dashboard-section", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: [
        "Pending Registrations (",
        pendingRegs.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 291,
        columnNumber: 9
      }, this),
      pendingRegs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "empty-state", children: "No pending registrations." }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 292,
        columnNumber: 37
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registrations-list", children: pendingRegs.map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registration-item", style: {
        background: "#fff3cd",
        border: "1px solid #ffc107"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reg-info", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "reg-id", children: [
            "#",
            r.id
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 298,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: r.name }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 300,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              fontSize: "0.9rem",
              color: "#666"
            }, children: r.email }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 301,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "0.25rem"
            }, children: [
              "Event: ",
              r.event.name
            ] }, void 0, true, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 305,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 299,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "category", children: r.category }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 313,
            columnNumber: 19
          }, this),
          r.team && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: "0.85rem",
            color: "#666"
          }, children: [
            "Team: ",
            r.team.name
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 314,
            columnNumber: 30
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: "0.85rem",
            color: "#666"
          }, children: new Date(r.submittedAt).toLocaleString() }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 318,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 297,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "reg-actions", style: {
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "id", value: r.id }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 330,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { name: "_intent", value: "approve", className: "btn-small", style: {
            background: "#28a745"
          }, children: "\u2713 Approve" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 331,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("details", { style: {
            marginTop: "0.5rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("summary", { style: {
              cursor: "pointer",
              fontSize: "0.9rem",
              color: "#666"
            }, children: "Reject with reason" }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 339,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { name: "rejectionReason", placeholder: "Reason for rejection...", rows: "2", style: {
              width: "100%",
              marginTop: "0.5rem",
              padding: "0.5rem",
              border: "1px solid #ddd",
              borderRadius: "4px"
            } }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 344,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { name: "_intent", value: "reject", className: "btn-small btn-secondary", style: {
              width: "100%",
              marginTop: "0.5rem"
            }, children: "\u2717 Reject" }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 352,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 336,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 325,
          columnNumber: 17
        }, this)
      ] }, r.id, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 293,
        columnNumber: 35
      }, this)) }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 292,
        columnNumber: 96
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 290,
      columnNumber: 7
    }, this),
    data.dataRequests.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "dashboard-section", style: {
      marginTop: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: [
        "Pending Data Requests (",
        data.dataRequests.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 367,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registrations-list", children: data.dataRequests.map((req) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registration-item", style: {
        background: "#e7f3ff",
        border: "1px solid #2196F3"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reg-info", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "reg-id", children: [
            "#",
            req.id
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 374,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: req.requestType }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 376,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              fontSize: "0.9rem",
              color: "#666"
            }, children: req.user.email }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 377,
              columnNumber: 21
            }, this),
            req.reason && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
              fontSize: "0.85rem",
              color: "#666",
              marginTop: "0.25rem"
            }, children: req.reason }, void 0, false, {
              fileName: "app/routes/admin._index.jsx",
              lineNumber: 381,
              columnNumber: 36
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 375,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
            fontSize: "0.85rem",
            color: "#666"
          }, children: new Date(req.createdAt).toLocaleString() }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 389,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 373,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "reg-actions", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "requestId", value: req.id }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 397,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { name: "_intent", value: "processDataRequest", formValue: "action=approve", className: "btn-small", children: "Process" }, void 0, false, {
            fileName: "app/routes/admin._index.jsx",
            lineNumber: 398,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 396,
          columnNumber: 17
        }, this)
      ] }, req.id, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 369,
        columnNumber: 43
      }, this)) }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 368,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 364,
      columnNumber: 40
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "dashboard-section", style: {
      marginTop: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: [
        "Approved Registrations (",
        approvedRegs.length,
        ")"
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 409,
        columnNumber: 9
      }, this),
      approvedRegs.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "empty-state", children: "No approved registrations yet." }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 410,
        columnNumber: 38
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registrations-list", children: approvedRegs.slice(0, 10).map((r) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "registration-item", style: {
        background: "#d4edda",
        border: "1px solid #28a745"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "reg-info", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "reg-id", children: [
          "#",
          r.id
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 416,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: r.name }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 417,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: r.email }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 418,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "category", children: r.category }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 419,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: `status status-${r.status}`, children: [
          "\u2713 ",
          r.status
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 420,
          columnNumber: 19
        }, this),
        r.reviewedBy && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { style: {
          fontSize: "0.85rem",
          color: "#666"
        }, children: [
          "by ",
          r.reviewedBy
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 421,
          columnNumber: 36
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 415,
        columnNumber: 17
      }, this) }, r.id, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 411,
        columnNumber: 49
      }, this)) }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 410,
        columnNumber: 102
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 406,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { className: "dashboard-section", style: {
      marginTop: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: "Events" }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 433,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "events-list", children: data.events.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-item", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: e.name }, void 0, false, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 436,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: [
          new Date(e.date).toDateString(),
          " @ ",
          e.location
        ] }, void 0, true, {
          fileName: "app/routes/admin._index.jsx",
          lineNumber: 437,
          columnNumber: 15
        }, this)
      ] }, e.id, true, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 435,
        columnNumber: 33
      }, this)) }, void 0, false, {
        fileName: "app/routes/admin._index.jsx",
        lineNumber: 434,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/admin._index.jsx",
      lineNumber: 430,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/admin._index.jsx",
    lineNumber: 218,
    columnNumber: 10
  }, this);
}
_s(Admin, "BloBrZTjJCzLpr/EWKkFwH+ONto=", false, function() {
  return [useLoaderData, useActionData, useSearchParams];
});
_c = Admin;
var _c;
$RefreshReg$(_c, "Admin");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Admin as default,
  links
};
//# sourceMappingURL=/build/routes/admin._index-5A4TKZSS.js.map
