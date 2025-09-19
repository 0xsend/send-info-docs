"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/rehype-stringify";
exports.ids = ["vendor-chunks/rehype-stringify"];
exports.modules = {

/***/ "(rsc)/./node_modules/rehype-stringify/lib/index.js":
/*!****************************************************!*\
  !*** ./node_modules/rehype-stringify/lib/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ rehypeStringify)\n/* harmony export */ });\n/* harmony import */ var hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! hast-util-to-html */ \"(rsc)/./node_modules/hast-util-to-html/lib/index.js\");\n/**\n * @import {Root} from 'hast'\n * @import {Options} from 'hast-util-to-html'\n * @import {Compiler, Processor} from 'unified'\n */\n\n\n\n/**\n * Plugin to add support for serializing as HTML.\n *\n * @param {Options | null | undefined} [options]\n *   Configuration (optional).\n * @returns {undefined}\n *   Nothing.\n */\nfunction rehypeStringify(options) {\n  /** @type {Processor<undefined, undefined, undefined, Root, string>} */\n  // @ts-expect-error: TS in JSDoc generates wrong types if `this` is typed regularly.\n  const self = this\n  const settings = {...self.data('settings'), ...options}\n\n  self.compiler = compiler\n\n  /**\n   * @type {Compiler<Root, string>}\n   */\n  function compiler(tree) {\n    return (0,hast_util_to_html__WEBPACK_IMPORTED_MODULE_0__.toHtml)(tree, settings)\n  }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLFlBQVksTUFBTTtBQUNsQixZQUFZLFNBQVM7QUFDckIsWUFBWSxxQkFBcUI7QUFDakM7O0FBRXdDOztBQUV4QztBQUNBO0FBQ0E7QUFDQSxXQUFXLDRCQUE0QjtBQUN2QztBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ2U7QUFDZixhQUFhLDBEQUEwRDtBQUN2RTtBQUNBO0FBQ0Esb0JBQW9COztBQUVwQjs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsV0FBVyx5REFBTTtBQUNqQjtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvZXJpY3NhbXVkaW8vQ29kZS9zZW5kLWluZm8tZG9jcy9ub2RlX21vZHVsZXMvcmVoeXBlLXN0cmluZ2lmeS9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAaW1wb3J0IHtSb290fSBmcm9tICdoYXN0J1xuICogQGltcG9ydCB7T3B0aW9uc30gZnJvbSAnaGFzdC11dGlsLXRvLWh0bWwnXG4gKiBAaW1wb3J0IHtDb21waWxlciwgUHJvY2Vzc29yfSBmcm9tICd1bmlmaWVkJ1xuICovXG5cbmltcG9ydCB7dG9IdG1sfSBmcm9tICdoYXN0LXV0aWwtdG8taHRtbCdcblxuLyoqXG4gKiBQbHVnaW4gdG8gYWRkIHN1cHBvcnQgZm9yIHNlcmlhbGl6aW5nIGFzIEhUTUwuXG4gKlxuICogQHBhcmFtIHtPcHRpb25zIHwgbnVsbCB8IHVuZGVmaW5lZH0gW29wdGlvbnNdXG4gKiAgIENvbmZpZ3VyYXRpb24gKG9wdGlvbmFsKS5cbiAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG4gKiAgIE5vdGhpbmcuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlaHlwZVN0cmluZ2lmeShvcHRpb25zKSB7XG4gIC8qKiBAdHlwZSB7UHJvY2Vzc29yPHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIFJvb3QsIHN0cmluZz59ICovXG4gIC8vIEB0cy1leHBlY3QtZXJyb3I6IFRTIGluIEpTRG9jIGdlbmVyYXRlcyB3cm9uZyB0eXBlcyBpZiBgdGhpc2AgaXMgdHlwZWQgcmVndWxhcmx5LlxuICBjb25zdCBzZWxmID0gdGhpc1xuICBjb25zdCBzZXR0aW5ncyA9IHsuLi5zZWxmLmRhdGEoJ3NldHRpbmdzJyksIC4uLm9wdGlvbnN9XG5cbiAgc2VsZi5jb21waWxlciA9IGNvbXBpbGVyXG5cbiAgLyoqXG4gICAqIEB0eXBlIHtDb21waWxlcjxSb290LCBzdHJpbmc+fVxuICAgKi9cbiAgZnVuY3Rpb24gY29tcGlsZXIodHJlZSkge1xuICAgIHJldHVybiB0b0h0bWwodHJlZSwgc2V0dGluZ3MpXG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/rehype-stringify/lib/index.js\n");

/***/ })

};
;