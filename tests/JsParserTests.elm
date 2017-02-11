module JsParserTests exposing (..)

import Task
import Ordeal exposing (..)
import JsParser exposing (parseJs, parseJson)

main: OrdealProgram
main = run emit jsParser

port emit : Event -> Cmd msg

jsParser: Test
jsParser =
  describe "JsParser" [ jsParserJs, jsParserJson ]

jsParserJs: Test
jsParserJs =
  describe "JavaScript"
    []

jsParserJson: Test
jsParserJson =
  describe "JSON"
    []
