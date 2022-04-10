import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import EditProfile from "./components/editProfile";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logout";
import NotFound from './components/not-found';
import Home from './components/home';

import './App.css';

function App() {

  return (
    <React.Fragment>
      <main>
        <Switch>
          <Route path="/profile/:firstname/edit" component={EditProfile} />
          <Route path="/login" component={LoginForm} exact />
          <Route path="/register" component={RegisterForm} exact />
          <Route path="/logout" component={Logout} exact />
          <Route path="/not-found" component={NotFound} exact />
          <Route path="/home" component={Home} exact />
          <Redirect from="/" to="/login" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
