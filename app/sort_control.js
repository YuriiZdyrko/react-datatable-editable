var React = require('react');

var makeModifier = function(baseClassName, modifierSuffix) {
  return ' ' + baseClassName + '--' + modifierSuffix;
};

var SortControl = React.createClass({

  propTypes: {

    /**
     * field - {key: 'key_for_sorting', title: 'title_to_be_displayed'}
     * onSort - callback({key: 'key_for_sorting', isOrderDescending: bool)
     * activeSortKey - holds currently active field, can be passed default active key
     * activeSortOrderDesc - holds currently active sort order, can be passed default active sort order
    **/

    field: React.PropTypes.object.isRequired,
    onSort: React.PropTypes.func.isRequired,
    activeSortKey: React.PropTypes.string,
    isActiveOrderDesc: React.PropTypes.bool,
    showOrderAsText: React.PropTypes.bool,
    sortable: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      sortable: true,
      showOrderAsText: false
    };
  },

  getInitialState: function() {
    return {
      wasClicked: false
    };
  },

  componentWillReceiveProps: function(nextProps) {

    // Reset state if other sort control is clicked
    if (nextProps.activeSortKey !== this.props.field.key) {
      return this.setState({wasClicked: false});

      // If control is selected by default -> make it clicked
    } else {
      return this.setState({wasClicked: true});
    }
  },

  _onSort: function(e) {
    e.preventDefault();

    if (!this.props.sortable) {
      return null;
    }

    // If first click -> sort desc
    if (!this.state.wasClicked) {
      this.setState({wasClicked: true}, function() {
        this._triggerOnSort(false);
      });

      // If not first click -> toggle sort order
    } else {
      this._triggerOnSort(!this.props.isActiveOrderDesc);
    }
  },

  _triggerOnSort: function(isDesc) {
    this.props.onSort({
      key: this.props.field.key,
      isOrderDescending: isDesc,
      type: this.props.field.type || 'string'
    });
  },

  _isActive: function() {
    return this.props.field.key === this.props.activeSortKey;
  },

  _renderInside: function() {
    if (this._isActive() && this.props.showOrderAsText !== false) {
      return (
        <span>
          {this.props.field.title}
        </span>
      );
    }
    return this.props.field.title;
  },

  render: function() {

    var BASE_CLASS_NAME = 'sort-controls__item',
      className = BASE_CLASS_NAME,
      DESC_MODIFIER = 'desc',
      ASC_MODIFIER = 'asc';

    if (this.props.className) {
      className += makeModifier(BASE_CLASS_NAME, this.props.className);
    }

    if (this._isActive()) {
      className += makeModifier(BASE_CLASS_NAME, 'active');
      className += makeModifier(
        BASE_CLASS_NAME,
        this.props.isActiveOrderDesc ? DESC_MODIFIER : ASC_MODIFIER);
    }

    var commonClassName='dt-cell';
    commonClassName += makeModifier(commonClassName, this.props.className);
    className += ' ' + commonClassName;

    return (
      <li className={className}>
        <button onClick={this._onSort}>{this._renderInside()}</button>
      </li>
    );
  }
});

module.exports = SortControl;
