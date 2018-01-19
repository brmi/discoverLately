import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: 'Desiree',
    playlists: [
      {
        name: 'Weewo',
        songs: [{name: 'Irrational Friend', duration: 1234},
                {name: 'Salvador', duration: 1234},
                {name: 'Get Through This', duration: 1234},
                {name: 'Parking Lots', duration: 1234}]
      },
      {
        name: 'Discover Weekly',
        songs: [{name: 'New Slang', duration: 1234},
                {name: 'Heaven on Fire', duration: 1234},
                {name: 'Beat It', duration: 1234},
                {name: 'Cape Cod Kwassa Kwassa', duration: 1234}]
      },
      {
        name: 'phenom',
        songs: [{name: 'Fazerdaze', duration: 1234},
                {name: 'Ladyfingers', duration: 1234},
                {name: 'Rock With You', duration: 1234},
                {name: 'Passenger Seat', duration: 1234}]
      },
      {
        name: 'piano crey',
        songs: [{name: 'Gympopedie', duration: 1234},
                {name: 'Claire de Lune', duration: 1234},
                {name: 'Flowers', duration: 1234},
                {name: 'Autumn Colors', duration: 1234}]
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
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

class Playlist extends Component{
  render() {
    let playlist = this.props.playlist
    return(
      <div>
        <img />
        <h3>{playlist.name}</h3>
        <ul>
          {
            playlist.songs.map(song => 
              <li> {song.name} </li>
          )}
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {serverData: {},
    filterString: ''
    }
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
        <SearchBar onTextChange={text => this.setState({filterString : text})}/>
        <div className="playlists">
        {
          this.state.serverData.user.playlists.filter(playlist =>
              playlist.name.toLowerCase().includes(
                this.state.filterString.toLowerCase())
            ).map(playlist => 
            <Playlist playlist={playlist}/>
        )}
        </div> 
        </div>: <h1> Loading ...  </h1>
      }
      </div>
    )
  }
}

export default App;
