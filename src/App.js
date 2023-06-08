import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_APP
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
          <Routes>
            <Route exact path = "/" element = {<News  apiKey={this.apiKey} key = "general" pageSize = {15} country = 'in' category = "general"/>}/>
            <Route exact path = "/business" element = {<News  apiKey={this.apiKey} key = "business" pageSize = {15} country = 'in' category = "business"/>}/>
            <Route exact path = "/entertainment" element = {<News  apiKey={this.apiKey} key = "entertainment" pageSize = {15} country = 'in' category = "entertainment"/>}/>
            <Route exact path = "/general" element = {<News  apiKey={this.apiKey} key = "general" pageSize = {15} country = 'in' category = "general"/>}/>
            <Route exact path = "/health" element = {<News  apiKey={this.apiKey} key = "health" pageSize = {15} country = 'in' category = "health"/>}/>
            <Route exact path = "/science" element = {<News  apiKey={this.apiKey} key = "science" pageSize = {15} country = 'in' category = "science"/>}/>
            <Route exact path = "/sports" element = {<News  apiKey={this.apiKey} key = "sports" pageSize = {15} country = 'in' category = "sports"/>}/>
            <Route exact path = "/technology" element = {<News  apiKey={this.apiKey} key = "technology" pageSize = {15} country = 'in' category = "technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
