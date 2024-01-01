["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/dom/asserts.js"],"~:js","goog.provide(\"goog.dom.asserts\");\ngoog.require(\"goog.asserts\");\ngoog.dom.asserts.assertIsLocation = function(o) {\n  if (goog.asserts.ENABLE_ASSERTS) {\n    var win = goog.dom.asserts.getWindow_(o);\n    if (win) {\n      if (!o || !(o instanceof win.Location) && o instanceof win.Element) {\n        goog.asserts.fail(\"Argument is not a Location (or a non-Element mock); got: %s\", goog.dom.asserts.debugStringForType_(o));\n      }\n    }\n  }\n  return o;\n};\ngoog.dom.asserts.debugStringForType_ = function(value) {\n  if (goog.isObject(value)) {\n    try {\n      return value.constructor.displayName || value.constructor.name || Object.prototype.toString.call(value);\n    } catch (e) {\n      return \"\\x3cobject could not be stringified\\x3e\";\n    }\n  } else {\n    return value === undefined ? \"undefined\" : value === null ? \"null\" : typeof value;\n  }\n};\ngoog.dom.asserts.getWindow_ = function(o) {\n  try {\n    var doc = o && o.ownerDocument;\n    var win = doc && (doc.defaultView || doc.parentWindow);\n    win = win || goog.global;\n    if (win.Element && win.Location) {\n      return win;\n    }\n  } catch (ex) {\n  }\n  return null;\n};\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\ngoog.provide('goog.dom.asserts');\n\ngoog.require('goog.asserts');\n\n/**\n * @fileoverview Custom assertions to ensure that an element has the appropriate\n * type.\n *\n * Using a goog.dom.safe wrapper on an object on the incorrect type (via an\n * incorrect static type cast) can result in security bugs: For instance,\n * g.d.s.setAnchorHref ensures that the URL assigned to the .href attribute\n * satisfies the SafeUrl contract, i.e., is safe to dereference as a hyperlink.\n * However, the value assigned to a HTMLLinkElement's .href property requires\n * the stronger TrustedResourceUrl contract, since it can refer to a stylesheet.\n * Thus, using g.d.s.setAnchorHref on an (incorrectly statically typed) object\n * of type HTMLLinkElement can result in a security vulnerability.\n * Assertions of the correct run-time type help prevent such incorrect use.\n *\n * In some cases, code using the DOM API is tested using mock objects (e.g., a\n * plain object such as {'href': url} instead of an actual Location object).\n * To allow such mocking, the assertions permit objects of types that are not\n * relevant DOM API objects at all (for instance, not Element or Location).\n *\n * Note that instanceof checks don't work straightforwardly in older versions of\n * IE, or across frames (see,\n * http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object,\n * http://stackoverflow.com/questions/26248599/instanceof-htmlelement-in-iframe-is-not-element-or-object).\n *\n * Hence, these assertions may pass vacuously in such scenarios. The resulting\n * risk of security bugs is limited by the following factors:\n *  - A bug can only arise in scenarios involving incorrect static typing (the\n *    wrapper methods are statically typed to demand objects of the appropriate,\n *    precise type).\n *  - Typically, code is tested and exercised in multiple browsers.\n */\n\n/**\n * Asserts that a given object is a Location.\n *\n * To permit this assertion to pass in the context of tests where DOM APIs might\n * be mocked, also accepts any other type except for subtypes of {!Element}.\n * This is to ensure that, for instance, HTMLLinkElement is not being used in\n * place of a Location, since this could result in security bugs due to stronger\n * contracts required for assignments to the href property of the latter.\n *\n * @param {?Object} o The object whose type to assert.\n * @return {!Location}\n */\ngoog.dom.asserts.assertIsLocation = function(o) {\n  'use strict';\n  if (goog.asserts.ENABLE_ASSERTS) {\n    var win = goog.dom.asserts.getWindow_(o);\n    if (win) {\n      if (!o || (!(o instanceof win.Location) && o instanceof win.Element)) {\n        goog.asserts.fail(\n            'Argument is not a Location (or a non-Element mock); got: %s',\n            goog.dom.asserts.debugStringForType_(o));\n      }\n    }\n  }\n  return /** @type {!Location} */ (o);\n};\n\n\n/**\n * Returns a string representation of a value's type.\n *\n * @param {*} value An object, or primitive.\n * @return {string} The best display name for the value.\n * @private\n */\ngoog.dom.asserts.debugStringForType_ = function(value) {\n  'use strict';\n  if (goog.isObject(value)) {\n    try {\n      return /** @type {string|undefined} */ (value.constructor.displayName) ||\n          value.constructor.name || Object.prototype.toString.call(value);\n    } catch (e) {\n      return '<object could not be stringified>';\n    }\n  } else {\n    return value === undefined ? 'undefined' :\n                                 value === null ? 'null' : typeof value;\n  }\n};\n\n/**\n * Gets window of element.\n * @param {?Object} o\n * @return {?Window}\n * @private\n * @suppress {strictMissingProperties} ownerDocument not defined on Object\n */\ngoog.dom.asserts.getWindow_ = function(o) {\n  'use strict';\n  try {\n    var doc = o && o.ownerDocument;\n    // This can throw “Blocked a frame with origin \"chrome-extension://...\" from\n    // accessing a cross-origin frame” in Chrome extension.\n    var win =\n        doc && /** @type {?Window} */ (doc.defaultView || doc.parentWindow);\n    win = win || /** @type {!Window} */ (goog.global);\n    // This can throw “Permission denied to access property \"Element\" on\n    // cross-origin object”.\n    if (win.Element && win.Location) {\n      return win;\n    }\n  } catch (ex) {\n  }\n  return null;\n};\n","~:compiled-at",1704111218244,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.dom.asserts.js\",\n\"lineCount\":37,\n\"mappings\":\"AAMAA,IAAKC,CAAAA,OAAL,CAAa,kBAAb,CAAA;AAEAD,IAAKE,CAAAA,OAAL,CAAa,cAAb,CAAA;AA8CAF,IAAKG,CAAAA,GAAIC,CAAAA,OAAQC,CAAAA,gBAAjB,GAAoCC,QAAQ,CAACC,CAAD,CAAI;AAE9C,MAAIP,IAAKI,CAAAA,OAAQI,CAAAA,cAAjB,CAAiC;AAC/B,QAAIC,MAAMT,IAAKG,CAAAA,GAAIC,CAAAA,OAAQM,CAAAA,UAAjB,CAA4BH,CAA5B,CAAV;AACA,QAAIE,GAAJ;AACE,UAAI,CAACF,CAAL,IAAW,EAAEA,CAAF,YAAeE,GAAIE,CAAAA,QAAnB,CAAX,IAA2CJ,CAA3C,YAAwDE,GAAIG,CAAAA,OAA5D;AACEZ,YAAKI,CAAAA,OAAQS,CAAAA,IAAb,CACI,6DADJ,EAEIb,IAAKG,CAAAA,GAAIC,CAAAA,OAAQU,CAAAA,mBAAjB,CAAqCP,CAArC,CAFJ,CAAA;AADF;AADF;AAF+B;AAUjC,SAAiCA,CAAjC;AAZ8C,CAAhD;AAuBAP,IAAKG,CAAAA,GAAIC,CAAAA,OAAQU,CAAAA,mBAAjB,GAAuCC,QAAQ,CAACC,KAAD,CAAQ;AAErD,MAAIhB,IAAKiB,CAAAA,QAAL,CAAcD,KAAd,CAAJ;AACE,OAAI;AACF,aAAwCA,KAAME,CAAAA,WAAYC,CAAAA,WAA1D,IACIH,KAAME,CAAAA,WAAYE,CAAAA,IADtB,IAC8BC,MAAOC,CAAAA,SAAUC,CAAAA,QAASC,CAAAA,IAA1B,CAA+BR,KAA/B,CAD9B;AADE,KAGF,QAAOS,CAAP,CAAU;AACV,aAAO,yCAAP;AADU;AAJd;AAQE,WAAOT,KAAA,KAAUU,SAAV,GAAsB,WAAtB,GACsBV,KAAA,KAAU,IAAV,GAAiB,MAAjB,GAA0B,MAAOA,MAD9D;AARF;AAFqD,CAAvD;AAsBAhB,IAAKG,CAAAA,GAAIC,CAAAA,OAAQM,CAAAA,UAAjB,GAA8BiB,QAAQ,CAACpB,CAAD,CAAI;AAExC,KAAI;AACF,QAAIqB,MAAMrB,CAANqB,IAAWrB,CAAEsB,CAAAA,aAAjB;AAGA,QAAIpB,MACAmB,GADAnB,KAC+BmB,GAAIE,CAAAA,WAAL,IAAoBF,GAAIG,CAAAA,YADtDtB,CAAJ;AAEAA,OAAA,GAAMA,GAAN,IAAqCT,IAAKgC,CAAAA,MAA1C;AAGA,QAAIvB,GAAIG,CAAAA,OAAR,IAAmBH,GAAIE,CAAAA,QAAvB;AACE,aAAOF,GAAP;AADF;AATE,GAYF,QAAOwB,EAAP,CAAW;;AAEb,SAAO,IAAP;AAhBwC,CAA1C;;\",\n\"sources\":[\"goog/dom/asserts.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\ngoog.provide('goog.dom.asserts');\\n\\ngoog.require('goog.asserts');\\n\\n/**\\n * @fileoverview Custom assertions to ensure that an element has the appropriate\\n * type.\\n *\\n * Using a goog.dom.safe wrapper on an object on the incorrect type (via an\\n * incorrect static type cast) can result in security bugs: For instance,\\n * g.d.s.setAnchorHref ensures that the URL assigned to the .href attribute\\n * satisfies the SafeUrl contract, i.e., is safe to dereference as a hyperlink.\\n * However, the value assigned to a HTMLLinkElement's .href property requires\\n * the stronger TrustedResourceUrl contract, since it can refer to a stylesheet.\\n * Thus, using g.d.s.setAnchorHref on an (incorrectly statically typed) object\\n * of type HTMLLinkElement can result in a security vulnerability.\\n * Assertions of the correct run-time type help prevent such incorrect use.\\n *\\n * In some cases, code using the DOM API is tested using mock objects (e.g., a\\n * plain object such as {'href': url} instead of an actual Location object).\\n * To allow such mocking, the assertions permit objects of types that are not\\n * relevant DOM API objects at all (for instance, not Element or Location).\\n *\\n * Note that instanceof checks don't work straightforwardly in older versions of\\n * IE, or across frames (see,\\n * http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object,\\n * http://stackoverflow.com/questions/26248599/instanceof-htmlelement-in-iframe-is-not-element-or-object).\\n *\\n * Hence, these assertions may pass vacuously in such scenarios. The resulting\\n * risk of security bugs is limited by the following factors:\\n *  - A bug can only arise in scenarios involving incorrect static typing (the\\n *    wrapper methods are statically typed to demand objects of the appropriate,\\n *    precise type).\\n *  - Typically, code is tested and exercised in multiple browsers.\\n */\\n\\n/**\\n * Asserts that a given object is a Location.\\n *\\n * To permit this assertion to pass in the context of tests where DOM APIs might\\n * be mocked, also accepts any other type except for subtypes of {!Element}.\\n * This is to ensure that, for instance, HTMLLinkElement is not being used in\\n * place of a Location, since this could result in security bugs due to stronger\\n * contracts required for assignments to the href property of the latter.\\n *\\n * @param {?Object} o The object whose type to assert.\\n * @return {!Location}\\n */\\ngoog.dom.asserts.assertIsLocation = function(o) {\\n  'use strict';\\n  if (goog.asserts.ENABLE_ASSERTS) {\\n    var win = goog.dom.asserts.getWindow_(o);\\n    if (win) {\\n      if (!o || (!(o instanceof win.Location) && o instanceof win.Element)) {\\n        goog.asserts.fail(\\n            'Argument is not a Location (or a non-Element mock); got: %s',\\n            goog.dom.asserts.debugStringForType_(o));\\n      }\\n    }\\n  }\\n  return /** @type {!Location} */ (o);\\n};\\n\\n\\n/**\\n * Returns a string representation of a value's type.\\n *\\n * @param {*} value An object, or primitive.\\n * @return {string} The best display name for the value.\\n * @private\\n */\\ngoog.dom.asserts.debugStringForType_ = function(value) {\\n  'use strict';\\n  if (goog.isObject(value)) {\\n    try {\\n      return /** @type {string|undefined} */ (value.constructor.displayName) ||\\n          value.constructor.name || Object.prototype.toString.call(value);\\n    } catch (e) {\\n      return '<object could not be stringified>';\\n    }\\n  } else {\\n    return value === undefined ? 'undefined' :\\n                                 value === null ? 'null' : typeof value;\\n  }\\n};\\n\\n/**\\n * Gets window of element.\\n * @param {?Object} o\\n * @return {?Window}\\n * @private\\n * @suppress {strictMissingProperties} ownerDocument not defined on Object\\n */\\ngoog.dom.asserts.getWindow_ = function(o) {\\n  'use strict';\\n  try {\\n    var doc = o && o.ownerDocument;\\n    // This can throw \\u201cBlocked a frame with origin \\\"chrome-extension://...\\\" from\\n    // accessing a cross-origin frame\\u201d in Chrome extension.\\n    var win =\\n        doc && /** @type {?Window} */ (doc.defaultView || doc.parentWindow);\\n    win = win || /** @type {!Window} */ (goog.global);\\n    // This can throw \\u201cPermission denied to access property \\\"Element\\\" on\\n    // cross-origin object\\u201d.\\n    if (win.Element && win.Location) {\\n      return win;\\n    }\\n  } catch (ex) {\\n  }\\n  return null;\\n};\\n\"],\n\"names\":[\"goog\",\"provide\",\"require\",\"dom\",\"asserts\",\"assertIsLocation\",\"goog.dom.asserts.assertIsLocation\",\"o\",\"ENABLE_ASSERTS\",\"win\",\"getWindow_\",\"Location\",\"Element\",\"fail\",\"debugStringForType_\",\"goog.dom.asserts.debugStringForType_\",\"value\",\"isObject\",\"constructor\",\"displayName\",\"name\",\"Object\",\"prototype\",\"toString\",\"call\",\"e\",\"undefined\",\"goog.dom.asserts.getWindow_\",\"doc\",\"ownerDocument\",\"defaultView\",\"parentWindow\",\"global\",\"ex\"]\n}\n"]