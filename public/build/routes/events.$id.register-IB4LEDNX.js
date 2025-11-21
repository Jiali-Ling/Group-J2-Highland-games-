import {
  require_session
} from "/build/_shared/chunk-5HGWGMBK.js";
import {
  require_db
} from "/build/_shared/chunk-6H6GA5NQ.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Form,
  Link,
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

// app/routes/events.$id.register.jsx
var import_db = __toESM(require_db(), 1);
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);

// app/styles/register.css?url
var register_default = "/build/_assets/register-OAVGVWAR.css?url";

// app/routes/events.$id.register.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events.$id.register.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events.$id.register.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: register_default
}];
function Register() {
  _s();
  const {
    event,
    user,
    userProfile,
    userTeams
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container register-page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "register-header", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { children: "Register for Competition" }, void 0, false, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 178,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "Join us for an authentic Highland Games experience" }, void 0, false, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 179,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.register.jsx",
      lineNumber: 177,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-info", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: event.name }, void 0, false, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 183,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: [
        new Date(event.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        }),
        " \u2022 ",
        event.location
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 184,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "user-email-display", children: [
        "Registering as: ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: user.email }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 192,
          columnNumber: 59
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 192,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.register.jsx",
      lineNumber: 182,
      columnNumber: 7
    }, this),
    !userProfile && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "rgba(255, 193, 7, 0.1)",
      border: "1px solid rgba(255, 193, 7, 0.3)",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "24px",
      color: "#856404"
    }, children: [
      "\u26A0\uFE0F You haven't completed your profile yet. ",
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/profile", style: {
        color: "#007c89",
        fontWeight: "600"
      }, children: "Complete your profile" }, void 0, false, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 203,
        columnNumber: 54
      }, this),
      " for a better experience."
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.register.jsx",
      lineNumber: 195,
      columnNumber: 24
    }, this),
    actionData?.error && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "rgba(255, 107, 107, 0.1)",
      border: "1px solid rgba(255, 107, 107, 0.3)",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "24px",
      color: "#ff6b6b",
      textAlign: "center"
    }, children: [
      "\u26A0 ",
      actionData.error
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.register.jsx",
      lineNumber: 209,
      columnNumber: 29
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", className: "register-form", onSubmit: (e) => {
      console.log("Form submitting...");
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", children: "Full Name *" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 226,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "name", name: "name", type: "text", required: true, placeholder: "Enter your full name", defaultValue: actionData?.values?.name || userProfile?.fullName || "", "aria-invalid": !!actionData?.errors?.name, disabled: isSubmitting }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 227,
          columnNumber: 11
        }, this),
        actionData?.errors?.name && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: actionData.errors.name }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 229,
          columnNumber: 40
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 225,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "category", children: "Competition Event *" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 233,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "category", name: "category", required: true, defaultValue: actionData?.values?.category || "", "aria-invalid": !!actionData?.errors?.category, disabled: isSubmitting, style: {
          width: "100%",
          padding: "0.75rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Select an event..." }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 242,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Caber Toss", children: "Caber Toss" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 243,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Stone Put", children: "Stone Put" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 244,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Hammer Throw", children: "Hammer Throw" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 245,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Weight for Height", children: "Weight for Height" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 246,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Tug o' War", children: "Tug o' War" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 247,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Hill Race", children: "Hill Race" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 248,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Highland Dancing", children: "Highland Dancing" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 249,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "Piping", children: "Piping" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 250,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 234,
          columnNumber: 11
        }, this),
        actionData?.errors?.category && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: actionData.errors.category }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 252,
          columnNumber: 44
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 232,
        columnNumber: 9
      }, this),
      userTeams.length > 0 && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "form-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "teamId", children: "Compete as Team (Optional)" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 256,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { id: "teamId", name: "teamId", defaultValue: actionData?.values?.teamId || "", disabled: isSubmitting, style: {
          width: "100%",
          padding: "0.75rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          fontSize: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "Individual (No Team)" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 265,
            columnNumber: 15
          }, this),
          userTeams.map(({
            team
          }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: team.id, children: team.name }, team.id, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 268,
            columnNumber: 17
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 257,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          fontSize: "0.85rem",
          color: "#666",
          marginTop: "0.25rem"
        }, children: "Select a team if you want to compete as part of a team" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 270,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 255,
        columnNumber: 34
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "#f5f5f5",
        padding: "1.5rem",
        borderRadius: "8px",
        marginBottom: "1.5rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
          marginBottom: "1rem",
          fontSize: "1.1rem"
        }, children: "Terms & Consent" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 285,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "checkbox-field", style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "consentPrivacy", type: "checkbox", name: "consentPrivacy", required: true, defaultChecked: actionData?.values?.agree, disabled: isSubmitting }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 293,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "consentPrivacy", children: [
            "I agree to the ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "/privacy", target: "_blank", style: {
              color: "#007c89"
            }, children: "Privacy Policy" }, void 0, false, {
              fileName: "app/routes/events.$id.register.jsx",
              lineNumber: 296,
              columnNumber: 30
            }, this),
            " and consent to my information being used for event organization purposes."
          ] }, void 0, true, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 295,
            columnNumber: 13
          }, this),
          actionData?.errors?.consentPrivacy && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: actionData.errors.consentPrivacy }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 300,
            columnNumber: 52
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "checkbox-field", style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "consentRisk", type: "checkbox", name: "consentRisk", required: true, defaultChecked: actionData?.values?.agree, disabled: isSubmitting }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 306,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "consentRisk", children: "I understand that Highland Games involve physical activities and potential risks, and I agree to participate at my own risk." }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 308,
            columnNumber: 13
          }, this),
          actionData?.errors?.consentRisk && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: actionData.errors.consentRisk }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 311,
            columnNumber: 49
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 303,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "checkbox-field", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "agree", type: "checkbox", name: "agree", required: true, defaultChecked: actionData?.values?.agree, disabled: isSubmitting }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 315,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "agree", children: "I confirm that all information provided is accurate and complete. *" }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 317,
            columnNumber: 13
          }, this),
          actionData?.errors?.agree && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "error-message", children: actionData.errors.agree }, void 0, false, {
            fileName: "app/routes/events.$id.register.jsx",
            lineNumber: 320,
            columnNumber: 43
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 314,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 279,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "submit-section", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "submit-btn", disabled: isSubmitting, children: isSubmitting ? "Submitting..." : "Register Now" }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 325,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          textAlign: "center",
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "#666"
        }, children: "Your registration will be reviewed by administrators before approval." }, void 0, false, {
          fileName: "app/routes/events.$id.register.jsx",
          lineNumber: 329,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.register.jsx",
        lineNumber: 324,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.register.jsx",
      lineNumber: 221,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events.$id.register.jsx",
    lineNumber: 176,
    columnNumber: 10
  }, this);
}
_s(Register, "8nSyaNQDuqSKT8J1BY/J6mH5Ubs=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = Register;
var _c;
$RefreshReg$(_c, "Register");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Register as default,
  links
};
//# sourceMappingURL=/build/routes/events.$id.register-IB4LEDNX.js.map
