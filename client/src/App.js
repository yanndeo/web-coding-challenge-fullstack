import React,{ Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from './store';
//Component
import Navbar from './components/layout/Navbar';
import ShopList from './components/ShopList';
import ShopListPreferred from './components/ShopListPreferred';
import Register from "./components/authentification/Register";
import LoginModal from './components/authentification/LoginModal';


const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        {/* <Alert /> */}
        <section className="container">
          <Navbar />

          <Switch>
            <Route exact path="/" component={ShopList} />
            <Route exact path="/favorites-shop" component={ShopListPreferred} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={LoginModal} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
);
  


export default App;
