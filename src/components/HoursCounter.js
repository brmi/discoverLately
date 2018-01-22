import React, { Component } from 'react'


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

export default HoursCounter;