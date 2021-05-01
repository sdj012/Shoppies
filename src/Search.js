import React from 'react';
import './Search.css';

class Search extends React.Component {

  constructor(props){

    super(props);

    this.state={
      Movies:[],
      Nominees:[],
    }

    this.componentDidMount=this.componentDidMount.bind(this);
    this.returnMovies=this.returnMovies.bind(this);
    // this.addToNominees=this.addToNominees.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.checkDuplicates=this.checkDuplicates.bind(this);
    this.markNominated=this.markNominated.bind(this);
    this.getIndexValue=this.getIndexValue.bind(this);
    // this.allMovies=this.allMovies.bind(this);
  
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

  handleChange(event){

    let counter=0;
    let index=0;

    event.preventDefault();

    //Check For Duplicates
    //Only If Nominee Doesn't Exist 
    // if( this.state.Nominees.length == 0 || !this.checkDuplicates(event.target.value)){

    //   this.setState({
    //     Nominees:[...this.state.Nominees,event.target.value]
    //   })

    //   console.log("Nominee Added : " + event.target.value);

      // Wait for State to Update //

    this.setState({
      Nominees:[...this.state.Nominees,event.target.value]
    })


    //Change to While

    // this.state.Movies.map(movie=>{

    //   if(event.target.value==movie.Title) return index; // Deliever event.target.value's Index Position In Currently Rendered Array of Movies

    //   index++; // Increment returnedindex Value by One At The End Of Each Loop

    // })

    let updatedData=this.state.Movies.slice(0);

    for(counter in updatedData){

      if(event.target.value==updatedData[counter].Title) index=counter;// Deliever event.target.value's Index Position In Currently Rendered Array of Movies

      counter++; // Increment returnedindex Value by One At The End Of Each Loop

    }

    updatedData[index].Nominated=true;

    this.setState({
      Movies:[...this.state.Movies,updatedData]
    })

    console.log("Nominee Added : " + event.target.value);

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

  returnMovies(){
    return this.state.Movies;
  }

  // Search Fetch from Api //
  componentDidMount(){
    fetch("http://www.omdbapi.com/?apikey=e8dad806&s=Star")
    .then(response => response.json())
    .then(result=>this.queryResults(result))
    .catch(error=>error);
  }

  render() {
    return(
      <div className="parent">
        <div className="div1">Shoppies</div>
        <div className="div2"></div>
        <div className="div3"><input type="text" placeholder="Search For a Movie"></input></div>
        <div className="div4"><button>Search</button></div>

        
        {/* Each Movie: Title, Year, Disable-able Nominate Button */}

        <div className="div5">
          {this.state.Movies.map(movie => 
            <div>
              <p>{movie.Title}</p>
                <button value={movie.Title} onClick={this.handleChange} disabled={movie.Nominated}>Nominate</button>
            </div>
          )}

        </div>



        <div className="chat-popup" id="myForm">
          <form className="form-container">
          <div className="nominees">{this.state.Nominees.map(nominee => <p>{nominee}</p>)}</div>
          <button>Submit</button>
          </form>
        </div> 

        
      </div>

    )
  }
}

export default Search;