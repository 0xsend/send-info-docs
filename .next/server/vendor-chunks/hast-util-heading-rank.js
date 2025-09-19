"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-heading-rank";
exports.ids = ["vendor-chunks/hast-util-heading-rank"];
exports.modules = {

/***/ "(rsc)/./node_modules/hast-util-heading-rank/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/hast-util-heading-rank/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headingRank: () => (/* binding */ headingRank)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').Content} Content\n */\n\n/**\n * @typedef {Root | Content} Node\n */\n\n// To do next major: return `undefined`.\n/**\n * Get the rank (`1` to `6`) of headings (`h1` to `h6`).\n *\n * @param {Node} node\n *   Node to check.\n * @returns {number | null}\n *   Rank of the heading or `null` if not a heading.\n */\nfunction headingRank(node) {\n  const name =\n    (node && node.type === 'element' && node.tagName.toLowerCase()) || ''\n  const code =\n    name.length === 2 && name.charCodeAt(0) === 104 /* `h` */\n      ? name.charCodeAt(1)\n      : 0\n  return code > 48 /* `0` */ && code < 55 /* `7` */ ? code - 48 /* `0` */ : null\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhlYWRpbmctcmFuay9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEMsYUFBYSx3QkFBd0I7QUFDckM7O0FBRUE7QUFDQSxhQUFhLGdCQUFnQjtBQUM3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsTUFBTTtBQUNqQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvZXJpY3NhbXVkaW8vQ29kZS9zZW5kLWluZm8tZG9jcy9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhlYWRpbmctcmFuay9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KCdoYXN0JykuUm9vdH0gUm9vdFxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLkNvbnRlbnR9IENvbnRlbnRcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtSb290IHwgQ29udGVudH0gTm9kZVxuICovXG5cbi8vIFRvIGRvIG5leHQgbWFqb3I6IHJldHVybiBgdW5kZWZpbmVkYC5cbi8qKlxuICogR2V0IHRoZSByYW5rIChgMWAgdG8gYDZgKSBvZiBoZWFkaW5ncyAoYGgxYCB0byBgaDZgKS5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGVcbiAqICAgTm9kZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtudW1iZXIgfCBudWxsfVxuICogICBSYW5rIG9mIHRoZSBoZWFkaW5nIG9yIGBudWxsYCBpZiBub3QgYSBoZWFkaW5nLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGVhZGluZ1Jhbmsobm9kZSkge1xuICBjb25zdCBuYW1lID1cbiAgICAobm9kZSAmJiBub2RlLnR5cGUgPT09ICdlbGVtZW50JyAmJiBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkgfHwgJydcbiAgY29uc3QgY29kZSA9XG4gICAgbmFtZS5sZW5ndGggPT09IDIgJiYgbmFtZS5jaGFyQ29kZUF0KDApID09PSAxMDQgLyogYGhgICovXG4gICAgICA/IG5hbWUuY2hhckNvZGVBdCgxKVxuICAgICAgOiAwXG4gIHJldHVybiBjb2RlID4gNDggLyogYDBgICovICYmIGNvZGUgPCA1NSAvKiBgN2AgKi8gPyBjb2RlIC0gNDggLyogYDBgICovIDogbnVsbFxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/hast-util-heading-rank/lib/index.js\n");

/***/ })

};
;