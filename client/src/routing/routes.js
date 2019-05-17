import React from 'react';
import {  Route, Switch } from "react-router-dom";
//Component
import Navbar from '../components/layout/Navbar';
import ShopDefaultList from "../components/ShopDefaultList";
import ShopListPreferred from '../components/ShopListPreferred';
import Register from "../components/authentification/Register";
import NotFound from '../components/layout/NotFound';
import ShopMainListUserConnected from '../components/ShopMainListUserConnected';
import PrivateRoute from './PrivateRoute';





const Routes = () => {


    return (

        <section className="container">

            <Navbar />

            <Switch>
                <Route exact path="/" component={ShopDefaultList} />
                <Route exact path="/register" component={Register} />
                {/* <Route exact path="/login" component={LoginModal} /> */}

                <PrivateRoute exact path="/favorites-shop" component={ShopListPreferred} />
                <PrivateRoute exact path="/mainpage" component={ShopMainListUserConnected} />

                <Route component={NotFound} />

            </Switch>
            
        </section>

    );
}

export default Routes;
