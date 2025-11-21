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
import {
  require_react
} from "/build/_shared/chunk-2Z2JGDFU.js";
import {
  createHotContext
} from "/build/_shared/chunk-7XNRFNOA.js";
import "/build/_shared/chunk-JR22VO6P.js";
import {
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/teams._index.jsx
var import_node = __toESM(require_node(), 1);
var import_session = __toESM(require_session(), 1);
var import_db = __toESM(require_db(), 1);
var import_react2 = __toESM(require_react(), 1);
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\teams._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\teams._index.jsx"
  );
  import.meta.hot.lastModified = "1763732613703.8823";
}
function Teams() {
  _s();
  const {
    userTeams,
    ownedTeams,
    user
  } = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [showCreateForm, setShowCreateForm] = (0, import_react2.useState)(false);
  const [showJoinForm, setShowJoinForm] = (0, import_react2.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container", style: {
    paddingTop: "2rem",
    paddingBottom: "4rem"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { style: {
        fontSize: "2.5rem",
        marginBottom: "0.5rem"
      }, children: "Teams" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 227,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)",
        fontSize: "1.1rem"
      }, children: "Create or join teams to compete together in Highland Games events" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 231,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 224,
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
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 239,
      columnNumber: 29
    }, this),
    actionData?.success && actionData?.message && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
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
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 250,
      columnNumber: 54
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => {
        setShowCreateForm(!showCreateForm);
        setShowJoinForm(false);
      }, style: {
        padding: "0.75rem 1.5rem",
        background: "var(--brand)",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
      }, children: showCreateForm ? "Cancel" : "Create Team" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 266,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { onClick: () => {
        setShowJoinForm(!showJoinForm);
        setShowCreateForm(false);
      }, style: {
        padding: "0.75rem 1.5rem",
        background: "white",
        color: "var(--brand)",
        border: "2px solid var(--brand)",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "600"
      }, children: showJoinForm ? "Cancel" : "Join Team" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 280,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 261,
      columnNumber: 7
    }, this),
    showCreateForm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "2rem",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        marginBottom: "1.5rem"
      }, children: "Create New Team" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 303,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "create" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 307,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "name", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Team Name *" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 311,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "name", name: "name", required: true, style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 318,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 308,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1.5rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "description", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Description" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 328,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", { id: "description", name: "description", rows: "3", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px"
          } }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 335,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 325,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
          padding: "0.75rem 2rem",
          background: "var(--brand)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600"
        }, children: isSubmitting ? "Creating..." : "Create Team" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 342,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 306,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 296,
      columnNumber: 26
    }, this),
    showJoinForm && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "white",
      border: "1px solid #e0e0e0",
      borderRadius: "12px",
      padding: "2rem",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        marginBottom: "1.5rem"
      }, children: "Join Team" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 363,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "join" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 367,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginBottom: "1.5rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "inviteCode", style: {
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "600"
          }, children: "Team Invite Code *" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 371,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "text", id: "inviteCode", name: "inviteCode", required: true, placeholder: "Enter 8-character code", style: {
            width: "100%",
            padding: "0.75rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            textTransform: "uppercase"
          } }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 378,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 368,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", disabled: isSubmitting, style: {
          padding: "0.75rem 2rem",
          background: "var(--brand)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600"
        }, children: isSubmitting ? "Joining..." : "Join Team" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 386,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 366,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 356,
      columnNumber: 24
    }, this),
    actionData?.success && actionData?.team && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      background: "rgba(40, 167, 69, 0.1)",
      border: "1px solid rgba(40, 167, 69, 0.3)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "2rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        color: "#28a745",
        marginBottom: "1rem"
      }, children: "\u2713 Team Created Successfully!" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 407,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        marginBottom: "0.5rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Team Name:" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 414,
          columnNumber: 13
        }, this),
        " ",
        actionData.team.name
      ] }, void 0, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 411,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        marginBottom: "1rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Invite Code:" }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 419,
          columnNumber: 13
        }, this),
        " ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { style: {
          background: "white",
          padding: "0.25rem 0.5rem",
          borderRadius: "4px",
          fontSize: "1.2rem",
          fontWeight: "bold"
        }, children: actionData.team.inviteCode }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 419,
          columnNumber: 43
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 416,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        fontSize: "0.9rem",
        color: "#666"
      }, children: "Share this code with teammates to invite them!" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 427,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 400,
      columnNumber: 51
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { style: {
      marginBottom: "3rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        fontSize: "1.8rem",
        marginBottom: "1rem"
      }, children: "Your Teams" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 438,
        columnNumber: 9
      }, this),
      userTeams.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)"
      }, children: "You haven't joined any teams yet." }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 442,
        columnNumber: 35
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "grid",
        gap: "1rem"
      }, children: userTeams.map(({
        team
      }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: "1.5rem"
      }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
            marginBottom: "0.5rem"
          }, children: team.name }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 462,
            columnNumber: 21
          }, this),
          team.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            color: "var(--muted)",
            marginBottom: "0.5rem"
          }, children: team.description }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 465,
            columnNumber: 42
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            fontSize: "0.9rem",
            color: "#666"
          }, children: [
            "Owner: ",
            team.owner.email
          ] }, void 0, true, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 469,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            fontSize: "0.9rem",
            color: "#666"
          }, children: [
            "Members: ",
            team.members.length
          ] }, void 0, true, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 475,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
            fontSize: "0.9rem",
            marginTop: "0.5rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Invite Code:" }, void 0, false, {
              fileName: "app/routes/teams._index.jsx",
              lineNumber: 485,
              columnNumber: 23
            }, this),
            " ",
            /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { style: {
              background: "#f5f5f5",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px"
            }, children: team.inviteCode }, void 0, false, {
              fileName: "app/routes/teams._index.jsx",
              lineNumber: 485,
              columnNumber: 53
            }, this)
          ] }, void 0, true, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 481,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 461,
          columnNumber: 19
        }, this),
        team.ownerId !== user.id && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "post", children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "intent", value: "leave" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 493,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { type: "hidden", name: "teamId", value: team.id }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 494,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", style: {
            padding: "0.5rem 1rem",
            background: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem"
          }, children: "Leave Team" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 495,
            columnNumber: 23
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 492,
          columnNumber: 48
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 456,
        columnNumber: 17
      }, this) }, team.id, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 450,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 444,
        columnNumber: 50
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 435,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("section", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { style: {
        fontSize: "1.8rem",
        marginBottom: "1rem"
      }, children: "Teams You Own" }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 513,
        columnNumber: 9
      }, this),
      ownedTeams.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        color: "var(--muted)"
      }, children: "You haven't created any teams yet." }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 517,
        columnNumber: 36
      }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        display: "grid",
        gap: "1rem"
      }, children: ownedTeams.map((team) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
        background: "white",
        border: "2px solid var(--brand)",
        borderRadius: "12px",
        padding: "1.5rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
          marginBottom: "0.5rem"
        }, children: team.name }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 529,
          columnNumber: 17
        }, this),
        team.description && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          color: "var(--muted)",
          marginBottom: "0.5rem"
        }, children: team.description }, void 0, false, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 532,
          columnNumber: 38
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
          fontSize: "0.9rem",
          marginTop: "0.5rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Invite Code:" }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 540,
            columnNumber: 19
          }, this),
          " ",
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("code", { style: {
            background: "#f5f5f5",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            fontSize: "1.1rem",
            fontWeight: "bold"
          }, children: team.inviteCode }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 540,
            columnNumber: 49
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 536,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
          marginTop: "1rem"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
            fontSize: "1rem",
            marginBottom: "0.5rem"
          }, children: [
            "Members (",
            team.members.length,
            "):"
          ] }, void 0, true, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 551,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
            listStyle: "none",
            padding: 0
          }, children: team.members.map((member) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { style: {
            padding: "0.25rem 0",
            fontSize: "0.9rem"
          }, children: [
            "\u2022 ",
            member.user.email,
            " (",
            member.role,
            ")"
          ] }, member.id, true, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 559,
            columnNumber: 49
          }, this)) }, void 0, false, {
            fileName: "app/routes/teams._index.jsx",
            lineNumber: 555,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "app/routes/teams._index.jsx",
          lineNumber: 548,
          columnNumber: 17
        }, this)
      ] }, team.id, true, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 523,
        columnNumber: 37
      }, this)) }, void 0, false, {
        fileName: "app/routes/teams._index.jsx",
        lineNumber: 519,
        columnNumber: 51
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/teams._index.jsx",
      lineNumber: 512,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/teams._index.jsx",
    lineNumber: 220,
    columnNumber: 10
  }, this);
}
_s(Teams, "mCwLrQ7sNQl+NjhMzC9oQkumCvs=", false, function() {
  return [useLoaderData, useActionData, useNavigation];
});
_c = Teams;
var _c;
$RefreshReg$(_c, "Teams");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Teams as default
};
//# sourceMappingURL=/build/routes/teams._index-BM4ONHDH.js.map
