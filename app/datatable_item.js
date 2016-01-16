var React = require('react'),
  Checkbox = require('./checkbox'),
  classNames = require('classnames');

var utils = require('./utils');

var DataTableItem = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired,
    tableMode: React.PropTypes.bool,
    itemKeyField: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    columns: React.PropTypes.array.isRequired,
    onSelect: React.PropTypes.func.isRequired,
    isSelected: React.PropTypes.bool.isRequired,
    getItemClassName: React.PropTypes.func
  },

  getClassName: function(column) {
    var classNameWithModifier = {};
    var classNameModifier = 'dt-cell--' + column.className;
    classNameWithModifier[classNameModifier] = true;
    return classNames(
      {'dt-cell': true},
      classNameWithModifier
    );
  },

  getCellContents: function(column) {
    return column.component ?
      React.createElement(column.component, {
        item: this.props.item,
        field: column.field,
        label: column.label
      }) :
      this.props.item[column.field];
  },

  _renderCheckbox: function() {
    var className = 'dt-cell dt-cell--checkbox',
        key='iAmUnique';
    var checkbox = <Checkbox onChange={this.onSelect} value={this.props.isSelected}/>;
    return <div key={key} className={className}>{checkbox}</div>;
  },

  _renderColumn: function(column, index) {
    return <div key={index} className={this.getClassName(column)}>{this.getCellContents(column)}</div>;
  },

  onSelect: function(value) {
    this.props.onSelect(this.props.item[this.props.itemKeyField], value);
  },

  renderInside: function() {
    var columns = this.props.columns.map(function(column, index) {
      return this._renderColumn(column, index);
    }.bind(this));
    if (!this.props.selectionOff) {
      columns.unshift(this._renderCheckbox());
    }
    return columns;
  },

  render: function() {

    var dynamicClassName = {};
    var dynamicClassNameKey = this.props.getItemClassName ? this.props.getItemClassName(this.props.item) : '';
    dynamicClassName[dynamicClassNameKey] = true;

    var className = classNames(
      {'dt__item': true},
      {'dt__item--selected': this.props.isSelected},
      {'dt__item--disabled': this.props.disabled},
      dynamicClassName
    );

    return <div className={className}>{this.renderInside()}</div>;
  }
});

module.exports = DataTableItem;
