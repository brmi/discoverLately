import React, { Component } from 'react'

class ExportPlaylistButton extends Component {
  	render() {
  		let playlistExported =this.props.playlistExported;
	    return(
	      <div className="exportPlaylist">
	        {!playlistExported && <h2>Export Playlist to Spotify!</h2>}
	        {playlistExported && <h2> Playlist Exported! </h2>}
	      </div>
	    )
  	}
}

export default ExportPlaylistButton;