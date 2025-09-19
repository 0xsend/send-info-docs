"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/hast-util-to-string";
exports.ids = ["vendor-chunks/hast-util-to-string"];
exports.modules = {

/***/ "(rsc)/./node_modules/hast-util-to-string/lib/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/hast-util-to-string/lib/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   toString: () => (/* binding */ toString)\n/* harmony export */ });\n/**\n * @import {Nodes, Parents} from 'hast'\n */\n\n/**\n * Get the plain-text value of a hast node.\n *\n * @param {Nodes} node\n *   Node to serialize.\n * @returns {string}\n *   Serialized node.\n */\nfunction toString(node) {\n  // “The concatenation of data of all the Text node descendants of the context\n  // object, in tree order.”\n  if ('children' in node) {\n    return all(node)\n  }\n\n  // “Context object’s data.”\n  return 'value' in node ? node.value : ''\n}\n\n/**\n * @param {Nodes} node\n *   Node.\n * @returns {string}\n *   Serialized node.\n */\nfunction one(node) {\n  if (node.type === 'text') {\n    return node.value\n  }\n\n  return 'children' in node ? all(node) : ''\n}\n\n/**\n * @param {Parents} node\n *   Node.\n * @returns {string}\n *   Serialized node.\n */\nfunction all(node) {\n  let index = -1\n  /** @type {Array<string>} */\n  const result = []\n\n  while (++index < node.children.length) {\n    result[index] = one(node.children[index])\n  }\n\n  return result.join('')\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLXN0cmluZy9saWIvaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyIvVXNlcnMvZXJpY3NhbXVkaW8vQ29kZS9zZW5kLWluZm8tZG9jcy9ub2RlX21vZHVsZXMvaGFzdC11dGlsLXRvLXN0cmluZy9saWIvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAaW1wb3J0IHtOb2RlcywgUGFyZW50c30gZnJvbSAnaGFzdCdcbiAqL1xuXG4vKipcbiAqIEdldCB0aGUgcGxhaW4tdGV4dCB2YWx1ZSBvZiBhIGhhc3Qgbm9kZS5cbiAqXG4gKiBAcGFyYW0ge05vZGVzfSBub2RlXG4gKiAgIE5vZGUgdG8gc2VyaWFsaXplLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2RlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9TdHJpbmcobm9kZSkge1xuICAvLyDigJxUaGUgY29uY2F0ZW5hdGlvbiBvZiBkYXRhIG9mIGFsbCB0aGUgVGV4dCBub2RlIGRlc2NlbmRhbnRzIG9mIHRoZSBjb250ZXh0XG4gIC8vIG9iamVjdCwgaW4gdHJlZSBvcmRlci7igJ1cbiAgaWYgKCdjaGlsZHJlbicgaW4gbm9kZSkge1xuICAgIHJldHVybiBhbGwobm9kZSlcbiAgfVxuXG4gIC8vIOKAnENvbnRleHQgb2JqZWN04oCZcyBkYXRhLuKAnVxuICByZXR1cm4gJ3ZhbHVlJyBpbiBub2RlID8gbm9kZS52YWx1ZSA6ICcnXG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2Rlc30gbm9kZVxuICogICBOb2RlLlxuICogQHJldHVybnMge3N0cmluZ31cbiAqICAgU2VyaWFsaXplZCBub2RlLlxuICovXG5mdW5jdGlvbiBvbmUobm9kZSkge1xuICBpZiAobm9kZS50eXBlID09PSAndGV4dCcpIHtcbiAgICByZXR1cm4gbm9kZS52YWx1ZVxuICB9XG5cbiAgcmV0dXJuICdjaGlsZHJlbicgaW4gbm9kZSA/IGFsbChub2RlKSA6ICcnXG59XG5cbi8qKlxuICogQHBhcmFtIHtQYXJlbnRzfSBub2RlXG4gKiAgIE5vZGUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogICBTZXJpYWxpemVkIG5vZGUuXG4gKi9cbmZ1bmN0aW9uIGFsbChub2RlKSB7XG4gIGxldCBpbmRleCA9IC0xXG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgcmVzdWx0ID0gW11cblxuICB3aGlsZSAoKytpbmRleCA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IG9uZShub2RlLmNoaWxkcmVuW2luZGV4XSlcbiAgfVxuXG4gIHJldHVybiByZXN1bHQuam9pbignJylcbn1cbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/hast-util-to-string/lib/index.js\n");

/***/ })

};
;