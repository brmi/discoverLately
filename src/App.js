import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Desiree',
    playlists: [
      {
        name: 'Weewo',
        songs: [{name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234}]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234}]
      },
      {
        name: 'phenom',
        songs: [{name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234}]
      },
      {
        name: 'piano crey',
        songs: [{name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234},
                {name: 'beat it', duration: 1234}]
      }
    ]
  }
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div className='aggregate'>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    )
  }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
      return songs.concat(eachPlaylist.songs)
    }, [])
    let totalDuration = allSongs.reduce((sum, eachSong) => {
      return sum + eachSong.duration;
    }, 0)
    return (
      <div className='aggregate'>
        <h2>{Math.round(totalDuration/60)} hours</h2>
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
  constructor(){
    super();
    this.state = {serverData: {}}
  }
  componentDidMount() {
    setTimeout( () => {
      this.setState({serverData: fakeServerData});
    }, 1000);  
  }
  render() {
    return (
      <div className="App">
      {this.state.serverData.user ?
        <div>
        <h1> {this.state.serverData.user.name}'s Playlists </h1>
        <div className="numText">
          <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
          <HoursCounter playlists={this.state.serverData.user.playlists}/>
        </div>
        <SearchBar/>
        <div className="playlists">
          <Playlist/>
          <Playlist/>
          <Playlist/>
          <Playlist/>
        </div> 
        </div>: <h1> Loading ...  </h1>
      }
      </div>
    )
  }
}

export default App;
