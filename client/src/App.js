import React,{ Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store/index';
//Component
import LoginModal from './components/authentification/LoginModal';
//Actions
import { _loadUser } from "./actions/auth";
//Utils
import configTokenInHeader from "./utils/configTokenInHeader";
import ErrorBoundary from "./utils/ErrorBoundary";
//Routing
import Routes from './routing/routes';


if (localStorage.token) {
  configTokenInHeader(localStorage.token);

}

const App = () => {


   // Hook react : componentDidUpdate/componentDidUpdate/componentWillUnmount
  useEffect(()=>{
    store.dispatch(_loadUser());

  },[] ); //[]=> exécuter un effet une seule fois au montage puis au démontage.

 

  return (
    <ErrorBoundary>

      <Provider store={store}>
        <Router>
          <Fragment>  

            <Switch>
              <Route component={Routes} />
            </Switch>
            
            <LoginModal />

          </Fragment>
        </Router>
      </Provider>

    </ErrorBoundary>
  );
}



export default App;
