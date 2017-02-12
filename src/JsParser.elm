module JsParser exposing (..)

{-| Parse JavaScript or JSON value so you can pattern match them inside Elm

# Type and Constructors
@docs JsValue, JsonValue

# Parsing
@docs parseJs, parseJson
-}

import Json.Encode
import Date exposing (Date)
import Regex exposing (Regex)
import Dict exposing (Dict)
import Native.JsParser

{-|-}
type alias Error =
  { message: String
  , name: Maybe String
  , lineNumber: Maybe Int
  , columnNumber: Maybe Int
  , fileName: Maybe String
  , stack: Maybe String
  }

{-|-}
type JsValue
  = JsNull
  | JsUndefined
  | JsNaN
  | JsString String
  | JsNumber Float
  | JsBoolean Bool
  | JsRegExp Regex
  | JsArray (List JsValue)
  | JsObject (Dict String JsValue)
  | JsDate Date
  | JsFunction Json.Encode.Value
  | JsError Error
  | JsMap (Dict String JsValue)
  | JsSet (List JsValue)
  | JsSymbol Json.Encode.Value
  | JsOther Json.Encode.Value

{-|-}
type JsonValue
  = JsonNull
  | JsonString String
  | JsonNumber Float
  | JsonBoolean Bool
  | JsonArray (List JsonValue)
  | JsonObject (Dict String JsonValue)

{-|-}
parseJs: Json.Encode.Value -> JsValue
parseJs =
  Native.JsParser.parseJs

{-|-}
parseJson: String -> Result String JsonValue
parseJson =
  Native.JsParser.parseJson
