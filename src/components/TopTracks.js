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
                <li>{artist.name}</li>)
            }
            <li>

              <div>
                <div> 
                  {!this.state.showDescription && <PopularityDescription />}
                </div>
                <div className = "popularity" onMouseOut ={this.showDescription.bind(this)} 
                      onMouseOver={this.showDescription.bind(this)}>
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