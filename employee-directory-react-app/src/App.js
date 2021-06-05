import React, { Component } from "react";
import Header from "./components/header/Header";
import API from "./utils/API";
import SearchForm from "./components/SearchForm/SearchForm";
import SearchResults from "./components/SearchResults/SearchResults";
import Moment from 'moment';

class App extends Component {
  state = {
    search: "",
    results: [],
    filteredresults:[],
    sortAsc:false,
    error: ""
  };

  componentDidMount() {
    API.getEmployees()
      .then(res => {
        this.setState({ results: res.data.results.map(data=>{return {Image:data.picture.medium, Name:data.name.first+' '+data.name.last,Phone:data.phone,Email:data.email, DOB:Moment(data.dob.date).format('MM-DD-YYYY')  }}) });
        this.setState({ filteredresults: res.data.results.map(data=>{return {Image:data.picture.medium, Name:data.name.first+' '+data.name.last,Phone:data.phone,Email:data.email, DOB: Moment(data.dob.date).format('MM-DD-YYYY') }}).sort(function(a, b) {
          if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
          if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
          return 0;
         }) });
      }
      )
      .catch(err => console.log(err));
  }
  handleInputChange = event => {

    if(this.state.sortAsc)
    {
      this.setState({filteredresults:this.state.filteredresults.sort(function(a, b) {
        if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
        if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
        return 0;
       })});
    }
    else
    {
      this.setState({filteredresults:this.state.filteredresults.sort(function(a, b) {
        if(a.Name.toLowerCase() > b.Name.toLowerCase()) return -1;
        if(a.Name.toLowerCase() < b.Name.toLowerCase()) return 1;
        return 0;
       })});
    }
    if(this.state.sortAsc)
    {
    this.setState({filteredresults: this.state.results.filter(person => person.Name.toLowerCase().includes(event.target.value.toLowerCase())).sort(function(a, b) {
        if(a.Name.toLowerCase() > b.Name.toLowerCase()) return -1;
        if(a.Name.toLowerCase() < b.Name.toLowerCase()) return 1;
        return 0;
       })
    
    });
    }
    else
    {
      this.setState({filteredresults: this.state.results.filter(person => person.Name.toLowerCase().includes(event.target.value.toLowerCase()))
        .sort(function(a, b) {
          if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
          if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
          return 0;
         })
      });
   
    }
  };

  handleSortChange = event => {
    // this.setState({ search: event.target.value });
    this.setState({sortAsc: !this.state.sortAsc});
    if(this.state.sortAsc)
    {
      this.setState({filteredresults:this.state.filteredresults.sort(function(a, b) {
        if(a.Name.toLowerCase() < b.Name.toLowerCase()) return -1;
        if(a.Name.toLowerCase() > b.Name.toLowerCase()) return 1;
        return 0;
       })});
    }
    else
    {
      this.setState({filteredresults:this.state.filteredresults.sort(function(a, b) {
        if(a.Name.toLowerCase() > b.Name.toLowerCase()) return -1;
        if(a.Name.toLowerCase() < b.Name.toLowerCase()) return 1;
        return 0;
       })});
    }
     
   };
 

  render() {
  return (
    <div>
    <Header />
    <SearchForm   
            handleInputChange={this.handleInputChange}
           />
             <SearchResults handleSortChange={this.handleSortChange} results={this.state.filteredresults} />
    </div>
  );

}
}

export default App;
