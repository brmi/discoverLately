import React, { Component } from 'react'


class PopularityDescription extends Component {
  render() {
    return(
      <div className="popularityDescription">
        <p>
          The popularity of a track is a value between 0 and 100, 
          with 100 being the most popular. The popularity is calculated 
          by algorithm and is based, in the most part, on the total 
          number of plays the track has had and how recent those plays are.
        </p>
      </div>
    )
  }
}

export default PopularityDescription;