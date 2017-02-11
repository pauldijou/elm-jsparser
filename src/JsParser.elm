module JsParser exposing (..)

import Json.Encode
import Date exposing (Date)
import Regex exposing (Regex)
import Native.JsParser

type JsValue
  = JsNull
  | JsUndefined
  | JsString String
  | JsNumber Float
  | JsBoolean Bool
  | JsRegExp Regex
  | JsArray (List JsValue)
  | JsObject (List (String, JsValue))
  | JsDate Date
  | JsFunction Json.Encode.Value 
  | JsOther Json.Encode.Value

type JsonValue
  = JsonNull
  | JsonString String
  | JsonNumber Float
  | JsonBoolean Bool
  | JsonArray (List JsonValue)
  | JsonObject (List (String, JsonValue))

parseJs: Json.Encode.Value -> JsValue
parseJs =
  Native.JsParser.parseJs

parseJson: String -> Result String JsonValue
parseJson =
  Native.JsParser.parseJson
