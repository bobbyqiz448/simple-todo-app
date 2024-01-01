["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/labs/useragent/engine.js"],"~:js","goog.loadModule(function(exports) {\n  function isPresto() {\n    return util.matchUserAgent(\"Presto\");\n  }\n  function isTrident() {\n    return util.matchUserAgent(\"Trident\") || util.matchUserAgent(\"MSIE\");\n  }\n  function isEdge() {\n    return util.matchUserAgent(\"Edge\");\n  }\n  function isWebKit() {\n    return util.matchUserAgentIgnoreCase(\"WebKit\") && !isEdge();\n  }\n  function isGecko() {\n    return util.matchUserAgent(\"Gecko\") && !isWebKit() && !isTrident() && !isEdge();\n  }\n  function getVersion() {\n    const userAgentString = util.getUserAgent();\n    if (userAgentString) {\n      const tuples = util.extractVersionTuples(userAgentString);\n      const engineTuple = getEngineTuple(tuples);\n      if (engineTuple) {\n        if (engineTuple[0] == \"Gecko\") {\n          return getVersionForKey(tuples, \"Firefox\");\n        }\n        return engineTuple[1];\n      }\n      const browserTuple = tuples[0];\n      let info;\n      if (browserTuple && (info = browserTuple[2])) {\n        const match = /Trident\\/([^\\s;]+)/.exec(info);\n        if (match) {\n          return match[1];\n        }\n      }\n    }\n    return \"\";\n  }\n  function getEngineTuple(tuples) {\n    if (!isEdge()) {\n      return tuples[1];\n    }\n    for (let i = 0; i < tuples.length; i++) {\n      const tuple = tuples[i];\n      if (tuple[0] == \"Edge\") {\n        return tuple;\n      }\n    }\n  }\n  function isVersionOrHigher(version) {\n    return googString.compareVersions(getVersion(), version) >= 0;\n  }\n  function getVersionForKey(tuples, key) {\n    const pair = googArray.find(tuples, function(pair) {\n      return key == pair[0];\n    });\n    return pair && pair[1] || \"\";\n  }\n  \"use strict\";\n  goog.module(\"goog.labs.userAgent.engine\");\n  goog.module.declareLegacyNamespace();\n  const googArray = goog.require(\"goog.array\");\n  const googString = goog.require(\"goog.string.internal\");\n  const util = goog.require(\"goog.labs.userAgent.util\");\n  exports = {getVersion, isEdge, isGecko, isPresto, isTrident, isVersionOrHigher, isWebKit};\n  return exports;\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Closure user agent detection.\n * @see http://en.wikipedia.org/wiki/User_agent\n * For more information on browser brand, platform, or device see the other\n * sub-namespaces in goog.labs.userAgent (browser, platform, and device).\n */\n\ngoog.module('goog.labs.userAgent.engine');\ngoog.module.declareLegacyNamespace();\n\nconst googArray = goog.require('goog.array');\nconst googString = goog.require('goog.string.internal');\nconst util = goog.require('goog.labs.userAgent.util');\n\n/**\n * @return {boolean} Whether the rendering engine is Presto.\n */\nfunction isPresto() {\n  return util.matchUserAgent('Presto');\n}\n\n/**\n * @return {boolean} Whether the rendering engine is Trident.\n */\nfunction isTrident() {\n  // IE only started including the Trident token in IE8.\n  return util.matchUserAgent('Trident') || util.matchUserAgent('MSIE');\n}\n\n/**\n * @return {boolean} Whether the rendering engine is EdgeHTML.\n */\nfunction isEdge() {\n  return util.matchUserAgent('Edge');\n}\n\n/**\n * @return {boolean} Whether the rendering engine is WebKit. This will return\n * true for Chrome, Blink-based Opera (15+), Edge Chromium and Safari.\n */\nfunction isWebKit() {\n  return util.matchUserAgentIgnoreCase('WebKit') && !isEdge();\n}\n\n/**\n * @return {boolean} Whether the rendering engine is Gecko.\n */\nfunction isGecko() {\n  return util.matchUserAgent('Gecko') && !isWebKit() && !isTrident() &&\n      !isEdge();\n}\n\n/**\n * @return {string} The rendering engine's version or empty string if version\n *     can't be determined.\n */\nfunction getVersion() {\n  const userAgentString = util.getUserAgent();\n  if (userAgentString) {\n    const tuples = util.extractVersionTuples(userAgentString);\n\n    const engineTuple = getEngineTuple(tuples);\n    if (engineTuple) {\n      // In Gecko, the version string is either in the browser info or the\n      // Firefox version.  See Gecko user agent string reference:\n      // http://goo.gl/mULqa\n      if (engineTuple[0] == 'Gecko') {\n        return getVersionForKey(tuples, 'Firefox');\n      }\n\n      return engineTuple[1];\n    }\n\n    // MSIE has only one version identifier, and the Trident version is\n    // specified in the parenthetical. IE Edge is covered in the engine tuple\n    // detection.\n    const browserTuple = tuples[0];\n    let info;\n    if (browserTuple && (info = browserTuple[2])) {\n      const match = /Trident\\/([^\\s;]+)/.exec(info);\n      if (match) {\n        return match[1];\n      }\n    }\n  }\n  return '';\n}\n\n/**\n * @param {!Array<!Array<string>>} tuples Extracted version tuples.\n * @return {!Array<string>|undefined} The engine tuple or undefined if not\n *     found.\n */\nfunction getEngineTuple(tuples) {\n  if (!isEdge()) {\n    return tuples[1];\n  }\n  for (let i = 0; i < tuples.length; i++) {\n    const tuple = tuples[i];\n    if (tuple[0] == 'Edge') {\n      return tuple;\n    }\n  }\n}\n\n/**\n * @param {string|number} version The version to check.\n * @return {boolean} Whether the rendering engine version is higher or the same\n *     as the given version.\n */\nfunction isVersionOrHigher(version) {\n  return googString.compareVersions(getVersion(), version) >= 0;\n}\n\n/**\n * @param {!Array<!Array<string>>} tuples Version tuples.\n * @param {string} key The key to look for.\n * @return {string} The version string of the given key, if present.\n *     Otherwise, the empty string.\n */\nfunction getVersionForKey(tuples, key) {\n  // TODO(nnaze): Move to util if useful elsewhere.\n\n  const pair = googArray.find(tuples, function(pair) {\n    return key == pair[0];\n  });\n\n  return pair && pair[1] || '';\n}\n\nexports = {\n  getVersion,\n  isEdge,\n  isGecko,\n  isPresto,\n  isTrident,\n  isVersionOrHigher,\n  isWebKit,\n};\n","~:compiled-at",1704111218429,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.labs.useragent.engine.js\",\n\"lineCount\":68,\n\"mappings\":\"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\",\n\"sources\":[\"goog/labs/useragent/engine.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Closure user agent detection.\\n * @see http://en.wikipedia.org/wiki/User_agent\\n * For more information on browser brand, platform, or device see the other\\n * sub-namespaces in goog.labs.userAgent (browser, platform, and device).\\n */\\n\\ngoog.module('goog.labs.userAgent.engine');\\ngoog.module.declareLegacyNamespace();\\n\\nconst googArray = goog.require('goog.array');\\nconst googString = goog.require('goog.string.internal');\\nconst util = goog.require('goog.labs.userAgent.util');\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Presto.\\n */\\nfunction isPresto() {\\n  return util.matchUserAgent('Presto');\\n}\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Trident.\\n */\\nfunction isTrident() {\\n  // IE only started including the Trident token in IE8.\\n  return util.matchUserAgent('Trident') || util.matchUserAgent('MSIE');\\n}\\n\\n/**\\n * @return {boolean} Whether the rendering engine is EdgeHTML.\\n */\\nfunction isEdge() {\\n  return util.matchUserAgent('Edge');\\n}\\n\\n/**\\n * @return {boolean} Whether the rendering engine is WebKit. This will return\\n * true for Chrome, Blink-based Opera (15+), Edge Chromium and Safari.\\n */\\nfunction isWebKit() {\\n  return util.matchUserAgentIgnoreCase('WebKit') && !isEdge();\\n}\\n\\n/**\\n * @return {boolean} Whether the rendering engine is Gecko.\\n */\\nfunction isGecko() {\\n  return util.matchUserAgent('Gecko') && !isWebKit() && !isTrident() &&\\n      !isEdge();\\n}\\n\\n/**\\n * @return {string} The rendering engine's version or empty string if version\\n *     can't be determined.\\n */\\nfunction getVersion() {\\n  const userAgentString = util.getUserAgent();\\n  if (userAgentString) {\\n    const tuples = util.extractVersionTuples(userAgentString);\\n\\n    const engineTuple = getEngineTuple(tuples);\\n    if (engineTuple) {\\n      // In Gecko, the version string is either in the browser info or the\\n      // Firefox version.  See Gecko user agent string reference:\\n      // http://goo.gl/mULqa\\n      if (engineTuple[0] == 'Gecko') {\\n        return getVersionForKey(tuples, 'Firefox');\\n      }\\n\\n      return engineTuple[1];\\n    }\\n\\n    // MSIE has only one version identifier, and the Trident version is\\n    // specified in the parenthetical. IE Edge is covered in the engine tuple\\n    // detection.\\n    const browserTuple = tuples[0];\\n    let info;\\n    if (browserTuple && (info = browserTuple[2])) {\\n      const match = /Trident\\\\/([^\\\\s;]+)/.exec(info);\\n      if (match) {\\n        return match[1];\\n      }\\n    }\\n  }\\n  return '';\\n}\\n\\n/**\\n * @param {!Array<!Array<string>>} tuples Extracted version tuples.\\n * @return {!Array<string>|undefined} The engine tuple or undefined if not\\n *     found.\\n */\\nfunction getEngineTuple(tuples) {\\n  if (!isEdge()) {\\n    return tuples[1];\\n  }\\n  for (let i = 0; i < tuples.length; i++) {\\n    const tuple = tuples[i];\\n    if (tuple[0] == 'Edge') {\\n      return tuple;\\n    }\\n  }\\n}\\n\\n/**\\n * @param {string|number} version The version to check.\\n * @return {boolean} Whether the rendering engine version is higher or the same\\n *     as the given version.\\n */\\nfunction isVersionOrHigher(version) {\\n  return googString.compareVersions(getVersion(), version) >= 0;\\n}\\n\\n/**\\n * @param {!Array<!Array<string>>} tuples Version tuples.\\n * @param {string} key The key to look for.\\n * @return {string} The version string of the given key, if present.\\n *     Otherwise, the empty string.\\n */\\nfunction getVersionForKey(tuples, key) {\\n  // TODO(nnaze): Move to util if useful elsewhere.\\n\\n  const pair = googArray.find(tuples, function(pair) {\\n    return key == pair[0];\\n  });\\n\\n  return pair && pair[1] || '';\\n}\\n\\nexports = {\\n  getVersion,\\n  isEdge,\\n  isGecko,\\n  isPresto,\\n  isTrident,\\n  isVersionOrHigher,\\n  isWebKit,\\n};\\n\"],\n\"names\":[\"isPresto\",\"util\",\"matchUserAgent\",\"isTrident\",\"isEdge\",\"isWebKit\",\"matchUserAgentIgnoreCase\",\"isGecko\",\"getVersion\",\"userAgentString\",\"getUserAgent\",\"tuples\",\"extractVersionTuples\",\"engineTuple\",\"getEngineTuple\",\"getVersionForKey\",\"browserTuple\",\"info\",\"match\",\"exec\",\"i\",\"length\",\"tuple\",\"isVersionOrHigher\",\"version\",\"googString\",\"compareVersions\",\"key\",\"pair\",\"googArray\",\"find\",\"goog\",\"module\",\"declareLegacyNamespace\",\"require\",\"exports\"]\n}\n"]