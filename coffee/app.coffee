

#csv = require("csv")

class CSVReader
  constructor: (@csv_resource) ->
    @data = ( col.split(",") for col in (row for row in @csv_resource.split("\n")) )

  rows_size: ->
    @data.length

  get_row: (index) ->
    @data[index]

  get: (row_index, col_index) ->
    @get_row(row_index)[col_index]


class MetadataReader extends CSVReader
  constructor: (@csv_resource) ->
    super(@csv_resource)
    @mapping = {}
    @mapping[row[1]] = row[0] for row in @data

  convert: (prefix) ->
    @mapping[prefix]
    
class ListReader extends CSVReader
  constructor: (@csv_resource) ->
    super(@csv_resource)
    @list = _.compact(_.flatten(@data))  
    console.log @list

  random_get: ->
    @list[_.random(0, @list.length - 1)]


list_csv = "data/COSCUP2013 All badge code - list.csv"
metadata_csv = "data/COSCUP2013 All badge code - MetaData.csv"

$.get(list_csv).done (list_csv_data) ->
  window.list_csv = new ListReader(list_csv_data)
$.get(metadata_csv).done (metadata_csv_data) ->
  window.metadata_csv = new MetadataReader(metadata_csv_data)
    
$ ->
  $('.lottery-panel').hide()
  $('#lottery').click ->
    people = window.list_csv.random_get()
    meta = window.metadata_csv.convert(people[0])
    item = $("<div class=\"lottery-panel\"><h2>#{meta}</h2><h1>#{people}</h1></div>")
    $(@).after(item)
    item.slideDown()





