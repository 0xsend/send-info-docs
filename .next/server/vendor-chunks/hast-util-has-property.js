"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-has-property";
exports.ids = ["vendor-chunks/hast-util-has-property"];
exports.modules = {

/***/ "(rsc)/./node_modules/hast-util-has-property/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/hast-util-has-property/lib/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   hasProperty: () => (/* binding */ hasProperty)\n/* harmony export */ });\n/**\n * @typedef {import('hast').Root} Root\n * @typedef {import('hast').Content} Content\n */\n\n/**\n * @typedef {Root | Content} Node\n */\n\nconst own = {}.hasOwnProperty\n\n/**\n * Check if `node`is an element and has a `field` property.\n *\n * @param {unknown} node\n *   Thing to check (typically `Element`).\n * @param {unknown} field\n *   Field name to check (typically `string`).\n * @returns {boolean}\n *   Whether `node` is an element that has a `field` property.\n */\nfunction hasProperty(node, field) {\n  const value =\n    typeof field === 'string' &&\n    isNode(node) &&\n    node.type === 'element' &&\n    node.properties &&\n    own.call(node.properties, field) &&\n    node.properties[field]\n\n  return value !== null && value !== undefined && value !== false\n}\n\n/**\n * @param {unknown} value\n * @returns {value is Node}\n */\nfunction isNode(value) {\n  return Boolean(value && typeof value === 'object' && 'type' in value)\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLWhhcy1wcm9wZXJ0eS9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsYUFBYSxxQkFBcUI7QUFDbEMsYUFBYSx3QkFBd0I7QUFDckM7O0FBRUE7QUFDQSxhQUFhLGdCQUFnQjtBQUM3Qjs7QUFFQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLFdBQVcsU0FBUztBQUNwQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2VyaWNzYW11ZGlvL0NvZGUvc2VuZC1pbmZvLWRvY3Mvbm9kZV9tb2R1bGVzL2hhc3QtdXRpbC1oYXMtcHJvcGVydHkvbGliL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgnaGFzdCcpLlJvb3R9IFJvb3RcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ2hhc3QnKS5Db250ZW50fSBDb250ZW50XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7Um9vdCB8IENvbnRlbnR9IE5vZGVcbiAqL1xuXG5jb25zdCBvd24gPSB7fS5oYXNPd25Qcm9wZXJ0eVxuXG4vKipcbiAqIENoZWNrIGlmIGBub2RlYGlzIGFuIGVsZW1lbnQgYW5kIGhhcyBhIGBmaWVsZGAgcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHt1bmtub3dufSBub2RlXG4gKiAgIFRoaW5nIHRvIGNoZWNrICh0eXBpY2FsbHkgYEVsZW1lbnRgKS5cbiAqIEBwYXJhbSB7dW5rbm93bn0gZmllbGRcbiAqICAgRmllbGQgbmFtZSB0byBjaGVjayAodHlwaWNhbGx5IGBzdHJpbmdgKS5cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogICBXaGV0aGVyIGBub2RlYCBpcyBhbiBlbGVtZW50IHRoYXQgaGFzIGEgYGZpZWxkYCBwcm9wZXJ0eS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhhc1Byb3BlcnR5KG5vZGUsIGZpZWxkKSB7XG4gIGNvbnN0IHZhbHVlID1cbiAgICB0eXBlb2YgZmllbGQgPT09ICdzdHJpbmcnICYmXG4gICAgaXNOb2RlKG5vZGUpICYmXG4gICAgbm9kZS50eXBlID09PSAnZWxlbWVudCcgJiZcbiAgICBub2RlLnByb3BlcnRpZXMgJiZcbiAgICBvd24uY2FsbChub2RlLnByb3BlcnRpZXMsIGZpZWxkKSAmJlxuICAgIG5vZGUucHJvcGVydGllc1tmaWVsZF1cblxuICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gZmFsc2Vcbn1cblxuLyoqXG4gKiBAcGFyYW0ge3Vua25vd259IHZhbHVlXG4gKiBAcmV0dXJucyB7dmFsdWUgaXMgTm9kZX1cbiAqL1xuZnVuY3Rpb24gaXNOb2RlKHZhbHVlKSB7XG4gIHJldHVybiBCb29sZWFuKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgJ3R5cGUnIGluIHZhbHVlKVxufVxuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/hast-util-has-property/lib/index.js\n");

/***/ })

};
;