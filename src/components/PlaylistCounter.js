import React, { Component } from 'react'

class PlaylistCounter extends Component {
  render() {
    return (
      <div className='aggregate'>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    )
  }
}

export default PlaylistCounter;