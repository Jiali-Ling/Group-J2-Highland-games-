import {
  require_db
} from "/build/_shared/chunk-6H6GA5NQ.js";
import {
  require_node
} from "/build/_shared/chunk-NBEH4DGX.js";
import {
  Form,
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

// app/routes/winners._index.jsx
var import_db = __toESM(require_db(), 1);
var import_node = __toESM(require_node(), 1);

// app/styles/winners.css?url
var winners_default = "/build/_assets/winners-A5HQX7N3.css?url";

// app/routes/winners._index.jsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\winners._index.jsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\winners._index.jsx"
  );
}
var links = () => [{
  rel: "stylesheet",
  href: winners_default
}];
function Winners() {
  _s();
  const {
    winners,
    years,
    year
  } = useLoaderData();
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", { className: "container winners-page", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "winners-header", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", { children: "Champions of the Highland Games" }, void 0, false, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 69,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Form, { method: "get", className: "winners-filter", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", { children: [
        "Filter by Year:",
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("select", { name: "year", defaultValue: year, children: [
          /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: "", children: "All Years" }, void 0, false, {
            fileName: "app/routes/winners._index.jsx",
            lineNumber: 76,
            columnNumber: 13
          }, this),
          years.map((y) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("option", { value: y, children: y }, y, false, {
            fileName: "app/routes/winners._index.jsx",
            lineNumber: 77,
            columnNumber: 29
          }, this))
        ] }, void 0, true, {
          fileName: "app/routes/winners._index.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/winners._index.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", { type: "submit", children: "Apply Filter" }, void 0, false, {
        fileName: "app/routes/winners._index.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    winners.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "no-results", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", { children: "No champions found for the selected criteria." }, void 0, false, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 84,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 83,
      columnNumber: 31
    }, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", { className: "winners-list", children: winners.map((w) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", { className: "winner-item", children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { className: "winner-info", children: [
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "winner-year", children: w.year }, void 0, false, {
          fileName: "app/routes/winners._index.jsx",
          lineNumber: 88,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "winner-category", children: w.category }, void 0, false, {
          fileName: "app/routes/winners._index.jsx",
          lineNumber: 89,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "winner-athlete", children: w.athlete }, void 0, false, {
          fileName: "app/routes/winners._index.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "app/routes/winners._index.jsx",
        lineNumber: 87,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { className: "winner-position", children: [
        "#",
        w.position
      ] }, void 0, true, {
        fileName: "app/routes/winners._index.jsx",
        lineNumber: 92,
        columnNumber: 15
      }, this)
    ] }, w.id, true, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 86,
      columnNumber: 29
    }, this)) }, void 0, false, {
      fileName: "app/routes/winners._index.jsx",
      lineNumber: 85,
      columnNumber: 18
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/winners._index.jsx",
    lineNumber: 67,
    columnNumber: 10
  }, this);
}
_s(Winners, "serzSaFRyd0EeK1ptySpeDZ/QGo=", false, function() {
  return [useLoaderData];
});
_c = Winners;
var _c;
$RefreshReg$(_c, "Winners");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Winners as default,
  links
};
//# sourceMappingURL=/build/routes/winners._index-NRAJQQKT.js.map
