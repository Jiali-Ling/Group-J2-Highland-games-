import {
  require_db
} from "/build/_shared/chunk-I53UWI2S.js";
import {
  require_session
} from "/build/_shared/chunk-5HGWGMBK.js";
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

// app/routes/profile._index.jsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_db = __toESM(require_db(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\profile._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\profile._index.jsx"
  );
  import.meta.hot.lastModified = "1763732613703.8823";
}
function Profile() {
  _s();
  const {
    user
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container", style: {
    paddingTop: "2rem",
    paddingBottom: "4rem",
    maxWidth: "800px"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        fontSize: "2.5rem",
        marginBottom: "0.5rem"
      }, children: "Your Profile" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 135,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)",
        fontSize: "1.1rem"
      }, children: "Manage your personal information and preferences" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 139,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 132,
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
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 147,
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
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 158,
      columnNumber: 31
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "2rem",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        marginBottom: "0.5rem"
      }, children: "Account Information" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 176,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)",
        marginBottom: "1rem",
        fontSize: "0.9rem"
      }, children: "Your email address is used for login and notifications" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 179,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        padding: "1rem",
        background: "#f5f5f5",
        borderRadius: "8px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          margin: 0
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Email:" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 194,
            columnNumber: 13
          }, this),
          " ",
          user.email
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 191,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          margin: "0.5rem 0 0 0",
          fontSize: "0.9rem",
          color: "#666"
        }, children: [
          "Status: ",
          user.emailVerified ? "\u2713 Verified" : "\u26A0\uFE0F Not verified"
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 196,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 186,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 169,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        marginBottom: "1rem"
      }, children: "Personal Information" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 212,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "updateProfile" }, void 0, false, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 216,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "fullName", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Full Name *" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 221,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "fullName", name: "fullName", required: true, defaultValue: user.profile?.fullName || "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 228,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "dateOfBirth", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Date of Birth" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 239,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "date", id: "dateOfBirth", name: "dateOfBirth", defaultValue: user.profile?.dateOfBirth ? new Date(user.profile.dateOfBirth).toISOString().split("T")[0] : "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 246,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 236,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "phone", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Phone Number" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 257,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "tel", id: "phone", name: "phone", defaultValue: user.profile?.phone || "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 264,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 254,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "address", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Address" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 275,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "address", name: "address", rows: "3", defaultValue: user.profile?.address || "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 282,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 272,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "emergencyContact", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Emergency Contact" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 293,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "emergencyContact", name: "emergencyContact", placeholder: "Name and phone number", defaultValue: user.profile?.emergencyContact || "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 300,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1.5rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "medicalInfo", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Medical Information" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 311,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "medicalInfo", name: "medicalInfo", rows: "3", placeholder: "Allergies, medical conditions, medications, etc.", defaultValue: user.profile?.medicalInfo || "", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 318,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            fontSize: "0.85rem",
            color: "#666",
            marginTop: "0.25rem"
          }, children: "This information is kept confidential and only used for safety purposes" }, void 0, false, {
            fileName: "app/routes/profile._index.jsx",
            lineNumber: 324,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 308,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
          padding: "0.75rem 2rem",
          background: "var(--brand)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "1rem"
        }, children: isSubmitting ? "Saving..." : "Save Profile" }, void 0, false, {
          fileName: "app/routes/profile._index.jsx",
          lineNumber: 333,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 215,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 206,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "2rem",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/privacy", style: {
        color: "var(--brand)",
        textDecoration: "none",
        marginRight: "1rem"
      }, children: "Privacy & Data Rights" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 352,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("a", { href: "/auth/logout", style: {
        color: "#666",
        textDecoration: "none"
      }, children: "Sign Out" }, void 0, false, {
        fileName: "app/routes/profile._index.jsx",
        lineNumber: 359,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/profile._index.jsx",
      lineNumber: 348,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/profile._index.jsx",
    lineNumber: 127,
    columnNumber: 10
  }, this);
}
_s(Profile, "1McpCHagYnDxWS8x/PvdytQMqgg=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = Profile;
var _c;
$RefreshReg$(_c, "Profile");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Profile as default
};
//# sourceMappingURL=/build/routes/profile._index-TA35KTVC.js.map
