import React from 'react';
import logo from './shoppiesLOGO.png';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Search.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';

import {BrowserRouter,Router,Route,Link} from "react-router-dom";
import graphic_a from './shoppies_a.png';
import graphic_b from './shoppies_b.png';

class Confirm extends React.Component {

  constructor(props){

    super(props);
    
    this.state={
      Movies:[],
      Nominees:[],
    }
  }

    render(){


    return(
      <div className="parent">

        <div className="div1">

          <div>
            <Navbar className="responsive-NavBar" collapseOnSelect expand="lg">
            <Navbar.Brand href="#home"><a><img className="logo" src={logo}></img></a></Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto ml-auto responsive-NavBar">
                  {/* <Navbar.Brand href="#home"><a><img className="logo" src={logo}></img></a></Navbar.Brand> */}
                  <Nav.Link className="responsive-NavBar"  href="#">Vote</Nav.Link>
                  <Nav.Link className="responsive-NavBar"  href="#">About</Nav.Link>
                  <Nav.Link className="responsive-NavBar"  href="#">Contact</Nav.Link>
                  <Nav.Link className="responsive-NavBar"  href="#">Highlights</Nav.Link>
                  <Nav.Link className="responsive-NavBar"  href="#">Partners</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </div>


          <div className="landingBanner">
            {/* <div class="bannerElements"><img className="logo" src={logo}></img></div> */}
              <img className="bannerElements" src={graphic_a}></img>
              <img className="bannerElements"src={graphic_b}></img>
          </div>
{/* 
         <button className="floatingButton" onClick={this.handleVoteButton}>Vote Now</button> */}

      </div>

    </div>
    

    )
  }
}

export default Confirm;