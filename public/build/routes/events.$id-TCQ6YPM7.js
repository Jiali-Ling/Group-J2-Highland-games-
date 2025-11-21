import {
  require_db
} from "/build/_shared/chunk-6H6GA5NQ.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Link,
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
  __toESM
} from "/build/_shared/chunk-PZDJHGND.js";

// app/routes/events.$id.jsx
var import_db = __toESM(require_db(), 1);
var import_node = __toESM(require_node(), 1);

// app/styles/event-detail.css?url
var event_detail_default = "/build/_assets/event-detail-AL5QQFM4.css?url";

// app/routes/events.$id.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events.$id.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events.$id.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: event_detail_default
}];
function EventDetail() {
  _s();
  const {
    event
  } = useLoaderData();
  const [sp] = useSearchParams();
  const registered = sp.get("registered") === "1";
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "event-detail-page", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-detail-card", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", { className: "event-title", children: event.name }, void 0, false, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 53,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "event-description", children: event.description }, void 0, false, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 54,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-meta", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-datetime", children: new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }) }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 57,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-location", children: event.location }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 67,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 56,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      marginTop: "32px",
      padding: "24px",
      background: "rgba(255,255,255,0.04)",
      borderRadius: "8px",
      border: "1px solid rgba(255,255,255,0.08)"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { style: {
        marginTop: 0,
        marginBottom: "16px",
        color: "var(--brand)"
      }, children: "Highland Games Competition Events" }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 77,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
        color: "var(--text)",
        marginTop: "20px",
        marginBottom: "12px"
      }, children: "\u{1F3CB}\uFE0F Heavy Events" }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
        lineHeight: "1.8",
        color: "var(--muted)",
        marginBottom: "20px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Caber Toss:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 93,
            columnNumber: 17
          }, this),
          " The most iconic event! Flip a log weighing up to 11 stone so it lands in the 12 o'clock position. Judged on style, not distance. Rumoured to stem from tossing logs over chasms."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 93,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Hammer Throw:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 94,
            columnNumber: 17
          }, this),
          " Swing and throw a heavy hammer with wooden handle for maximum distance. This event inspired the modern Olympic hammer throw after Baron de Coubertin witnessed it at the 1889 Paris Exhibition."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Stone Put:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 95,
            columnNumber: 17
          }, this),
          " Similar to shot put, athletes throw a heavy stone for distance using traditional Highland technique."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 95,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Weight for Height:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 96,
            columnNumber: 17
          }, this),
          ' Throw a weight over a horizontal bar using one hand. Look out for "the handbag technique" - named after the starting position!'
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 96,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Tug o' War:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 97,
            columnNumber: 17
          }, this),
          " Clan teams go head-to-head testing strength and teamwork in fierce competition."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 97,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 88,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
        color: "var(--text)",
        marginTop: "20px",
        marginBottom: "12px"
      }, children: "\u{1F483} Highland Dancing" }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
        lineHeight: "1.8",
        color: "var(--muted)",
        marginBottom: "20px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Highland Fling:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 110,
            columnNumber: 17
          }, this),
          " The most famous Highland dance, originally an all-male event until the late 19th century."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 110,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Sword Dance:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 111,
            columnNumber: 17
          }, this),
          " Dancers perform intricate footwork around crossed swords laid on the ground."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 111,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Seann Triubhas:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 112,
            columnNumber: 17
          }, this),
          ' A dance celebrating freedom from English rule, pronounced "shawn trews".'
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
        color: "var(--text)",
        marginTop: "20px",
        marginBottom: "12px"
      }, children: "\u{1F3C3} Field Events" }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
        lineHeight: "1.8",
        color: "var(--muted)",
        marginBottom: "20px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Hill Race:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 125,
            columnNumber: 17
          }, this),
          " Dating back to King Malcolm III in the 11th century who raced runners to the summit to find his fastest courier."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 125,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Cycling Competition:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 126,
            columnNumber: 17
          }, this),
          " Test your speed and stamina on the Highland course."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 126,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 120,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h4", { style: {
        color: "var(--text)",
        marginTop: "20px",
        marginBottom: "12px"
      }, children: "\u{1F3B5} Music" }, void 0, false, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 129,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { style: {
        lineHeight: "1.8",
        color: "var(--muted)"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Solo Piping:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 138,
            columnNumber: 17
          }, this),
          " Compete in various styles including the Pibroch - the classical music of the bagpipe."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 138,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Massed Bands:" }, void 0, false, {
            fileName: "app/routes/events.$id.jsx",
            lineNumber: 139,
            columnNumber: 17
          }, this),
          " Experience hundreds of pipers and drummers playing together in stunning unison."
        ] }, void 0, true, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 139,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 134,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { style: {
        marginTop: "20px",
        padding: "12px",
        background: "rgba(107,183,255,0.1)",
        borderRadius: "6px",
        fontSize: "14px",
        fontStyle: "italic",
        border: "1px solid rgba(107,183,255,0.3)"
      }, children: [
        "\u{1F4A1} ",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", { children: "Did you know?" }, void 0, false, {
          fileName: "app/routes/events.$id.jsx",
          lineNumber: 151,
          columnNumber: 16
        }, this),
        " The Royal Scottish Highland Games Association welcomes competitors of all ages and skill levels. Choose your event during registration and join Scotland's centuries-old tradition!"
      ] }, void 0, true, {
        fileName: "app/routes/events.$id.jsx",
        lineNumber: 142,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 70,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-actions", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: "register", className: "register-link", children: "Join the Competition \u2192" }, void 0, false, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 157,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 156,
      columnNumber: 9
    }, this),
    registered && /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "success-message", children: "\u2705 Your registration has been submitted successfully!" }, void 0, false, {
      fileName: "app/routes/events.$id.jsx",
      lineNumber: 162,
      columnNumber: 24
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events.$id.jsx",
    lineNumber: 52,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/routes/events.$id.jsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}
_s(EventDetail, "QzsCXbTFEN9Grs4d0izqjwFP4o8=", false, function() {
  return [useLoaderData, useSearchParams];
});
_c = EventDetail;
var _c;
$RefreshReg$(_c, "EventDetail");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  EventDetail as default,
  links
};
//# sourceMappingURL=/build/routes/events.$id-TCQ6YPM7.js.map
