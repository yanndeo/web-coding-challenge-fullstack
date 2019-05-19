import React from 'react';
import {  Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Component
import Navbar from '../components/layout/Navbar';
import ShopDefaultList from "../components/ShopDefaultList";
import ShopListPreferred from '../components/ShopListPreferred';
import Register from "../components/authentification/Register";
import NotFound from '../components/layout/NotFound';
import ShopMainListUserConnected from '../components/ShopMainListUserConnected';
import PrivateRoute from './PrivateRoute';
import SubNavbar from '../components/layout/SubNavbar';





const Routes = () => {


    return (

        <section className="container">

            <Navbar />
            <SubNavbar/>  
            <Switch>
                <Route exact path="/" component={ShopDefaultList} />
                <Route exact path="/register" component={Register} />
                {/* <Route exact path="/login" component={LoginModal} /> */}

                {/* <PrivateRoute exact path="/favorites-shop" component={ShopListPreferred} /> */}
                <Route exact path="/favorites-shop" component={ShopListPreferred} />
                <Route exact path="/mainpage" component={ShopMainListUserConnected} />
                {/* <PrivateRoute exact path="/mainpage" component={ShopMainListUserConnected} /> */}

                <Route component={NotFound} />

            </Switch>
            
        </section>

    );
}

export default Routes;
