var CSVReader, ListReader, MetadataReader, list_csv, metadata_csv,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CSVReader = (function() {
  function CSVReader(csv_resource) {
    var col, row;

    this.csv_resource = csv_resource;
    this.data = (function() {
      var _i, _len, _ref, _results;

      _ref = (function() {
        var _j, _len, _ref, _results1;

        _ref = this.csv_resource.split("\n");
        _results1 = [];
        for (_j = 0, _len = _ref.length; _j < _len; _j++) {
          row = _ref[_j];
          _results1.push(row);
        }
        return _results1;
      }).call(this);
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        col = _ref[_i];
        _results.push(col.split(","));
      }
      return _results;
    }).call(this);
  }

  CSVReader.prototype.rows_size = function() {
    return this.data.length;
  };

  CSVReader.prototype.get_row = function(index) {
    return this.data[index];
  };

  CSVReader.prototype.get = function(row_index, col_index) {
    return this.get_row(row_index)[col_index];
  };

  return CSVReader;

})();

MetadataReader = (function(_super) {
  __extends(MetadataReader, _super);

  function MetadataReader(csv_resource) {
    var row, _i, _len, _ref;

    this.csv_resource = csv_resource;
    MetadataReader.__super__.constructor.call(this, this.csv_resource);
    this.mapping = {};
    _ref = this.data;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      row = _ref[_i];
      this.mapping[row[1]] = row[0];
    }
  }

  MetadataReader.prototype.convert = function(prefix) {
    return this.mapping[prefix];
  };

  return MetadataReader;

})(CSVReader);

ListReader = (function(_super) {
  __extends(ListReader, _super);

  function ListReader(csv_resource) {
    this.csv_resource = csv_resource;
    ListReader.__super__.constructor.call(this, this.csv_resource);
    this.list = _.compact(_.flatten(this.data));
    console.log(this.list);
  }

  ListReader.prototype.random_get = function() {
    return this.list[_.random(0, this.list.length - 1)];
  };

  return ListReader;

})(CSVReader);

list_csv = "data/COSCUP2013 All badge code - list.csv";

metadata_csv = "data/COSCUP2013 All badge code - MetaData.csv";

$.get(list_csv).done(function(list_csv_data) {
  window.list_csv = new ListReader(list_csv_data);
  return $.get(metadata_csv).done(function(metadata_csv_data) {
    return window.metadata_csv = new MetadataReader(metadata_csv_data);
  });
});

$(function() {
  $('.lottery-panel').hide();
  return $('#lottery').click(function() {
    var item, meta, people;

    people = window.list_csv.random_get();
    meta = window.metadata_csv.convert(people[0]);
    item = $("<div class=\"lottery-panel\"><h2>" + meta + "</h2><h1>" + people + "</h1></div>");
    $(this).after(item);
    return item.slideDown();
  });
});
