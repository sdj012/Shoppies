import React from 'react';
import './Search.css';

class Search extends React.Component {

  constructor(props){

    super(props);
    
    this.state={
      Movies:[],
      Nominees:[],
      SearchTerm:'',
      loading:true,
    }
    // this.componentDidUpdate=this.componentDidUpdate.bind(this);
    // this.componentDidMount=this.componentDidMount.bind(this);
    // this.returnMovies=this.returnMovies.bind(this);
    this.handleChange=this.handleChange.bind(this);
    // this.checkDuplicates=this.checkDuplicates.bind(this);
    // this.markNominated=this.markNominated.bind(this);
    this.getIndexValue=this.getIndexValue.bind(this);
    this.hitMaxNumberOfVotes=this.hitMaxNumberOfVotes.bind(this);
    this.removeFromList=this.removeFromList.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.existsInList=this.existsInList.bind(this);
  
  }

  queryResults(data){

    let movies=[]

    for( var i in data.Search){

      movies.push(
        {
        "Title": data.Search[i].Title,
        "Year": data.Search[i].Year,
        "Nominated":false,
        }
      )
    }

    this.setState({
      Movies:movies
    })

    console.log(this.state.Movies);

  }

    getIndexValue(title){

    let index=0;

    this.state.Movies.map(movie=>{

      if(title==movie.Title) return index; // Deliever event.target.value's Index Position In Currently Rendered Array of Movies

      index++; // Increment returnedindex Value by One At The End Of Each Loop

    })

  }

  removeFromList(event){

    event.preventDefault();

    let counter=0;
    let index=0;

    for(counter in this.state.Nominees){

      if(event.target.value==this.state.Nominees[counter]) index=counter;// Deliever event.target.value's Index Position In Currently Rendered Array of Movies
      counter++; // Increment returnedindex Value by One At The End Of Each Loop

    }
    
    let updatedData=this.state.Nominees.slice(0);
    updatedData.splice(index,1);

    this.setState({
      Nominees:updatedData
    })

    document.getElementById(event.target.value).disabled="";

  }

  hitMaxNumberOfVotes(){

    if(this.state.Nominees.length == 5 ) {
      return "div1 hiddenBanner"
    }
    
    else return "div1"
    
  }

  handleSearch(event){
    this.setState({
      SearchTerm:event.target.value,
    })
  }

  handleChange(event){

    let counter=0;
    let index=0;

    event.preventDefault();


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
    document.getElementById(event.target.value).disabled="true";
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

  //Change State "Nominated to True" 
  markNominated(movieTitle){

    this.setState(prevState => ({
      Movies: {
          ...prevState.Movies,
          [prevState.Movies[1].Nominated]: true,
      },
    }));
  }

  existsInList(movie){

    console.log("clicked on: " + movie)

    this.state.Nominees.map(nominee=>{

      if(movie==nominee)return true;
      console.log("nominee: " + nominee)

    })

    return false;


  }

  returnMovies(){
    return this.state.Movies;
  }

  componentDidUpdate(){
    fetch("http://www.omdbapi.com/?apikey=e8dad806&s=" + this.state.SearchTerm)
    .then(response => response.json())
    .then(result=>this.queryResults(result))
    .catch(error=>error);
  }



  // Search Fetch from Api //
  // componentDidMount(){
    
  //   fetch("http://www.omdbapi.com/?apikey=e8dad806&s=Star")
  //   .then(response => response.json())
  //   .then(result=>this.queryResults(result))
  //   .catch(error=>error);

  // }

  render() {

    let bannerVisibility=this.hitMaxNumberOfVotes();
    console.log("bannerVisibility: " + bannerVisibility)


    return(
      <div className="parent">
        <div className="div1">Shoppies</div>
        <div className={bannerVisibility}>You Voted For 5 Movies. Head to Submit</div>
        <div className="div2"></div>
  
        <div className="div3">
          <form>
            <input value={this.state.searchTerm} type="text" placeholder="Search For a Movie" onChange={this.handleSearch}></input>
            <button value="submit">Search</button>
          </form>
        </div>



        
        {/* Each Movie: Title, Year, Disable-able Nominate Button */}

        <div className="div5">

          {this.state.Movies.map(movie => 

            <div>
              <p>{movie.Title}</p>
              <button className="nominateButton" id={movie.Title} value={movie.Title} onClick={this.handleChange}>Nominate</button>
            </div>

          )}

        </div>



        <div className="chat-popup" id="myForm">
          <form className="form-container">
          <div className="nominees">{this.state.Nominees.map(nominee => <p>{nominee}<button value={nominee} onClick={this.removeFromList}>remove</button></p>)}</div>
          <div className="modal">Heads Up! You Already Voted For 5 Movies</div>
          <button>Submit</button>
          </form>
        </div> 

        
      </div>

    )
  }
}

export default Search;