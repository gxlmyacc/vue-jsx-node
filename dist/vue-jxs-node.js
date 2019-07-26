/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  install: function install(Vue) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      componentName: ''
    };

    var VueJsxNode = __webpack_require__(/*! ./vue-jsx-node */ "./src/vue-jsx-node.js")(Vue);

    Vue.component(options.componentName || VueJsxNode.name, VueJsxNode);
  }
};

/***/ }),

/***/ "./src/vue-jsx-node.js":
/*!*****************************!*\
  !*** ./src/vue-jsx-node.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _default(Vue) {
  function camelize(str) {
    return str.replace(/-(\w)/g, function (_, c) {
      return c ? c.toUpperCase() : '';
    });
  }

  function renderContentStr(h, context, content, _ref) {
    var classes = _ref.classes,
        styles = _ref.styles;
    var domProps = {};
    classes.push('vue-jsx-node');
    if (context.props.pre) styles.push({
      wordBreak: 'break-all',
      whiteSpace: 'pre'
    });
    if (context.props.text) domProps.innerText = content;else domProps.innerHTML = context.props.sanitize && Vue.$sanitize ? Vue.$sanitize(content) : content;
    return h(context.props.tag, Object.assign(context.data, {
      calss: classes,
      style: styles,
      domProps: domProps
    }));
  }

  function renderContentFn(h, context, content) {
    var renderThis = context.props.context || context.parent;

    var $emit = function $emit(event, payload) {
      if (!event || !context.listeners) return;
      var handler = context.listeners[event];
      if (!handler) return;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return handler.call.apply(handler, [renderThis, payload].concat(args));
    };

    var datas = {
      slots: context.slots,
      $emit: $emit,
      $parent: context.parent,
      $children: context.children,
      $scopedSlots: context.scopedSlots,
      $props: context.props,
      $slots: context.$slots,
      $listeners: context.listeners
    }; // console.log('renderContentFn', datas, context);

    Object.keys(context.data.attrs).forEach(function (key) {
      return datas[camelize(key)] = context.data.attrs[key];
    });
    return content.call(renderThis, h, datas, context.props.context || context);
  }

  function mergeContext(node, context, _ref2) {
    var _node$data$class, _data$style, _data$directives;

    var classes = _ref2.classes,
        styles = _ref2.styles;
    if (!node || !node.data) return node;
    var data = node.data;
    if (!data.class) data.class = [];else if (!Array.isArray(data.class)) data.class = [data.class];

    (_node$data$class = node.data.class).push.apply(_node$data$class, _toConsumableArray(classes));

    if (!data.style) data.style = [];else if (!Array.isArray(data.style)) data.style = [data.style];

    (_data$style = data.style).push.apply(_data$style, _toConsumableArray(styles));

    if (!data.attrs) data.attrs = {};
    Object.assign(data.attrs, context.data.attrs);
    if (!data.on) data.on = {};
    Object.keys(context.listeners).forEach(function (key) {
      if (data.on[key]) return;
      data.on[key] = context.listeners[key];
    });
    if (!data.directives) data.directives = [];
    if (context.data.directives) (_data$directives = data.directives).push.apply(_data$directives, _toConsumableArray(context.data.directives));
    Object.keys(context.data).forEach(function (key) {
      if (['class', 'style', 'attrs', 'on', 'directives'].includes(key)) return;
      data[key] = context.data[key];
    }); // console.log('vue-jsx-node', node, context);

    return node;
  }

  return {
    name: 'VueJsxNode',
    functional: true,
    abstract: true,
    inheritAttrs: false,
    props: {
      content: {
        type: [String, Object, Array, Function],
        default: null
      },
      context: {
        type: Object,
        default: null
      },
      sanitize: {
        type: Boolean,
        default: true
      },
      text: {
        type: Boolean,
        default: false
      },
      pre: {
        type: Boolean,
        default: false
      },
      defaultSlotName: {
        type: String,
        default: 'default'
      },
      tag: {
        type: String,
        default: 'div'
      }
    },
    render: function render(h, context) {
      var content = context.props.content;
      var classes = [];
      if (context.data.class) classes.push(context.data.class);
      if (context.data.staticClass) classes.push(context.data.staticClass);
      var styles = [];
      if (context.data.style) styles.push(context.data.style);
      if (context.data.staticStyle) styles.push(context.data.staticStyle);

      if (content && typeof content === 'string') {
        return renderContentStr(h, context, content, {
          classes: classes,
          styles: styles
        });
      }

      var node;
      if (typeof content === 'function') node = renderContentFn(h, context, content);else node = content || context.slots()[context.props.defaultSlotName] || null;
      return mergeContext(node, context, {
        classes: classes,
        styles: styles
      });
    }
  };
}

/***/ })

/******/ });
//# sourceMappingURL=vue-jxs-node.js.map