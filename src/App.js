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
      <div className='topTracks'>
        <div className='albumCover'>
          <img src={tracks.album.images[0].url}/>
        </div>
        <div>
          <h3>{tracks.name}</h3>
          <ul>
            {
              tracks.artists.map(artist =>
                <li>{artist.name}</li>)
            }
          </ul>
        </div>
      </div>
      )
  }
}

class ExportPlaylistButton extends Component {
  render() {
    return(
      <div>
        <h1>Export Playlist to spotify :)</h1>
      </div>
    )
  }
}

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i=0; i<arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // in case params look like: list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function(v) {
        paramNum = v.slice(1,-1);
        return '';
      });

      // set parameter value (use 'true' if empty)
      var paramValue = typeof(a[1])==='undefined' ? true : a[1];

      // if parameter name already exists
      if (obj[paramName]) {
        // convert value to array (if still string)
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // if no array index number specified...
        if (typeof paramNum === 'undefined') {
          // put the value on the end of the array
          obj[paramName].push(paramValue);
        }
        // if array index number specified...
        else {
          // put the value at that index number
          obj[paramName][paramNum] = paramValue;
        }
      }
      // if param name doesn't exist yet, set it
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

class App extends Component {
  constructor(){
    super();
    this.createPlaylist = this.createPlaylist.bind(this); //ensure this is bound
    let accessToken = getAllUrlParams(window.location.href);
    accessToken = accessToken.access_token;

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
    createdPlaylistData: {},
    accessToken: accessToken
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

  addSongsToPlaylist(){
    if(this.state.createdPlaylistData){
      console.log('Adding songs to playlist...', this.state.createdPlaylistData);
      var accessToken = this.state.accessToken;

      // Add songs to playlist. 
        const BASE_URL = 'https://api.spotify.com/v1/users/';
        const FETCH_URL = BASE_URL + this.state.userData.user_id + '/playlists/' + this.state.createdPlaylistData.id + '/tracks';
        
        // get list of URIs
        var trackUris = this.state.topTracksData.items.map(tracks => tracks.uri);
        

        var playlistTracks = {
          "uris": trackUris
        }; 

        var myOptions = {
          method: 'POST',
          body: JSON.stringify(playlistTracks),
          dataType: 'json',
          headers: {
            'Authorization': 'Bearer ' + accessToken,
            'Content-Type': 'application/json'
          }
        };

        fetch(FETCH_URL, myOptions)
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log('Success adding tracks... ', response);
        });
      } else {
        console.log('Do not have playlist data.');
      }
  }

  createPlaylist() {
    console.log("Creating Playlist... ", this.state.topTracksData);

    const BASE_URL = 'https://api.spotify.com/v1/users/';
    const FETCH_URL = BASE_URL + this.state.userData.user_id + '/playlists';
    var accessToken = this.state.accessToken;

    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var currentDate = new Date();
    var thisMonth = months[currentDate.getMonth()];
    var playlistName = 'Top Tracks ' + thisMonth;
    var playlistData = {
      name: playlistName,
    };

    var myOptions = {
      method: 'POST',
      body: JSON.stringify(playlistData),
      dataType: 'json',
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'application/json'
      }
    };

    fetch(FETCH_URL, myOptions)
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      console.log('Success creating playlist... ', response);
      this.setState({createdPlaylistData: response});
      this.addSongsToPlaylist();
    });    
  }
  

  getTopTracksData() {
    const TYPE = 'tracks';
    const LIMIT = 20;
    const BASE_URL = 'https://api.spotify.com/v1';
    const FETCH_URL = BASE_URL + '/me/top/' + TYPE + '?limit=' + LIMIT+ '&offset=0';
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
        <a href="#" onClick={this.createPlaylist}><ExportPlaylistButton /></a>
        <img src={this.state.userData.profilePic}/ >
        {
          // <div className="numText">
          //   <PlaylistCounter playlists={this.state.playlistServerData.items}/>
          // </div>
        }
        <div className='topTracks'>
          {
            this.state.topTracksData.items.map(tracks => 
              <TopTracks tracks={tracks}/>)
          }
        </div>
       { 
        // <SearchBar onTextChange={text => this.setState({filterString : text})}/>
        //        <div className="playlists">
        //        {
        //          this.state.playlistServerData.items.filter(playlist =>
        //              playlist.name.toLowerCase().includes(
        //                this.state.filterString.toLowerCase())
        //            ).map(playlist => 
        //            <Playlist playlist={playlist}/>
        //        )}
        //        </div> 
             }
        </div>: <h1> Loading ...  </h1>
      }
      </div>
    )
  }
}

export default App;
