import React, { Component } from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

class App extends Component {

  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    };

  }

  componentDidMount() {
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }


  // arrow function binds the method to the lexical scope in which it is defined, in this case, the App class (meaning no need for this.bind in the constuctor)
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

render() {

  const { monsters, searchField } = this.state;
  // same as doing: 
  // const monsters = this.state.monsters;
  // const searchField = this.state.searchField;
  //(destructuring)
  const filteredMonsters = monsters.filter(monster => 
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

  return (
    <div className="App">
      <h1>Monsters Rolodex</h1>
      <SearchBox 
        placeholder={'search monsters'}
        handleChange={this.handleChange}
      />
      <CardList monsters={filteredMonsters} />
    </div>
  );
 }
}

export default App;
