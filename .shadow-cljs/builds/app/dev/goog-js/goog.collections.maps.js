["^ ","~:resource-id",["~:shadow.build.classpath/resource","goog/collections/maps.js"],"~:js","goog.loadModule(function(exports) {\n  function setAll(map, entries) {\n    if (!entries) {\n      return;\n    }\n    for (const [k, v] of entries) {\n      map.set(k, v);\n    }\n  }\n  function hasValue(map, val, valueEqualityFn = defaultEqualityFn) {\n    for (const v of map.values()) {\n      if (valueEqualityFn(v, val)) {\n        return true;\n      }\n    }\n    return false;\n  }\n  function equals(map, otherMap, valueEqualityFn = defaultEqualityFn) {\n    if (map === otherMap) {\n      return true;\n    }\n    if (map.size !== otherMap.size) {\n      return false;\n    }\n    for (const key of map.keys()) {\n      if (!otherMap.has(key)) {\n        return false;\n      }\n      if (!valueEqualityFn(map.get(key), otherMap.get(key))) {\n        return false;\n      }\n    }\n    return true;\n  }\n  function transpose(map) {\n    const transposed = new Map();\n    for (const key of map.keys()) {\n      const val = map.get(key);\n      transposed.set(val, key);\n    }\n    return transposed;\n  }\n  function toObject(map) {\n    const obj = {};\n    for (const key of map.keys()) {\n      obj[key] = map.get(key);\n    }\n    return obj;\n  }\n  \"use strict\";\n  goog.module(\"goog.collections.maps\");\n  goog.module.declareLegacyNamespace();\n  class MapLike {\n    constructor() {\n      this.size;\n    }\n    set(key, val) {\n    }\n    get(key) {\n    }\n    keys() {\n    }\n    values() {\n    }\n    has(key) {\n    }\n  }\n  exports.MapLike = MapLike;\n  exports.setAll = setAll;\n  exports.hasValue = hasValue;\n  const defaultEqualityFn = (a, b) => {\n    return a === b;\n  };\n  exports.equals = equals;\n  exports.transpose = transpose;\n  exports.toObject = toObject;\n  return exports;\n});\n","~:source","/**\n * @license\n * Copyright The Closure Library Authors.\n * SPDX-License-Identifier: Apache-2.0\n */\n\n/**\n * @fileoverview Helper methods that operate on Map-like objects (e.g. ES6\n * Maps).\n */\n\ngoog.module('goog.collections.maps');\ngoog.module.declareLegacyNamespace();\n\n/**\n * A MapLike implements the same public interface as an ES6 Map, without tying\n * the underlying code directly to the implementation. Any additions to this\n * type should also be present on ES6 Maps.\n * @template K,V\n * @record\n */\nclass MapLike {\n  constructor() {\n    /** @const {number} The number of items in this map. */\n    this.size;\n  }\n\n  /**\n   * @param {K} key The key to set in the map.\n   * @param {V} val The value to set for the given key in the map.\n   */\n  set(key, val) {};\n\n  /**\n   * @param {K} key The key to retrieve from the map.\n   * @return {V|undefined} The value for this key, or undefined if the key is\n   *     not present in the map.\n   */\n  get(key) {};\n\n  /**\n   * @return {!IteratorIterable<K>} An ES6 Iterator that iterates over the keys\n   *     in the map.\n   */\n  keys() {};\n\n  /**\n   * @return {!IteratorIterable<V>} An ES6 Iterator that iterates over the\n   *     values in the map.\n   */\n  values() {};\n\n  /**\n   * @param {K} key The key to check.\n   * @return {boolean} True iff this key is present in the map.\n   */\n  has(key) {};\n}\nexports.MapLike = MapLike;\n\n/**\n * Iterates over each entry in the given entries and sets the entry in\n * the map, overwriting any existing entries for the key.\n * @param {!MapLike<K,V>} map The map to set entries on.\n * @param {?Iterable<!Array<K|V>>} entries The iterable of entries. This\n *     iterable should really be of type Iterable<Array<[K,V]>>, but the tuple\n *     type is not representable in the Closure Type System.\n * @template K,V\n */\nfunction setAll(map, entries) {\n  if (!entries) return;\n  for (const [k, v] of entries) {\n    map.set(k, v);\n  }\n}\nexports.setAll = setAll;\n\n/**\n * Determines if a given map contains the given value, optionally using\n * a custom comparison function.\n * @param {!MapLike<?,V1>} map The map whose values to check.\n * @param {V2} val The value to check for.\n * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function\n *     used to determine if the given value is equivalent to any of the values\n *     in the map. If no function is provided, defaults to strict equality\n *     (===).\n * @return {boolean} True iff the given map contains the given value according\n *     to the comparison function.\n * @template V1,V2\n */\nfunction hasValue(map, val, valueEqualityFn = defaultEqualityFn) {\n  for (const v of map.values()) {\n    if (valueEqualityFn(v, val)) return true;\n  }\n  return false;\n}\nexports.hasValue = hasValue;\n\n/** @const {function(?,?): boolean} */\nconst defaultEqualityFn = (a, b) => a === b;\n\n/**\n * Compares two maps using their public APIs to determine if they have\n * equal contents, optionally using a custom comparison function when comaring\n * values.\n * @param {!MapLike<K,V1>} map The first map\n * @param {!MapLike<K,V2>} otherMap The other map\n * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function\n *     used to determine if the values obtained from each map are equivalent. If\n *     no function is provided, defaults to strict equality (===).\n * @return {boolean}\n * @template K,V1,V2\n */\nfunction equals(map, otherMap, valueEqualityFn = defaultEqualityFn) {\n  if (map === otherMap) return true;\n  if (map.size !== otherMap.size) return false;\n  for (const key of map.keys()) {\n    if (!otherMap.has(key)) return false;\n    if (!valueEqualityFn(map.get(key), otherMap.get(key))) return false;\n  }\n  return true;\n}\nexports.equals = equals;\n\n/**\n * Returns a new ES6 Map in which all the keys and values from the\n * given map are interchanged (keys become values and values become keys). If\n * multiple keys in the given map to the same value, the resulting value in the\n * transposed map is implementation-dependent.\n *\n * It acts very similarly to {goog.object.transpose(Object)}.\n * @param {!MapLike<K,V>} map The map to transpose.\n * @return {!Map<V,K>} A transposed version of the given map.\n * @template K,V\n */\nfunction transpose(map) {\n  const /** !Map<V,K> */ transposed = new Map();\n  for (const key of map.keys()) {\n    const val = map.get(key);\n    transposed.set(val, key);\n  }\n  return transposed;\n}\nexports.transpose = transpose;\n\n/**\n * ToObject returns a new object whose properties are the keys from the Map.\n * @param {!MapLike<K,V>} map The map to convert into an object.\n * @return {!Object<K,V>} An object representation of the Map.\n * @template K,V\n */\nfunction toObject(map) {\n  const /** !Object<K,V> */ obj = {};\n  for (const key of map.keys()) {\n    obj[key] = map.get(key);\n  }\n  return obj;\n}\nexports.toObject = toObject;\n","~:compiled-at",1704111218367,"~:source-map-json","{\n\"version\":3,\n\"file\":\"goog.collections.maps.js\",\n\"lineCount\":79,\n\"mappings\":\"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\",\n\"sources\":[\"goog/collections/maps.js\"],\n\"sourcesContent\":[\"/**\\n * @license\\n * Copyright The Closure Library Authors.\\n * SPDX-License-Identifier: Apache-2.0\\n */\\n\\n/**\\n * @fileoverview Helper methods that operate on Map-like objects (e.g. ES6\\n * Maps).\\n */\\n\\ngoog.module('goog.collections.maps');\\ngoog.module.declareLegacyNamespace();\\n\\n/**\\n * A MapLike implements the same public interface as an ES6 Map, without tying\\n * the underlying code directly to the implementation. Any additions to this\\n * type should also be present on ES6 Maps.\\n * @template K,V\\n * @record\\n */\\nclass MapLike {\\n  constructor() {\\n    /** @const {number} The number of items in this map. */\\n    this.size;\\n  }\\n\\n  /**\\n   * @param {K} key The key to set in the map.\\n   * @param {V} val The value to set for the given key in the map.\\n   */\\n  set(key, val) {};\\n\\n  /**\\n   * @param {K} key The key to retrieve from the map.\\n   * @return {V|undefined} The value for this key, or undefined if the key is\\n   *     not present in the map.\\n   */\\n  get(key) {};\\n\\n  /**\\n   * @return {!IteratorIterable<K>} An ES6 Iterator that iterates over the keys\\n   *     in the map.\\n   */\\n  keys() {};\\n\\n  /**\\n   * @return {!IteratorIterable<V>} An ES6 Iterator that iterates over the\\n   *     values in the map.\\n   */\\n  values() {};\\n\\n  /**\\n   * @param {K} key The key to check.\\n   * @return {boolean} True iff this key is present in the map.\\n   */\\n  has(key) {};\\n}\\nexports.MapLike = MapLike;\\n\\n/**\\n * Iterates over each entry in the given entries and sets the entry in\\n * the map, overwriting any existing entries for the key.\\n * @param {!MapLike<K,V>} map The map to set entries on.\\n * @param {?Iterable<!Array<K|V>>} entries The iterable of entries. This\\n *     iterable should really be of type Iterable<Array<[K,V]>>, but the tuple\\n *     type is not representable in the Closure Type System.\\n * @template K,V\\n */\\nfunction setAll(map, entries) {\\n  if (!entries) return;\\n  for (const [k, v] of entries) {\\n    map.set(k, v);\\n  }\\n}\\nexports.setAll = setAll;\\n\\n/**\\n * Determines if a given map contains the given value, optionally using\\n * a custom comparison function.\\n * @param {!MapLike<?,V1>} map The map whose values to check.\\n * @param {V2} val The value to check for.\\n * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function\\n *     used to determine if the given value is equivalent to any of the values\\n *     in the map. If no function is provided, defaults to strict equality\\n *     (===).\\n * @return {boolean} True iff the given map contains the given value according\\n *     to the comparison function.\\n * @template V1,V2\\n */\\nfunction hasValue(map, val, valueEqualityFn = defaultEqualityFn) {\\n  for (const v of map.values()) {\\n    if (valueEqualityFn(v, val)) return true;\\n  }\\n  return false;\\n}\\nexports.hasValue = hasValue;\\n\\n/** @const {function(?,?): boolean} */\\nconst defaultEqualityFn = (a, b) => a === b;\\n\\n/**\\n * Compares two maps using their public APIs to determine if they have\\n * equal contents, optionally using a custom comparison function when comaring\\n * values.\\n * @param {!MapLike<K,V1>} map The first map\\n * @param {!MapLike<K,V2>} otherMap The other map\\n * @param {(function(V1,V2): boolean)=} valueEqualityFn The comparison function\\n *     used to determine if the values obtained from each map are equivalent. If\\n *     no function is provided, defaults to strict equality (===).\\n * @return {boolean}\\n * @template K,V1,V2\\n */\\nfunction equals(map, otherMap, valueEqualityFn = defaultEqualityFn) {\\n  if (map === otherMap) return true;\\n  if (map.size !== otherMap.size) return false;\\n  for (const key of map.keys()) {\\n    if (!otherMap.has(key)) return false;\\n    if (!valueEqualityFn(map.get(key), otherMap.get(key))) return false;\\n  }\\n  return true;\\n}\\nexports.equals = equals;\\n\\n/**\\n * Returns a new ES6 Map in which all the keys and values from the\\n * given map are interchanged (keys become values and values become keys). If\\n * multiple keys in the given map to the same value, the resulting value in the\\n * transposed map is implementation-dependent.\\n *\\n * It acts very similarly to {goog.object.transpose(Object)}.\\n * @param {!MapLike<K,V>} map The map to transpose.\\n * @return {!Map<V,K>} A transposed version of the given map.\\n * @template K,V\\n */\\nfunction transpose(map) {\\n  const /** !Map<V,K> */ transposed = new Map();\\n  for (const key of map.keys()) {\\n    const val = map.get(key);\\n    transposed.set(val, key);\\n  }\\n  return transposed;\\n}\\nexports.transpose = transpose;\\n\\n/**\\n * ToObject returns a new object whose properties are the keys from the Map.\\n * @param {!MapLike<K,V>} map The map to convert into an object.\\n * @return {!Object<K,V>} An object representation of the Map.\\n * @template K,V\\n */\\nfunction toObject(map) {\\n  const /** !Object<K,V> */ obj = {};\\n  for (const key of map.keys()) {\\n    obj[key] = map.get(key);\\n  }\\n  return obj;\\n}\\nexports.toObject = toObject;\\n\"],\n\"names\":[\"setAll\",\"map\",\"entries\",\"k\",\"v\",\"set\",\"hasValue\",\"val\",\"valueEqualityFn\",\"defaultEqualityFn\",\"values\",\"equals\",\"otherMap\",\"size\",\"key\",\"keys\",\"has\",\"get\",\"transpose\",\"transposed\",\"Map\",\"toObject\",\"obj\",\"goog\",\"module\",\"declareLegacyNamespace\",\"MapLike\",\"constructor\",\"exports\",\"a\",\"b\"]\n}\n"]