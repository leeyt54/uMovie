import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { Divider } from "semantic-ui-react";

import Heading from "./components/Heading";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import MovieDetailContainer from "./components/MovieDetailContainer";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.params = {};
axios.defaults.params["api_key"] = "9c2b2981608f11ad4986008d1921815b";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Heading />
            <Divider />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/movie/:id" component={MovieDetailContainer} />
            </Switch>
            <Divider />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
