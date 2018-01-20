import React, { Component } from 'react';
import './App.css';

let fakeServerData = {
  user: {
    name: '{{display_name}}',
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

let playlistServerData = {};

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
    let playlist = this.props.playlist;
    return(
      <div>
        <img />
        <h3>{playlist.name}</h3>
        <h4>{playlist.tracks.total}</h4>
        <img src={playlist.images[0].url}/>
        {
        //   <ul>
        //   {
        //     playlist.songs.map(song => 
        //       <li> {song.name} </li>
        //   )}
        // </ul>
        }
      </div>
    )
  }
}

class TopTracks extends Component {
  render(){
    let tracks = this.props.tracks;
    return(
      <div>
        <h3>{tracks.name}</h3>
        <ul>
          {
            tracks.artists.map(artist =>
              <li>{artist.name}</li>)
          }
        </ul>
      </div>
      )
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = {
    userData: {
      user_id: 0,
      followers: 0,
      href: '',
      profilePic: ''
    },
    filterString: '',
    artist: null,
    playlistServerData: {},
    topTracksData: {},
    accessToken: 'BQBFq4YUQORQEAMVtec0ZEWo7MZlxetrCfPmkLMVGY7WjwF7SEI0kxwGPVuuKYcW9ofHHSSjmZWJcyqaCgZpQ2qFh9ncdKWpWVhNAHJNDML2TXMUdxZD6iF39D79dNfY4kxoY_AsKeI0RlyM8WV1eMNDw-O0D6jlsZCsbXA'
    }
  }
  componentDidMount() {
    this.getUserData();
    this.getPlaylistData();
    this.getTopTracksData();
  }

  getPlaylistData() {
    const LIMIT = 50;
    const BASE_URL = 'https://api.spotify.com/v1/';
    // const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const FETCH_URL = BASE_URL + 'me/playlists?limit=' + LIMIT ;
    var accessToken = this.state.accessToken;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({playlistServerData: json});
        console.log('get playlist data: ', this.state.playlistServerData);
      })
  }

  getTopTracksData() {
    const TYPE = 'tracks';
    const LIMIT = 20;
    const BASE_URL = 'https://api.spotify.com/v1';
    const FETCH_URL = BASE_URL + '/me/top/' + TYPE + '?limit=' + LIMIT+ '&offset=0';
    // const FETCH_URL = 'https://api.spotify.com/v1/me/top/tracks?limit=20&offset=0';
    var accessToken = this.state.accessToken;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({topTracksData: json});
        console.log('get top tracks data: ', this.state.topTracksData);
      })
  }

  getUserData() {
    const BASE_URL = 'https://api.spotify.com/v1/';
    // const FETCH_URL = BASE_URL + 'q=' + this.state.query + '&type=artist&limit=1';
    const FETCH_URL = BASE_URL + 'me';
    var accessToken = this.state.accessToken;

    var myOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + accessToken
      },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
      .then(response => response.json())
      .then(json => { 
        this.setState(
          { userData: {
            user_id: json.id,
            followers: json.followers.total,
            profilePic: json.images[0].url
          }, 
        });
        console.log('get user data: ', this.state.userData);
      });
  }

  render() {
    return (
      <div className="App">
      {this.state.playlistServerData.items && this.state.userData && this.state.topTracksData.items ?
        <div>
        <h1> Music Resume </h1>
        <img src={this.state.userData.profilePic}/ >
        <div className="numText">
          <PlaylistCounter playlists={this.state.playlistServerData.items}/>
        </div>
        <div className='topTracks'>
          {
            this.state.topTracksData.items.map(tracks => 
              <TopTracks tracks={tracks}/>)
          }
        </div>
        <SearchBar onTextChange={text => this.setState({filterString : text})}/>
        <div className="playlists">
        {
          this.state.playlistServerData.items.filter(playlist =>
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
