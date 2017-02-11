var _pauldijou$elm_javascript_adt$Native_JsParser = function () {
  var Ok = _elm_lang$core$Result$Ok
  var Err = _elm_lang$core$Result$Err
  var arrayToList = _elm_lang$core$Native_List.fromArray
  var Tuple2 = _elm_lang$core$Native_Utils.Tuple2

  var toString = Object.prototype.toString
  var nullType = '[object Null]'
  var undefinedType = '[object Undefined]'
  var argumentsType = '[object Arguments]'
  var arrayType = '[object Array]'
  var booleanType = '[object Boolean]'
  var dateType = '[object Date]'
  var errorType = '[object Error]'
  var functionType = '[object Function]'
  var generatorType = '[object GeneratorFunction]'
  var mapType = '[object Map]'
  var numberType = '[object Number]'
  var objectType = '[object Object]'
  var promiseType = '[object Promise]'
  var regexpType = '[object RegExp]'
  var setType = '[object Set]'
  var stringType = '[object String]'
  var symbolType = '[object Symbol]'
  var weakMapType = '[object WeakMap]'
  var weakSetType = '[object WeakSet]'

  function getType(value) {
    return toString.call(value)
  }

  function ctor(name, value) {
    if (value === undefined) {
      return { ctor: name }
    }
    return { ctor: name, _0: value }
  }

  function parseArray(value, fn) {
    return arrayToList(value.map(fn))
  }

  function parseObject(value, fn) {
    return arrayToList(Object.keys(value).reduce(function (fields, key) {
      fields.push(Tuple2(key, fn(value[key])))
      return fields
    }, []))
  }

  function parseJs(value) {
    switch (getType(value)) {
      case nullType: return ctor('JsNull')
      case undefinedType: return ctor('JsUndefined')
      case stringType: return ctor('JsString', value)
      case numberType: return ctor('JsNumber', value)
      case booleanType: return ctor('JsBoolean', value)
      case arrayType: return ctor('JsArray', parseArray(value, parseJs))
      case objectType: return ctor('JsObject', parseObject(value, parseJs))
      case dateType: return ctor('JsDate', value)
      case functionType: return ctor('JsFunction', value)
      case regexpType: return ctor('JsRegExp', value)
      default: return ctor('JsOther', value)
    }
  }

  function parseJsonImpl(value) {
    switch (getType(value)) {
      case nullType: return ctor('JsonNull')
      case stringType: return ctor('JsonString', value)
      case numberType: return ctor('JsonNumber', value)
      case booleanType: return ctor('JsonBoolean', value)
      case arrayType: return ctor('JsonArray', parseArray(value, parseJsonImpl))
      case objectType: return ctor('JsonObject', parseObject(value, parseJsonImpl))
      default: return ctor('JsonObject', parseObject(value, parseJsonImpl))
    }
  }

  function parseJson(value) {
    try {
      return Ok(parseJsonImpl(JSON.parse(value)))
    } catch (e) {
      return Err('Invalid JSON string: ' + e)
    }
  }

  return {
    parseJs: parseJs,
    parseJson: parseJson
  }
}();
