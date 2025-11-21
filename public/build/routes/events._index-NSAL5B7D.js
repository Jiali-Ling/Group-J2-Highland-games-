import {
  require_db
} from "/build/_shared/chunk-6H6GA5NQ.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Form,
  Link,
  useLoaderData
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

// app/routes/events._index.jsx
var import_db = __toESM(require_db(), 1);
var import_node = __toESM(require_node(), 1);

// app/styles/events.css?url
var events_default = "/build/_assets/events-TET74IAA.css?url";

// app/routes/events._index.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\events._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\events._index.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: events_default
}];
function Events() {
  _s();
  const {
    events,
    q,
    fromDate,
    toDate
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container events-page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Upcoming Events" }, void 0, false, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 82,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", className: "search-form", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "search-row", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "search-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "q", children: "Search" }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "q", name: "q", placeholder: "Name, location, or description", defaultValue: q }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 87,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "search-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "from", children: "From Date" }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 90,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "from", name: "from", type: "date", defaultValue: fromDate }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 91,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "search-field", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { htmlFor: "to", children: "To Date" }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 94,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", { id: "to", name: "to", type: "date", defaultValue: toDate }, void 0, false, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 95,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 93,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", className: "btn btn-primary search-btn", children: "Search" }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 97,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 84,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 83,
      columnNumber: 7
    }, this),
    events.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "empty-state", children: "No events found. Try adjusting your search." }, void 0, false, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 101,
      columnNumber: 30
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "events-grid", children: events.map((e) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, { to: `/events/${e.id}`, className: "event-card", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", { children: e.name }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 103,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { className: "event-desc", children: e.description }, void 0, false, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 104,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "event-meta", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "event-date", children: [
          "\u{1F4C5} ",
          new Date(e.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
          })
        ] }, void 0, true, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 106,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "event-location", children: [
          "\u{1F4CD} ",
          e.location
        ] }, void 0, true, {
          fileName: "app/routes/events._index.jsx",
          lineNumber: 112,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/events._index.jsx",
        lineNumber: 105,
        columnNumber: 15
      }, this)
    ] }, e.id, true, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 102,
      columnNumber: 28
    }, this)) }, void 0, false, {
      fileName: "app/routes/events._index.jsx",
      lineNumber: 101,
      columnNumber: 107
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/events._index.jsx",
    lineNumber: 81,
    columnNumber: 10
  }, this);
}
_s(Events, "f/rRs99x0ofipSmqt8IPQVAPd6o=", false, function() {
  return [useLoaderData];
});
_c = Events;
var _c;
$RefreshReg$(_c, "Events");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Events as default,
  links
};
//# sourceMappingURL=/build/routes/events._index-NSAL5B7D.js.map
