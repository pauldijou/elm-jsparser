var _pauldijou$elm_jsparser$Native_JsParserTests = function () {

  var values = {
    null: null,
    undefined: undefined,
    number: 42,
    string: 'a',
    booleanTrue: true,
    booleanFalse: false,
    array: [ 1, "b", true ],
    object: { num: 2, str: "c", bool: false },
    date: new Date(0),
    regexp: /[0-9]+/g,
    func: function whatever() {}
  }

  var result = {}

  Object.keys(values).forEach(function (key) {
    result['js_' + key] = values[key]
    result['json_' + key] = JSON.stringify(values[key])
  })

  return result
}();
