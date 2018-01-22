import React, { Component } from 'react'

class PlaySong extends Component {
  render() {
  	let tracks = this.props.tracks;
    return(
      <div className="playSong">
	      <audio controls controlsList="nodownload">
	        <source src={tracks.preview_url} type="audio/mp3"/>
	        <p>Your browser doesn't support HTML5 audio. Here is a <a href={tracks.preview_url}>link to the audio</a> instead.</p>
	      </audio>
      </div>
    )
  }
}

export default PlaySong;