import React from 'react';
import './Search.css';
import logo from './shoppiesLOGO.png';
import landingbackground from './landing_background.png'

class Search extends React.Component {

  constructor(props){

    super(props);
    
    this.state={
      Movies:[],
      Nominees:[],
      SearchTerm:'',
      currentPage:1,
      loading:true,
    }

    this.moviePool=React.createRef();

    this.componentDidUpdate=this.componentDidUpdate.bind(this);
    this.fireAnimation=this.fireAnimation.bind(this);
    // this.componentDidMount=this.componentDidMount.bind(this);
    // this.returnMovies=this.returnMovies.bind(this);
    this.handleChange=this.handleChange.bind(this);
    // this.checkDuplicates=this.checkDuplicates.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.getIndexValue=this.getIndexValue.bind(this);
    this.hitMaxNumberOfVotes=this.hitMaxNumberOfVotes.bind(this);
    this.removeFromList=this.removeFromList.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.existsInList=this.existsInList.bind(this);
    this.disableExistingNominees=this.disableExistingNominees.bind(this);
    this.generateID=this.generateID.bind(this);
    this.lockScreen=this.lockScreen.bind(this);
    this.paginateForwards=this.paginateForwards.bind(this);
    this.paginateBackwards=this.paginateBackwards.bind(this);
  }

  queryResults(data){

    //Catch Empty Page

    if(!data.Search) {
      console.log("page does not exist") 
    }

    else{

    let movies=[]

    for( var i in data.Search){

      if(data.Search[i].Poster==="N/A"){ //For Objects Containing Images

        movies.push( //Copying Data To State Array
          {
          "Title": data.Search[i].Title,
          "Year": data.Search[i].Year,
          "Img": "https://cdn.pixabay.com/photo/2019/04/24/21/55/cinema-4153289_960_720.jpg"
          }
        )

      }

      else { //For Objects Containing Images

        movies.push( //Copy Data State Array
          {
          "Title": data.Search[i].Title,
          "Year": data.Search[i].Year,
          "Img": data.Search[i].Poster,
          }
        )
        
      }
    }

    this.setState({
      Movies:movies
    })

    console.log(this.state.Movies);

    }

  }

    getIndexValue(title){

    let index=0;

    this.state.Movies.map(movie=>{

      if(title==movie.Title) return index; // Deliever event.target.value's Index Position In Currently Rendered Array of Movies

      index++; // Increment returnedindex Value by One At The End Of Each Loop

    })

  }

  removeFromList(event){

    document.getElementById(this.generateID(event.target.value)).disabled=""; 

    let counter=0;
    let index=0;

    for(counter in this.state.Nominees){

      if(event.target.value==this.state.Nominees[counter]) index=counter;// Deliever event.target.value's Index Position In Currently Rendered Array of Movies
      counter++; // Increment returnedindex Value by One At The End Of Each Loop

    }
    
    let updatedData=this.state.Nominees.slice(0); //Remove event.target.value from Nominees List
    updatedData.splice(index,1);

    this.setState({
      Nominees:updatedData
    })

    // document.getElementById(this.generateID(movieTitle)).disabled="";

  }

  generateID(movieTitle){

    //remove spaces
    let id=movieTitle;
    id = id.replace(/\s+/g, '');

    console.log("generated ID: " + id)
    return id;

  }

  hitMaxNumberOfVotes(){

    if(this.state.Nominees.length == 5 ) {
      return "div1 hiddenBanner"
    }
    
    else return "hide"
    
  }

  lockScreen(){

    if(this.state.Nominees.length == 5 ) {
      return "lockingLayer"
    }
    
    else return "hiddenLayer"

  }

  // Set User Entry As State Search Term

  handleSearch(event){

    event.preventDefault();

    this.setState({
      SearchTerm:event.target.value,
    })

    // Enable Live Search

    fetch("http://www.omdbapi.com/?apikey=e8dad806&s=" + this.state.SearchTerm )
    .then(response => response.json())
    .then(result=>this.queryResults(result))
    .catch(error=>error);

  }


  handleSubmit(event){

    event.preventDefault();

    this.moviePool.current.scrollIntoView(); // Move to Beginning of List

    // if(event.charCode === 13 ) { //Detect Enter Key 
 
      fetch("http://www.omdbapi.com/?apikey=e8dad806&s=" + this.state.SearchTerm )
      .then(response => response.json())
      .then(result=>this.queryResults(result))
      .catch(error=>error);

    // }

  }


  paginateBackwards(event){ // Fetch Another Page Using Parameters 'page'

    event.preventDefault();

    let previousPage=this.state.currentPage-1;


    fetch("http://www.omdbapi.com/?apikey=e8dad806&s=" + this.state.SearchTerm + "&page=" + previousPage)
    .then(response => response.json())
    .then(result=>this.queryResults(result))
    .catch(error=>error);

    this.setState({
      currentPage:previousPage,
      SearchTerm:event.target.value,
    })

    this.moviePool.current.scrollIntoView(); // Move To Beginning of List

  }

  paginateForwards(event){ // Fetch Another Page Using Parameters 'page'

    event.preventDefault();

    let nextPage=this.state.currentPage+1;

    fetch("http://www.omdbapi.com/?apikey=e8dad806&s=" + this.state.SearchTerm + "&page=" + nextPage)
    .then(response => response.json())
    .then(result=>this.queryResults(result))
    .catch(error=>error);
    
    this.setState({
      currentPage:nextPage,
      SearchTerm:event.target.value,
    })

    this.moviePool.current.scrollIntoView(); // Move To Beginning of List

  }

  // Handle Nominate Buttons

  handleChange(event){

    let counter=0;
    let index=0;

    // event.preventDefault();


    this.setState({
      Nominees:[...this.state.Nominees,event.target.value]
    })



    let updatedData=this.state.Movies.slice(0);

    for(counter in updatedData){

      if(event.target.value==updatedData[counter].Title) index=counter;// Deliever event.target.value's Index Position In Currently Rendered Array of Movies

      counter++; // Increment returnedindex Value by One At The End Of Each Loop

    }

    updatedData[index].Nominated=true;

    this.setState({
      Movies:updatedData
    })

    console.log("Nominee Added : " + event.target.value);

    // document.getElementById(event.target.value).style.display="none";
    // document.getElementById(event.target.value).disabled="true";
    }

    disableExistingNominees(){

      let MoviesIndex=0;
      let NomineesIndex=0;

        for(MoviesIndex in this.state.Movies){

          let movieTitleInMovies=this.state.Movies[MoviesIndex].Title;

          for(NomineesIndex in this.state.Nominees){

            let movieTitleInNominees=this.state.Nominees[NomineesIndex]; 

            if(movieTitleInMovies==movieTitleInNominees) document.getElementById(this.generateID(movieTitleInMovies)).disabled="true"; //Loop Through Current Render of Movies & Search For the Movie Title in Nominees List

            NomineesIndex++;

          }

          MoviesIndex++;
        }
    }




  checkDuplicates(movieTitle){

    this.state.Nominees.map(nominee=>{

      //If Nominee Name is Present in List, Return True

      if (nominee==movieTitle){

        console.log("duplicate");
        return true;

      } 

    })

    return false;
    
  }


  existsInList(movieTitle){

    console.log("clicked on: " + movieTitle)

    this.state.Nominees.map(nominee=>{ //Search For Exact Match

      if(movieTitle==nominee)return true;
      console.log("nominee: " + nominee)

    })

    return false;


  }

  returnMovies(){
    return this.state.Movies;
  }

  fireAnimation(){

  }

  componentDidUpdate(){

    this.fireAnimation()
    this.disableExistingNominees(); //Check If Current Render Contains Titles in Current Nominee List. If Title Present in Current Nominee List, Disable the Nominate Button
  }



  // Search Fetch from Api
  // componentDidMount(){
    
  //   fetch("http://www.omdbapi.com/?apikey=e8dad806&s=The&page="+this.state.currentPage)
  //   .then(response => response.json())
  //   .then(result=>this.queryResults(result))
  //   .catch(error=>error);

  // }

  render() {

    let bannerVisibility=this.hitMaxNumberOfVotes();
    let screenlock=this.lockScreen();
    console.log("bannerVisibility: " + bannerVisibility)



    return(
      <div className="parent">

        <div className={screenlock}></div>

        {/* Display Nominees */}

        <div className="div1">

          <div className="navBar">
            <a><img className="logo" src={logo}></img></a>
            <a href="#">Vote</a>
            <a>About</a>
            <a>Contact</a>
            <a>Highlights</a>
            <a>Partners</a>
          </div>

          <div className="nominees">
            {this.state.Nominees.map(nominee => <div>{nominee} <button className="removeNominee" value={nominee} onClick={this.removeFromList}> X </button></div>)}
            <div className={bannerVisibility}> Head to Submit or Remove Votes to Vote For Other Movies<button>VOTE</button></div>
          </div>

          <div className="landingBanner">
            <div className="bannerElements"><img className="landingLogo" src={logo}></img></div>
          </div>


        
        </div>

        <div className="div2"></div>

        {/* Search Bar */}
  
        <div className="div3" ref={this.moviePool}>
          <form onSubmit={this.handleSubmit}>
            <input className="searchBar" value={this.state.searchTerm} type="search" placeholder="  Search For a Movie" onChange={this.handleSearch}></input>
            <input className="submitQuery" type="submit" value="Search" onKeyPress={this.handleSubmit}/>
          </form>
        </div>



        
        {/* Render Movies: Poster, Title, Year, Disable-able Nominate Button */}


        <div className="div5" >

          {this.state.Movies.map(movie => 

            <div className="movieCard">

              <img className="moviePoster" width="65%" height="auto" src={movie.Img}></img>
              <p className="movieTitle">{movie.Title}</p>
              <p className="movieYear">{movie.Year}</p>
              <button className="nominateButton" id={this.generateID(movie.Title)} value={movie.Title} onClick={this.handleChange}>Nominate</button>

              {/* disable={this.existsInList(movie.Title)}   */}
            </div>

          )}

        <div className="paginateButtons">
          <button className="paginateBackwards" value={this.state.SearchTerm} onClick={this.paginateBackwards}>Previous</button>
          <button className="paginateForwards" value={this.state.SearchTerm} onClick={this.paginateForwards}>Next</button>
        </div>

        
        </div>



        {/* <div className="chat-popup" id="myForm">
          <form className="form-container">
            <div className="nominees">{this.state.Nominees.map(nominee => <div>{nominee} <button id={this.generateID(nominee)} value={nominee} onClick={this.removeFromList}>remove</button></div>)}</div>
            <div className="modal">Heads Up! You Already Voted For 5 Movies</div>
            <button>Submit</button>
          </form>
        </div>  */}

        {/* <div className="footer"></div> */}

        
      </div>

    )
  }
}

export default Search;