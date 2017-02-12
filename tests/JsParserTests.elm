port module JsParserTests exposing (..)

import Task
import Dict
import Date
import Regex
import Ordeal exposing (..)
import JsParser exposing (..)
import Native.JsParserTests

main: OrdealProgram
main = run emit jsParser

port emit : Event -> Cmd msg

jsParser: Test
jsParser =
  describe "JsParser" [ jsParserJs, jsParserJson ]

jsParserJs: Test
jsParserJs =
  describe "JavaScript"
    [ test "Null" (
      parseJs Native.JsParserTests.js_null |> shouldEqual JsNull
    )
    , test "Undefined" (
      parseJs Native.JsParserTests.js_undefined |> shouldEqual JsUndefined
    )
    , test "Number" (
      parseJs Native.JsParserTests.js_number |> shouldEqual (JsNumber 42)
    )
    , test "String" (
      parseJs Native.JsParserTests.js_string |> shouldEqual (JsString "a")
    )
    , test "Boolean True" (
      parseJs Native.JsParserTests.js_booleanTrue |> shouldEqual (JsBoolean True)
    )
    , test "Boolean False" (
      parseJs Native.JsParserTests.js_booleanFalse |> shouldEqual (JsBoolean False)
    )
    , test "Array" (
      parseJs Native.JsParserTests.js_array |> shouldEqual (JsArray [ JsNumber 1, JsString "b", JsBoolean True ])
    )
    , test "Object" (
      let
        object = JsObject <| Dict.fromList [ ("num", JsNumber 2), ("str", JsString "c"), ("bool", JsBoolean False) ]
      in
        parseJs Native.JsParserTests.js_object |> shouldEqual object
    )
    , test "Date" (
      parseJs Native.JsParserTests.js_date |> shouldEqual (JsDate <| Date.fromTime 0)
    )
    , test "RegExp" (
      parseJs Native.JsParserTests.js_regexp |> shouldEqual (JsRegExp <| Regex.regex "[0-9]+")
    )
    , test "Function" (
      case parseJs Native.JsParserTests.js_func of
        JsFunction _ -> success
        value -> failure ("Expected a JsFunction, got: " ++ (toString value))
    )
    ]

jsParserJson: Test
jsParserJson =
  describe "JSON"
    [ test "Invalid JSON" (
      case parseJson "a" of
        Ok _ -> failure "Invalid JSON should produce an Err"
        Err _ -> success
    )
    , test "Null" (
      parseJson Native.JsParserTests.json_null |> shouldEqual (Ok JsonNull)
    )
    , test "Number" (
      parseJson Native.JsParserTests.json_number |> shouldEqual (Ok <| JsonNumber 42)
    )
    , test "String" (
      parseJson Native.JsParserTests.json_string |> shouldEqual (Ok <| JsonString "a")
    )
    , test "Boolean True" (
      parseJson Native.JsParserTests.json_booleanTrue |> shouldEqual (Ok <| JsonBoolean True)
    )
    , test "Boolean False" (
      parseJson Native.JsParserTests.json_booleanFalse |> shouldEqual (Ok <| JsonBoolean False)
    )
    , test "Array" (
      parseJson Native.JsParserTests.json_array |> shouldEqual (Ok <| JsonArray [ JsonNumber 1, JsonString "b", JsonBoolean True ])
    )
    , test "Object" (
      let
        object = Ok <| JsonObject <| Dict.fromList [ ("num", JsonNumber 2), ("str", JsonString "c"), ("bool", JsonBoolean False) ]
      in
        parseJson Native.JsParserTests.json_object |> shouldEqual object
    )
    ]
