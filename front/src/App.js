import React, {Component, Fragment} from 'react';
import Toolbar from "./components/UI/Toolbar/Toolbar";

import {Container} from "reactstrap";
import {Route, Switch} from "react-router-dom";

import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Posts from "./containers/Posts/Posts";
import OpenPost from "./containers/OpenPost/OpenPost";
import CreatePost from "./containers/CreatePost/CreatePost";



class App extends Component {
  render() {
    return (
        <Fragment>
          <header>
            <Toolbar/>
          </header>
          <Container style={{marginTop: '20px'}}>
            <Switch>
              <Route path="/" exact component={Posts}/>
              <Route path="/posts" exact component={Posts}/>
              <Route path="/add_post" exact component={CreatePost}/>
              <Route path="/register" exact component={Register}/>
              <Route path="/login" exact component={Login}/>
              <Route path="/posts/:id" exact component={OpenPost}/>
              <Route render={() => <h1>Not Found</h1>}/>
            </Switch>
          </Container>
        </Fragment>
    );
  }
}

export default App;