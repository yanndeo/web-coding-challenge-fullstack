
import React, { Component, Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Utils
import configTokenInHeader from "./utils/configTokenInHeader";
import ErrorBoundary from "./utils/ErrorBoundary";
//Routing
import Routes from './routing/routes';
//Component
import LoginModal from './components/authentification/LoginModal';
//Actions
import { _loadUser } from "./actions/auth";
import { Provider } from "react-redux";

import store from "./store/index";

if (localStorage.token) {
  configTokenInHeader(localStorage.token);
}

class App extends Component {

  
  componentDidMount(){
      store.dispatch(_loadUser())

  }



  render () {
    return (
      <Provider store={store}>

      <ErrorBoundary>
        <Router >
          <Fragment>
            <Switch>
              <Route component={Routes} />
            </Switch>
            <LoginModal />
          </Fragment>
        </Router>
      </ErrorBoundary>
      </Provider> 

    )
  }

  
}


export default App

