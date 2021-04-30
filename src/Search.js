import React from 'react';
import './Search.css';

class Search extends React.Component {
  render() {
    return(
      <div class="parent">
        <div class="div1">Shoppies</div>
        <div class="div2">Search OMDB</div>
        <div class="div3"><input type="text" placeholder="Search For a Movie"></input></div>
        <div class="div4">Search</div>
      </div>
    )
  }
}

export default Search;