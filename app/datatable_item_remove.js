var React = require('react');

var DatatableItemRemove = React.createClass({
  propTypes: {
    item: React.PropTypes.object.isRequired
  },

  _onClick: function() {
    alert('item with id ' + this.props.item.id + ' should be removed. To do this - use some sort of global Event emitter or Flux dispatcher');
  },

  render: function() {
    return (
      <button onClick={this._onClick}>x</button>
    )
  }
});

module.exports = DatatableItemRemove;
