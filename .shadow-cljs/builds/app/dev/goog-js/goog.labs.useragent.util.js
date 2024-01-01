["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/labs/useragent/util.js"],"~:js","goog.loadModule(function(exports) {\n  function getNativeUserAgentString() {\n    const navigator = getNavigator();\n    if (navigator) {\n      const userAgent = navigator.userAgent;\n      if (userAgent) {\n        return userAgent;\n      }\n    }\n    return \"\";\n  }\n  function getNativeUserAgentData() {\n    const navigator = getNavigator();\n    if (navigator) {\n      return navigator.userAgentData || null;\n    }\n    return null;\n  }\n  function getNavigator() {\n    return goog.global.navigator;\n  }\n  function setUserAgent(userAgent = undefined) {\n    userAgentInternal = typeof userAgent === \"string\" ? userAgent : getNativeUserAgentString();\n  }\n  function getUserAgent() {\n    return userAgentInternal == null ? getNativeUserAgentString() : userAgentInternal;\n  }\n  function setUserAgentData(userAgentData) {\n    userAgentDataInternal = userAgentData;\n  }\n  function resetUserAgentData() {\n    userAgentDataInternal = getNativeUserAgentData();\n  }\n  function getUserAgentData() {\n    return userAgentDataInternal;\n  }\n  function matchUserAgentDataBrand(str) {\n    if (!useClientHints()) {\n      return false;\n    }\n    const data = getUserAgentData();\n    if (!data) {\n      return false;\n    }\n    return data.brands.some(({brand}) => {\n      return brand && contains(brand, str);\n    });\n  }\n  function matchUserAgent(str) {\n    const userAgent = getUserAgent();\n    return contains(userAgent, str);\n  }\n  function matchUserAgentIgnoreCase(str) {\n    const userAgent = getUserAgent();\n    return caseInsensitiveContains(userAgent, str);\n  }\n  function extractVersionTuples(userAgent) {\n    const versionRegExp = new RegExp(\"([A-Z][\\\\w ]+)\" + \"/\" + \"([^\\\\s]+)\" + \"\\\\s*\" + \"(?:\\\\((.*?)\\\\))?\", \"g\");\n    const data = [];\n    let match;\n    for (; match = versionRegExp.exec(userAgent);) {\n      data.push([match[1], match[2], match[3] || undefined]);\n    }\n    return data;\n  }\n  \"use strict\";\n  goog.module(\"goog.labs.userAgent.util\");\n  goog.module.declareLegacyNamespace();\n  const {caseInsensitiveContains, contains} = goog.require(\"goog.string.internal\");\n  const {useClientHints} = goog.require(\"goog.labs.userAgent\");\n  const ASSUME_CLIENT_HINTS_SUPPORT = false;\n  let userAgentInternal = null;\n  let userAgentDataInternal = getNativeUserAgentData();\n  exports = {ASSUME_CLIENT_HINTS_SUPPORT, extractVersionTuples, getNativeUserAgentString, getUserAgent, getUserAgentData, matchUserAgent, matchUserAgentDataBrand, matchUserAgentIgnoreCase, resetUserAgentData, setUserAgent, setUserAgentData};\n  return exports;\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Utilities used by goog.labs.userAgent tools. These functions\n * should not be used outside of goog.labs.userAgent.*.\n *\n */\n\ngoog.module('goog.labs.userAgent.util');\ngoog.module.declareLegacyNamespace();\n\nconst {caseInsensitiveContains, contains} = goog.require('goog.string.internal');\nconst {useClientHints} = goog.require('goog.labs.userAgent');\n\n/**\n * @const {boolean} If true, use navigator.userAgentData without check.\n * TODO(user): FEATURESET_YEAR >= 2024 if it supports mobile and all the\n * brands we need.  See https://caniuse.com/mdn-api_navigator_useragentdata.\n */\nconst ASSUME_CLIENT_HINTS_SUPPORT = false;\n\n/**\n * Gets the native userAgent string from navigator if it exists.\n * If navigator or navigator.userAgent string is missing, returns an empty\n * string.\n * @return {string}\n */\nfunction getNativeUserAgentString() {\n  const navigator = getNavigator();\n  if (navigator) {\n    const userAgent = navigator.userAgent;\n    if (userAgent) {\n      return userAgent;\n    }\n  }\n  return '';\n}\n\n/**\n * Gets the native userAgentData object from navigator if it exists.\n * If navigator.userAgentData object is missing returns null.\n * @return {?NavigatorUAData}\n */\nfunction getNativeUserAgentData() {\n  const navigator = getNavigator();\n  // TODO(user): Use navigator?.userAgent ?? null once it's supported.\n  if (navigator) {\n    return navigator.userAgentData || null;\n  }\n  return null;\n}\n\n/**\n * Getter for the native navigator.\n * @return {!Navigator}\n */\nfunction getNavigator() {\n  return goog.global.navigator;\n}\n\n/**\n * A possible override for applications which wish to not check\n * navigator.userAgent but use a specified value for detection instead.\n * @type {?string}\n */\nlet userAgentInternal = null;\n\n/**\n * A possible override for applications which wish to not check\n * navigator.userAgentData but use a specified value for detection instead.\n * @type {?NavigatorUAData}\n */\nlet userAgentDataInternal = getNativeUserAgentData();\n\n/**\n * Override the user agent string with the given value.\n * This should only be used for testing within the goog.labs.userAgent\n * namespace.\n * Pass `null` to use the native browser object instead.\n * @param {?string=} userAgent The userAgent override.\n * @return {void}\n */\nfunction setUserAgent(userAgent = undefined) {\n  userAgentInternal =\n      typeof userAgent === 'string' ? userAgent : getNativeUserAgentString();\n}\n\n/** @return {string} The user agent string. */\nfunction getUserAgent() {\n  return userAgentInternal == null ? getNativeUserAgentString() :\n                                     userAgentInternal;\n}\n\n/**\n * Override the user agent data object with the given value.\n * This should only be used for testing within the goog.labs.userAgent\n * namespace.\n * Pass `null` to specify the absence of userAgentData. Note that this behavior\n * is different from setUserAgent.\n * @param {?NavigatorUAData} userAgentData The userAgentData override.\n */\nfunction setUserAgentData(userAgentData) {\n  userAgentDataInternal = userAgentData;\n}\n\n/**\n * If the user agent data object was overridden using setUserAgentData,\n * reset it so that it uses the native browser object instead, if it exists.\n */\nfunction resetUserAgentData() {\n  userAgentDataInternal = getNativeUserAgentData();\n}\n\n/** @return {?NavigatorUAData} Navigator.userAgentData if exist */\nfunction getUserAgentData() {\n  return userAgentDataInternal;\n}\n\n/**\n * Checks if any string in userAgentData.brands matches str.\n * Returns false if userAgentData is not supported.\n * @param {string} str\n * @return {boolean} Whether any brand string from userAgentData contains the\n *     given string.\n */\nfunction matchUserAgentDataBrand(str) {\n  if (!useClientHints()) return false;\n  const data = getUserAgentData();\n  if (!data) return false;\n  return data.brands.some(({brand}) => brand && contains(brand, str));\n}\n\n/**\n * @param {string} str\n * @return {boolean} Whether the user agent contains the given string.\n */\nfunction matchUserAgent(str) {\n  const userAgent = getUserAgent();\n  return contains(userAgent, str);\n}\n\n/**\n * @param {string} str\n * @return {boolean} Whether the user agent contains the given string, ignoring\n *     case.\n */\nfunction matchUserAgentIgnoreCase(str) {\n  const userAgent = getUserAgent();\n  return caseInsensitiveContains(userAgent, str);\n}\n\n/**\n * Parses the user agent into tuples for each section.\n * @param {string} userAgent\n * @return {!Array<!Array<string>>} Tuples of key, version, and the contents of\n *     the parenthetical.\n */\nfunction extractVersionTuples(userAgent) {\n  // Matches each section of a user agent string.\n  // Example UA:\n  // Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us)\n  // AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405\n  // This has three version tuples: Mozilla, AppleWebKit, and Mobile.\n\n  const versionRegExp = new RegExp(\n      // Key. Note that a key may have a space.\n      // (i.e. 'Mobile Safari' in 'Mobile Safari/5.0')\n      '([A-Z][\\\\w ]+)' +\n\n          '/' +                // slash\n          '([^\\\\s]+)' +        // version (i.e. '5.0b')\n          '\\\\s*' +             // whitespace\n          '(?:\\\\((.*?)\\\\))?',  // parenthetical info. parentheses not matched.\n      'g');\n\n  const data = [];\n  let match;\n\n  // Iterate and collect the version tuples.  Each iteration will be the\n  // next regex match.\n  while (match = versionRegExp.exec(userAgent)) {\n    data.push([\n      match[1],  // key\n      match[2],  // value\n      // || undefined as this is not undefined in IE7 and IE8\n      match[3] || undefined  // info\n    ]);\n  }\n\n  return data;\n}\n\nexports = {\n  ASSUME_CLIENT_HINTS_SUPPORT,\n  extractVersionTuples,\n  getNativeUserAgentString,\n  getUserAgent,\n  getUserAgentData,\n  matchUserAgent,\n  matchUserAgentDataBrand,\n  matchUserAgentIgnoreCase,\n  resetUserAgentData,\n  setUserAgent,\n  setUserAgentData,\n};\n","~:compiled-at",1704111218299,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.labs.useragent.util.js\",\n\"lineCount\":77,\n\"mappings\":\"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\",\n\"sources\":[\"goog/labs/useragent/util.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Utilities used by goog.labs.userAgent tools. These functions\\n * should not be used outside of goog.labs.userAgent.*.\\n *\\n */\\n\\ngoog.module('goog.labs.userAgent.util');\\ngoog.module.declareLegacyNamespace();\\n\\nconst {caseInsensitiveContains, contains} = goog.require('goog.string.internal');\\nconst {useClientHints} = goog.require('goog.labs.userAgent');\\n\\n/**\\n * @const {boolean} If true, use navigator.userAgentData without check.\\n * TODO(user): FEATURESET_YEAR >= 2024 if it supports mobile and all the\\n * brands we need.  See https://caniuse.com/mdn-api_navigator_useragentdata.\\n */\\nconst ASSUME_CLIENT_HINTS_SUPPORT = false;\\n\\n/**\\n * Gets the native userAgent string from navigator if it exists.\\n * If navigator or navigator.userAgent string is missing, returns an empty\\n * string.\\n * @return {string}\\n */\\nfunction getNativeUserAgentString() {\\n  const navigator = getNavigator();\\n  if (navigator) {\\n    const userAgent = navigator.userAgent;\\n    if (userAgent) {\\n      return userAgent;\\n    }\\n  }\\n  return '';\\n}\\n\\n/**\\n * Gets the native userAgentData object from navigator if it exists.\\n * If navigator.userAgentData object is missing returns null.\\n * @return {?NavigatorUAData}\\n */\\nfunction getNativeUserAgentData() {\\n  const navigator = getNavigator();\\n  // TODO(user): Use navigator?.userAgent ?? null once it's supported.\\n  if (navigator) {\\n    return navigator.userAgentData || null;\\n  }\\n  return null;\\n}\\n\\n/**\\n * Getter for the native navigator.\\n * @return {!Navigator}\\n */\\nfunction getNavigator() {\\n  return goog.global.navigator;\\n}\\n\\n/**\\n * A possible override for applications which wish to not check\\n * navigator.userAgent but use a specified value for detection instead.\\n * @type {?string}\\n */\\nlet userAgentInternal = null;\\n\\n/**\\n * A possible override for applications which wish to not check\\n * navigator.userAgentData but use a specified value for detection instead.\\n * @type {?NavigatorUAData}\\n */\\nlet userAgentDataInternal = getNativeUserAgentData();\\n\\n/**\\n * Override the user agent string with the given value.\\n * This should only be used for testing within the goog.labs.userAgent\\n * namespace.\\n * Pass `null` to use the native browser object instead.\\n * @param {?string=} userAgent The userAgent override.\\n * @return {void}\\n */\\nfunction setUserAgent(userAgent = undefined) {\\n  userAgentInternal =\\n      typeof userAgent === 'string' ? userAgent : getNativeUserAgentString();\\n}\\n\\n/** @return {string} The user agent string. */\\nfunction getUserAgent() {\\n  return userAgentInternal == null ? getNativeUserAgentString() :\\n                                     userAgentInternal;\\n}\\n\\n/**\\n * Override the user agent data object with the given value.\\n * This should only be used for testing within the goog.labs.userAgent\\n * namespace.\\n * Pass `null` to specify the absence of userAgentData. Note that this behavior\\n * is different from setUserAgent.\\n * @param {?NavigatorUAData} userAgentData The userAgentData override.\\n */\\nfunction setUserAgentData(userAgentData) {\\n  userAgentDataInternal = userAgentData;\\n}\\n\\n/**\\n * If the user agent data object was overridden using setUserAgentData,\\n * reset it so that it uses the native browser object instead, if it exists.\\n */\\nfunction resetUserAgentData() {\\n  userAgentDataInternal = getNativeUserAgentData();\\n}\\n\\n/** @return {?NavigatorUAData} Navigator.userAgentData if exist */\\nfunction getUserAgentData() {\\n  return userAgentDataInternal;\\n}\\n\\n/**\\n * Checks if any string in userAgentData.brands matches str.\\n * Returns false if userAgentData is not supported.\\n * @param {string} str\\n * @return {boolean} Whether any brand string from userAgentData contains the\\n *     given string.\\n */\\nfunction matchUserAgentDataBrand(str) {\\n  if (!useClientHints()) return false;\\n  const data = getUserAgentData();\\n  if (!data) return false;\\n  return data.brands.some(({brand}) => brand && contains(brand, str));\\n}\\n\\n/**\\n * @param {string} str\\n * @return {boolean} Whether the user agent contains the given string.\\n */\\nfunction matchUserAgent(str) {\\n  const userAgent = getUserAgent();\\n  return contains(userAgent, str);\\n}\\n\\n/**\\n * @param {string} str\\n * @return {boolean} Whether the user agent contains the given string, ignoring\\n *     case.\\n */\\nfunction matchUserAgentIgnoreCase(str) {\\n  const userAgent = getUserAgent();\\n  return caseInsensitiveContains(userAgent, str);\\n}\\n\\n/**\\n * Parses the user agent into tuples for each section.\\n * @param {string} userAgent\\n * @return {!Array<!Array<string>>} Tuples of key, version, and the contents of\\n *     the parenthetical.\\n */\\nfunction extractVersionTuples(userAgent) {\\n  // Matches each section of a user agent string.\\n  // Example UA:\\n  // Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us)\\n  // AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405\\n  // This has three version tuples: Mozilla, AppleWebKit, and Mobile.\\n\\n  const versionRegExp = new RegExp(\\n      // Key. Note that a key may have a space.\\n      // (i.e. 'Mobile Safari' in 'Mobile Safari/5.0')\\n      '([A-Z][\\\\\\\\w ]+)' +\\n\\n          '/' +                // slash\\n          '([^\\\\\\\\s]+)' +        // version (i.e. '5.0b')\\n          '\\\\\\\\s*' +             // whitespace\\n          '(?:\\\\\\\\((.*?)\\\\\\\\))?',  // parenthetical info. parentheses not matched.\\n      'g');\\n\\n  const data = [];\\n  let match;\\n\\n  // Iterate and collect the version tuples.  Each iteration will be the\\n  // next regex match.\\n  while (match = versionRegExp.exec(userAgent)) {\\n    data.push([\\n      match[1],  // key\\n      match[2],  // value\\n      // || undefined as this is not undefined in IE7 and IE8\\n      match[3] || undefined  // info\\n    ]);\\n  }\\n\\n  return data;\\n}\\n\\nexports = {\\n  ASSUME_CLIENT_HINTS_SUPPORT,\\n  extractVersionTuples,\\n  getNativeUserAgentString,\\n  getUserAgent,\\n  getUserAgentData,\\n  matchUserAgent,\\n  matchUserAgentDataBrand,\\n  matchUserAgentIgnoreCase,\\n  resetUserAgentData,\\n  setUserAgent,\\n  setUserAgentData,\\n};\\n\"],\n\"names\":[\"getNativeUserAgentString\",\"navigator\",\"getNavigator\",\"userAgent\",\"getNativeUserAgentData\",\"userAgentData\",\"goog\",\"global\",\"setUserAgent\",\"undefined\",\"userAgentInternal\",\"getUserAgent\",\"setUserAgentData\",\"userAgentDataInternal\",\"resetUserAgentData\",\"getUserAgentData\",\"matchUserAgentDataBrand\",\"str\",\"useClientHints\",\"data\",\"brands\",\"some\",\"brand\",\"contains\",\"matchUserAgent\",\"matchUserAgentIgnoreCase\",\"caseInsensitiveContains\",\"extractVersionTuples\",\"versionRegExp\",\"RegExp\",\"match\",\"exec\",\"push\",\"module\",\"declareLegacyNamespace\",\"require\",\"ASSUME_CLIENT_HINTS_SUPPORT\",\"exports\"]\n}\n"]