/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./interbuild/main.js":
/*!****************************!*\
  !*** ./interbuild/main.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    var desc = Object.getOwnPropertyDescriptor(m, k);\n    if (!desc || (\"get\" in desc ? !m.__esModule : desc.writable || desc.configurable)) {\n      desc = { enumerable: true, get: function() { return m[k]; } };\n    }\n    Object.defineProperty(o, k2, desc);\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (k !== \"default\" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst wasm = __importStar(__webpack_require__(/*! rs_tetris_utils/ */ \"./rs_tetris_utils/pkg/rs_tetris_utils.js\"));\nlet vec2 = new wasm.Vec2();\nconsole.log(vec2);\n\n\n//# sourceURL=webpack://tetra_web/./interbuild/main.js?");

/***/ }),

/***/ "./rs_tetris_utils/pkg/rs_tetris_utils.js":
/*!************************************************!*\
  !*** ./rs_tetris_utils/pkg/rs_tetris_utils.js ***!
  \************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Board: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Board),\n/* harmony export */   Direction: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Direction),\n/* harmony export */   Field: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Field),\n/* harmony export */   Piece: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Piece),\n/* harmony export */   PieceColor: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.PieceColor),\n/* harmony export */   Queue: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Queue),\n/* harmony export */   Tetra: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Tetra),\n/* harmony export */   Vec2: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.Vec2),\n/* harmony export */   __wbg_set_wasm: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm),\n/* harmony export */   __wbindgen_throw: () => (/* reexport safe */ _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbindgen_throw)\n/* harmony export */ });\n/* harmony import */ var _rs_tetris_utils_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rs_tetris_utils_bg.wasm */ \"./rs_tetris_utils/pkg/rs_tetris_utils_bg.wasm\");\n/* harmony import */ var _rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rs_tetris_utils_bg.js */ \"./rs_tetris_utils/pkg/rs_tetris_utils_bg.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_rs_tetris_utils_bg_wasm__WEBPACK_IMPORTED_MODULE_1__]);\n_rs_tetris_utils_bg_wasm__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n(0,_rs_tetris_utils_bg_js__WEBPACK_IMPORTED_MODULE_0__.__wbg_set_wasm)(_rs_tetris_utils_bg_wasm__WEBPACK_IMPORTED_MODULE_1__);\n\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });\n\n//# sourceURL=webpack://tetra_web/./rs_tetris_utils/pkg/rs_tetris_utils.js?");

/***/ }),

/***/ "./rs_tetris_utils/pkg/rs_tetris_utils_bg.js":
/*!***************************************************!*\
  !*** ./rs_tetris_utils/pkg/rs_tetris_utils_bg.js ***!
  \***************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Board: () => (/* binding */ Board),\n/* harmony export */   Direction: () => (/* binding */ Direction),\n/* harmony export */   Field: () => (/* binding */ Field),\n/* harmony export */   Piece: () => (/* binding */ Piece),\n/* harmony export */   PieceColor: () => (/* binding */ PieceColor),\n/* harmony export */   Queue: () => (/* binding */ Queue),\n/* harmony export */   Tetra: () => (/* binding */ Tetra),\n/* harmony export */   Vec2: () => (/* binding */ Vec2),\n/* harmony export */   __wbg_set_wasm: () => (/* binding */ __wbg_set_wasm),\n/* harmony export */   __wbindgen_throw: () => (/* binding */ __wbindgen_throw)\n/* harmony export */ });\n/* module decorator */ module = __webpack_require__.hmd(module);\nlet wasm;\nfunction __wbg_set_wasm(val) {\n    wasm = val;\n}\n\n\nconst lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;\n\nlet cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction _assertClass(instance, klass) {\n    if (!(instance instanceof klass)) {\n        throw new Error(`expected instance of ${klass.name}`);\n    }\n    return instance.ptr;\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n/**\n*/\nconst PieceColor = Object.freeze({ B:0,\"0\":\"B\",I:1,\"1\":\"I\",L:2,\"2\":\"L\",O:3,\"3\":\"O\",Z:4,\"4\":\"Z\",T:5,\"5\":\"T\",J:6,\"6\":\"J\",S:7,\"7\":\"S\", });\n/**\n*/\nconst Direction = Object.freeze({ North:0,\"0\":\"North\",East:1,\"1\":\"East\",South:2,\"2\":\"South\",West:3,\"3\":\"West\", });\n\nconst BoardFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_board_free(ptr >>> 0));\n/**\n*/\nclass Board {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Board.prototype);\n        obj.__wbg_ptr = ptr;\n        BoardFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        BoardFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_board_free(ptr);\n    }\n}\n\nconst FieldFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_field_free(ptr >>> 0));\n/**\n*/\nclass Field {\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        FieldFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_field_free(ptr);\n    }\n    /**\n    * @returns {Board}\n    */\n    get board() {\n        const ret = wasm.__wbg_get_field_board(this.__wbg_ptr);\n        return Board.__wrap(ret);\n    }\n    /**\n    * @param {Board} arg0\n    */\n    set board(arg0) {\n        _assertClass(arg0, Board);\n        var ptr0 = arg0.__destroy_into_raw();\n        wasm.__wbg_set_field_board(this.__wbg_ptr, ptr0);\n    }\n    /**\n    * @returns {Piece | undefined}\n    */\n    get active_piece() {\n        const ret = wasm.__wbg_get_field_active_piece(this.__wbg_ptr);\n        return ret === 0 ? undefined : Piece.__wrap(ret);\n    }\n    /**\n    * @param {Piece | undefined} [arg0]\n    */\n    set active_piece(arg0) {\n        let ptr0 = 0;\n        if (!isLikeNone(arg0)) {\n            _assertClass(arg0, Piece);\n            ptr0 = arg0.__destroy_into_raw();\n        }\n        wasm.__wbg_set_field_active_piece(this.__wbg_ptr, ptr0);\n    }\n}\n\nconst PieceFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_piece_free(ptr >>> 0));\n/**\n*/\nclass Piece {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Piece.prototype);\n        obj.__wbg_ptr = ptr;\n        PieceFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        PieceFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_piece_free(ptr);\n    }\n    /**\n    * @returns {PieceColor}\n    */\n    get color() {\n        const ret = wasm.__wbg_get_piece_color(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {PieceColor} arg0\n    */\n    set color(arg0) {\n        wasm.__wbg_set_piece_color(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {Direction}\n    */\n    get rotation() {\n        const ret = wasm.__wbg_get_piece_rotation(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {Direction} arg0\n    */\n    set rotation(arg0) {\n        wasm.__wbg_set_piece_rotation(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {Vec2}\n    */\n    get position() {\n        const ret = wasm.__wbg_get_piece_position(this.__wbg_ptr);\n        return Vec2.__wrap(ret);\n    }\n    /**\n    * @param {Vec2} arg0\n    */\n    set position(arg0) {\n        _assertClass(arg0, Vec2);\n        var ptr0 = arg0.__destroy_into_raw();\n        wasm.__wbg_set_piece_position(this.__wbg_ptr, ptr0);\n    }\n}\n\nconst QueueFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_queue_free(ptr >>> 0));\n/**\n*/\nclass Queue {\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        QueueFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_queue_free(ptr);\n    }\n}\n\nconst TetraFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_tetra_free(ptr >>> 0));\n/**\n*/\nclass Tetra {\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        TetraFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_tetra_free(ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get score() {\n        const ret = wasm.__wbg_get_tetra_score(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set score(arg0) {\n        wasm.__wbg_set_tetra_score(this.__wbg_ptr, arg0);\n    }\n}\n\nconst Vec2Finalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_vec2_free(ptr >>> 0));\n/**\n*/\nclass Vec2 {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Vec2.prototype);\n        obj.__wbg_ptr = ptr;\n        Vec2Finalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        Vec2Finalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_vec2_free(ptr);\n    }\n    /**\n    * @returns {bigint}\n    */\n    get 0() {\n        const ret = wasm.__wbg_get_vec2_0(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {bigint} arg0\n    */\n    set 0(arg0) {\n        wasm.__wbg_set_vec2_0(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {bigint}\n    */\n    get 1() {\n        const ret = wasm.__wbg_get_vec2_1(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {bigint} arg0\n    */\n    set 1(arg0) {\n        wasm.__wbg_set_vec2_1(this.__wbg_ptr, arg0);\n    }\n}\n\nfunction __wbindgen_throw(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n\n//# sourceURL=webpack://tetra_web/./rs_tetris_utils/pkg/rs_tetris_utils_bg.js?");

/***/ }),

/***/ "./rs_tetris_utils/pkg/rs_tetris_utils_bg.wasm":
/*!*****************************************************!*\
  !*** ./rs_tetris_utils/pkg/rs_tetris_utils_bg.wasm ***!
  \*****************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("/* harmony import */ var WEBPACK_IMPORTED_MODULE_0 = __webpack_require__(/*! ./rs_tetris_utils_bg.js */ \"./rs_tetris_utils/pkg/rs_tetris_utils_bg.js\");\nmodule.exports = __webpack_require__.v(exports, module.id, \"aac144f0388d6eb77b67\", {\n\t\"./rs_tetris_utils_bg.js\": {\n\t\t\"__wbindgen_throw\": WEBPACK_IMPORTED_MODULE_0.__wbindgen_throw\n\t}\n});\n\n//# sourceURL=webpack://tetra_web/./rs_tetris_utils/pkg/rs_tetris_utils_bg.wasm?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/wasm loading */
/******/ 	(() => {
/******/ 		__webpack_require__.v = (exports, wasmModuleId, wasmModuleHash, importsObj) => {
/******/ 			var req = fetch(__webpack_require__.p + "" + wasmModuleHash + ".module.wasm");
/******/ 			var fallback = () => (req
/******/ 				.then((x) => (x.arrayBuffer()))
/******/ 				.then((bytes) => (WebAssembly.instantiate(bytes, importsObj)))
/******/ 				.then((res) => (Object.assign(exports, res.instance.exports))));
/******/ 			return req.then((res) => {
/******/ 				if (typeof WebAssembly.instantiateStreaming === "function") {
/******/ 					return WebAssembly.instantiateStreaming(res, importsObj)
/******/ 						.then(
/******/ 							(res) => (Object.assign(exports, res.instance.exports)),
/******/ 							(e) => {
/******/ 								if(res.headers.get("Content-Type") !== "application/wasm") {
/******/ 									console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
/******/ 									return fallback();
/******/ 								}
/******/ 								throw e;
/******/ 							}
/******/ 						);
/******/ 				}
/******/ 				return fallback();
/******/ 			});
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./interbuild/main.js");
/******/ 	
/******/ })()
;