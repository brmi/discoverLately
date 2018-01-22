import React, { Component } from 'react'

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

export default Playlist;