var React = require('react');
var classNames = require('classnames');
var DataTableItem = require('./datatable_item');
var Checkbox = require('./checkbox');
var utils = require('./utils');
var isEqual = require('lodash.isequal');
var SortControl = require('./sort_control');

var Datatable = React.createClass({

  propTypes: {
    selectionOff: React.PropTypes.bool,
    onSelectionChange: React.PropTypes.func,
    items: React.PropTypes.array,

    // Ability to set initial selection through props
    selected: React.PropTypes.array,
    itemKeyField: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    columns: React.PropTypes.array,
    defaultSortKey: React.PropTypes.string,
    defaultSortOrderIsDesc: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      tableMode: false,
      selectionOff: false,
      defaultSortOrderIsDesc: true
    };
  },

  getInitialState: function() {
    return {
      uiSelected: this.props.selected || [],
      activeSortKey: this.props.defaultSortKey,
      isActiveOrderDesc: this.props.defaultSortOrderIsDesc
    };
  },

  shouldComponentUpdate: function(nextProps, nextState) {

    // items array should always be immutable
    return nextProps.items !== this.props.items ||
      nextProps.className !== this.props.className ||
      !isEqual(nextState, this.state);
  },

  componentWillReceiveProps: function(nextProps) {
    var selected = [], self = this;

    if (nextProps.items.length !== this.props.items.length) {
      // Ability to remove item
      selected = this.state.uiSelected.filter(function(id) {
        return nextProps.items.some(function(nextItem) {
          return nextItem[self.props.itemKeyField] === id;
        });
      });

      this.setState({uiSelected: selected});
    }
  },

  _onSort: function(options) {
    this.setState({
      activeSortKey: options.key,
      isActiveOrderDesc: options.isOrderDescending
    });
  },

  _onSelectAll: function(areSelected) {
    var result = [];
    if (areSelected) {
      result = this.props.items.map(function(item) {
        return item[this.props.itemKeyField];
      }.bind(this));
    }
    this.setState({uiSelected: result}, function() {
      this.props.onSelectionChange(result)
    });
  },

  _onSelect: function(itemKey, isSelected) {
    var result;

    if (!isSelected) {
      result = this.state.uiSelected.filter(function(id) {
        return id !== itemKey;
      });
    } else {
      result = this.state.uiSelected.concat(itemKey);
    }

    this.setState({uiSelected: result}, function() {
      this.props.onSelectionChange(result)
    });
  },

  renderSortControlsRow: function() {
    var sortControls = this.props.columns.map(function (column, index) {
      return (
        <SortControl
          key={index}
          field={{key: column.field, title: column.label}}
          activeSortKey={this.state.activeSortKey}
          isActiveOrderDesc={this.state.isActiveOrderDesc}
          onSort={this._onSort}
          className={column.className}
          sortable={!column.sortingOff}
          renderAs={this.props.tableMode ? 'th' : null}
        />
      );
    }.bind(this));

    if (!this.props.selectionOff) {
      var checkbox = this.renderHeadCheckbox();
      sortControls.unshift(checkbox);
    }

    return sortControls;
  },

  areSelectedAll: function() {
    return this.props.items.length === this.state.uiSelected.length;
  },


  _getSortedItems: function() {
    var activeColumn = this.props.columns.filter(function(column) {
      return column.field === this.state.activeSortKey;
    }.bind(this))[0];

    var activeColumnDataType;
    if (!activeColumn) {
      console.warn('no matching key found for sorting! please specify defaultSortKey in props');
    } else {
      activeColumnDataType = activeColumn.type;
    }

    return utils.sort(this.props.items, {
      key: this.state.activeSortKey,
      secondarySortKey : this.props.secondarySortKey,
      isOrderDescending: this.state.isActiveOrderDesc,
      type: activeColumnDataType
    });
  },

  renderHeadCheckbox: function() {
    var className = 'dt-cell dt-cell--checkbox',
      key='iAmUnique';
    var checkbox = <Checkbox value={this.areSelectedAll()} onChange={this._onSelectAll} />;
    return <li key={key} className={className}>{checkbox}</li>;
  },

  renderItemsRows: function(items) {
    return items.map(function(item, index) {
      var isChecked = this.state.uiSelected.indexOf(item[this.props.itemKeyField]) !== -1;
      return (
        <DataTableItem
          selectionOff={this.props.selectionOff}
          tableMode={this.props.tableMode}
          key={index.toString() + item[this.props.itemKeyField]}
          item={item}
          itemKeyField={this.props.itemKeyField}
          onSelect={this._onSelect}
          isSelected={isChecked}
          columns={this.props.columns}
          getItemClassName={this.props.getItemClassName}
        />
      );
    }.bind(this));
  },

  render: function() {
    var propsClassName = {};
    propsClassName[this.props.className] = !!this.props.className;
    var className = classNames(
      {'dt': true},
      propsClassName
    );

    var items = this.renderItemsRows(this._getSortedItems());
    var sortControls = this.renderSortControlsRow();

    var table = <div className={className}>
        <ul className='dt__sort-controls'>{sortControls}</ul>
        <div className='dt__items'>{items}</div>
      </div>;

    // Don't try to render anything if list is empty
    return this.props.items.length ? table : null;
  }
});

module.exports = Datatable;
