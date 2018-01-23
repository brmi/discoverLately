import React, { Component } from 'react'
import PopularityDescription from './PopularityDescription'
import PlaySong from './PlaySong'

class TopTracks extends Component {

  constructor () {
      super()
      this.state = {
        showDescription: true
      }
    }


  showDescription(){
    console.log('hover works');
    this.setState({
      showDescription: !this.state.showDescription
    })
  }


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
                <li className="artistNames">{artist.name}</li>)
            }
          </ul>
            
              <div className='trackContent'>
              <p className="mouseOverPopularity">popularity: {tracks.popularity}</p>
                <PlaySong tracks={tracks}/>
              </div>

        </div>
      </div>
      )
  }
}

export default TopTracks;