import React from 'react';
import logo from './shoppiesLOGO.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Search.css';
import './Confirm.css'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import {BrowserRouter,Router,Route,Link} from "react-router-dom";
import graphic_a from './shoppies_a.png';
import graphic_b from './shoppies_b.png';

class Confirm extends React.Component {

  constructor(props){

    super(props);
    
    this.state={
      Nominees:this.props.nominees
    }
    this.refreshPage=this.refreshPage.bind(this);
  }


  refreshPage(){
    window.location.reload();
  }

    render(){


    return(
      <div className="confirm">
         <div><img className="logo" src={logo}></img></div>
        <div><strong>Thank You For Voting For:</strong></div>

         {this.props.nominees.map(movie=> 
         <div className="movie">{movie}</div>)}

         <button className="submitVote" onClick={this.refreshPage}>Exit</button>
      </div>
    )}
}

export default Confirm;