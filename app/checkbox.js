var React = require('react'),
  classNames = require('classnames');

var Checkbox = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func,
    title: React.PropTypes.string,
    value: React.PropTypes.bool,
    name: React.PropTypes.string
  },

  onChange: function(e) {
    var value = e.target.checked;
    this.props.onChange(value);
  },

  render: function() {
    var className = classNames({
      'base-checkbox': true,
      'base-checkbox--checked': this.props.value,
      'base-checkbox--disabled': this.props.disabled
    });

    return (
      <label className={className}>
        <input
          type='checkbox'
          className='base-checkbox__input'
          name={this.props.name}
          onChange={this.onChange}
          checked={this.props.value}
        />
        <i className='base-checkbox__icon' />
          {this.props.title ? (
            <span className='base-checkbox__label'>{this.props.title}</span>
          ) : null}
      </label>
    );
  }
});

module.exports = Checkbox;
