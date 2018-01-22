import React, { Component } from 'react'

class SearchBar extends Component{
  render() {
    return(
      <div className="search">
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)} />
      </div>
    )
  }
}

export default SearchBar;