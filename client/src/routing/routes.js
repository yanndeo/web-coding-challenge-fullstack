import React from 'react';
import {  Route, Switch } from "react-router-dom";
//Component
import Navbar from '../components/layout/Navbar';
import ShopList from "../components/shop/ShopList";
import ShopListPreferred from '../components/shop/ShopListPreferred';
import Register from "../components/authentification/Register";
import NotFound from '../components/layout/NotFound';
import PrivateRoute from './PrivateRoute';
import SubNavbar from '../components/layout/SubNavbar';






const Routes = () => {


    return (
      <section className="container">

        <Navbar />
        
        <SubNavbar />

        <Switch>
          <Route exact path="/" component={ShopList} />
          <Route exact path="/register" component={Register} />

           <Route exact path="/default-page" component={ShopList} /> 
          <PrivateRoute exact path="/mainpage" component={ShopList} /> 
          <PrivateRoute exact path="/favorites-shop" component={ShopListPreferred} />


           {/*<Route exact path="/favorites-shop" component={ShopListPreferred} /> 
            <Route exact path="/mainpage" component={ShopList} /> */}

          <Route component={NotFound} />
        </Switch>
      </section>
    );
}

export default Routes;
