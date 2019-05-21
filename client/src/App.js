import React,{ Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Utils
import configTokenInHeader from "./utils/configTokenInHeader";
import ErrorBoundary from "./utils/ErrorBoundary";
//Routing
import Routes from './routing/routes';
//Component
import LoginModal from './components/authentification/LoginModal';
//Actions
import { _loadUser } from "./actions/auth";


if (localStorage.token) {
  configTokenInHeader(localStorage.token);
}



const App = ({_loadUser}) => {


  
  useEffect(()=>{
    
    _loadUser();

  },[]); //[]=> exécuter un effet une seule fois au montage puis au démontage.
 
 
  return (

    <ErrorBoundary>
        <Router>
          <Fragment> 

            <Switch>
              <Route component={Routes} />
            </Switch>

            <LoginModal />

          </Fragment>
        </Router>
    </ErrorBoundary>

  );
}

App.propTypes = {
  _loadUser: PropTypes.func.isRequired, //action
};

//export default App
export default connect(null, { _loadUser })(App);
