var Datatable = require('./datatable'),
  ReactDOM = require('react-dom'),
  RemoveComponent = require('./datatable_item_remove'),
  React = require('react');

var DatatableWrapper = React.createClass({

  items: [
    {
      "id": "569a1f945813fbb2f37ebf38",
      "name": "John",
      "age": 23,
      "eyeColor": "blue",
      "favoriteFruit": "strawberry",
      "birthDate": "10/10/1910"
    },
    {
      "id": "569a1f94e65d932849c54a86",
      "name": "Derrick",
      "age": 33,
      "eyeColor": "blue",
      "favoriteFruit": "strawberry",
      "birthDate": "10/10/1930"
    },
    {
      "id": "569a1f948e8a66904764e0c1",
      "name": "Brian",
      "age": 21,
      "eyeColor": "blue",
      "favoriteFruit": "strawberry",
      "birthDate": "10/10/1940"
    },
    {
      "id": "569a1f941af9f3b046c9e768",
      "name": "John",
      "age": 28,
      "eyeColor": "brown",
      "favoriteFruit": "strawberry",
      "birthDate": "10/10/1950"
    },
    {
      "id": "569a1f94babf6aa7b9bf7c70",
      "name": "John",
      "age": 34,
      "eyeColor": "green",
      "favoriteFruit": "apple",
      "birthDate": "10/10/1940"
    },
    {
      "id": "569a1f94521372d48d7cd304",
      "name": "Jessica",
      "age": 31,
      "eyeColor": "brown",
      "favoriteFruit": "apple",
      "birthDate": "10/10/1940"
    }
  ],

  onSelectionChange: function(selected) {
    console.log("Call to Flux action with selected ids " + selected);
  },

  render: function() {
    return (
      <Datatable
        onSelectionChange={this.onSelectionChange}
        defaultSortKey='name'
        secondarySortKey='age'
        className='dt--some-namespace-classname'
        items={this.items}
        itemKeyField='id'
        columns={[{
          field: 'name',
          label: 'Name',
          className: 'name'
        }, {
          field: 'age',
          label: 'Age',
          className: 'age'
        }, {
          field: 'eyeColor',
          label: 'Eye Color',
          className: 'eye-color'
        }, {
          field: 'favoriteFruit',
          label: 'Favorite Fruit',
          className: 'favourite-fruit'
        }, {
          field: 'birthDate',
          label: 'Date of Birth',
          type: 'date',
          className: 'birth-date'
        }, {
          sortingOff: true,
          label: 'Remove',
          className: 'remove',
          component: RemoveComponent
        }]}
      />
    )
  }
});

var root = document.getElementById('root');

ReactDOM.render(
  <DatatableWrapper />,
  root
);
