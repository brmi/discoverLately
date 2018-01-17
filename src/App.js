import React, { Component } from 'react';
import './App.css';

class Aggregate extends Component {
  render() {
    return (
      <div className='aggregate'>
        <h2>Number Text</h2>
      </div>
    )
  }
}

class SearchBar extends Component{
  render() {
    return(
      <div className="search">
        <img/>
        <input type="text" />
      </div>
    )
  }
}

class Playlist extends Component{
  render() {
    return(
      <div>
        <img />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1> Title </h1>
        <div className="numText">
          <Aggregate/>
          <Aggregate/>
        </div>
        <SearchBar/>
        <div className="playlists">
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div>
      </div>
    )
  }
}

export default App;
