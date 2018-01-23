import React, { Component } from 'react'
import PopularityDescription from './PopularityDescription'
import PlaySong from './PlaySong'

var count = 0;

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
    count = count +1;
    return(
      <div className='topTracks'>
        <div className = 'number'>
          <p>{count}</p>
        </div>
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
            <li>

              <div>
                <div className = "popularity">
                      <p className="mouseOverPopularity"> popularity: {tracks.popularity}</p>
                </div>
                <PlaySong tracks={tracks}/>
              </div>

            </li>
          </ul>
        </div>
      </div>
      )
  }
}

export default TopTracks;