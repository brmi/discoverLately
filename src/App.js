import React, { Component } from 'react';
import './App.css';
import TopTracks from './components/TopTracks'
import Playlist from './components/Playlist'
import Description from './components/Description'
import ExportPlaylistButton from './components/ExportPlaylistButton'


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
    userData: {},
    filterString: '',
    artist: null,
    playlistServerData: {},
    topTracksData: {},
    createdPlaylistData: {},
    playlistExported: false,
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
        const FETCH_URL = BASE_URL + this.state.userData.id + '/playlists/' + this.state.createdPlaylistData.id + '/tracks';
        
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
          this.setState({playlistExported: true});
        });
      } else {
        console.log('Do not have playlist data.');
      }
  }

  createPlaylist() {
    console.log("Creating Playlist... ", this.state.topTracksData);

    const BASE_URL = 'https://api.spotify.com/v1/users/';
    const FETCH_URL = BASE_URL + this.state.userData.id + '/playlists';
    var accessToken = this.state.accessToken;

    var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var currentDate = new Date();
    var thisMonth = months[currentDate.getMonth()];
    var playlistName = 'Discover Lately ' + thisMonth;
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
        this.setState({userData: json});
        console.log('get user data: ', this.state.userData);
      });
  }

  render() {
    return (
      <div className="App">
      {this.state.playlistServerData.items && this.state.userData && this.state.topTracksData.items ?
        <div>
          <Description />
          <div><a onClick={this.createPlaylist} className="exportPlaylistLink"><ExportPlaylistButton playlistExported={this.state.playlistExported}/></a></div>
          <div className='header'><h1> Discover Lately </h1></div>
        
        <div>
          {
            this.state.topTracksData.items.map(tracks => 
              <TopTracks tracks={tracks}/>)
          }
        </div>
        </div>: <h1> Loading ...  </h1>
      }
      </div>
    )
  }
}

export default App;
