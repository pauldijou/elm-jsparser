var _pauldijou$elm_jsparser$Native_JsParser = function () {
  var Ok = _elm_lang$core$Result$Ok
  var Err = _elm_lang$core$Result$Err
  var arrayToList = _elm_lang$core$Native_List.fromArray
  var dictEmpty = _elm_lang$core$Dict$empty
  var dictInsert = _elm_lang$core$Dict$insert

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

  function parseArray(value, fn) {
    return arrayToList(value.map(fn))
  }

  function parseObject(value, fn) {
    return Object.keys(value).reduce(function (fields, key) {
      return A3(dictInsert, key, fn(value[key]), fields)
    }, dictEmpty)
  }

  function parseJs(value) {
    switch (getType(value)) {
      case nullType: return _pauldijou$elm_jsparser$JsParser$JsNull
      case undefinedType: return _pauldijou$elm_jsparser$JsParser$JsUndefined
      case stringType: return _pauldijou$elm_jsparser$JsParser$JsString(value)
      case numberType: return _pauldijou$elm_jsparser$JsParser$JsNumber(value)
      case booleanType: return _pauldijou$elm_jsparser$JsParser$JsBoolean(value)
      case arrayType: return _pauldijou$elm_jsparser$JsParser$JsArray(parseArray(value, parseJs))
      case objectType: return _pauldijou$elm_jsparser$JsParser$JsObject(parseObject(value, parseJs))
      case dateType: return _pauldijou$elm_jsparser$JsParser$JsDate(value)
      case functionType: return _pauldijou$elm_jsparser$JsParser$JsFunction(value)
      case regexpType: return _pauldijou$elm_jsparser$JsParser$JsRegExp(value)
      default: return _pauldijou$elm_jsparser$JsParser$JsOther(value)
    }
  }

  function parseJsonImpl(value) {
    switch (getType(value)) {
      case nullType: return _pauldijou$elm_jsparser$JsParser$JsonNull
      case stringType: return _pauldijou$elm_jsparser$JsParser$JsonString(value)
      case numberType: return _pauldijou$elm_jsparser$JsParser$JsonNumber(value)
      case booleanType: return _pauldijou$elm_jsparser$JsParser$JsonBoolean(value)
      case arrayType: return _pauldijou$elm_jsparser$JsParser$JsonArray(parseArray(value, parseJsonImpl))
      case objectType: return _pauldijou$elm_jsparser$JsParser$JsonObject(parseObject(value, parseJsonImpl))
      default: return _pauldijou$elm_jsparser$JsParser$JsonObject(parseObject(value, parseJsonImpl))
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
