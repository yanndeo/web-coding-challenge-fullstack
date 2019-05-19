import React, {useEffect, Fragment } from 'react'
import { connect } from "react-redux";
//Component
import ShopItem from './ShopItem';
import SubNavbar from './layout/SubNavbar';
//Actions
import { _loadUser } from '../actions/auth';


const ShopMainListUserConnected= ({}) => {

    useEffect(() => {
      _loadUser({});
    }, []);


    return (
       <Fragment>

                <div className="site-section">
                    <div className="container">



                        <div className="row">
                            <div className="row col-md-12 ">

                                All Shop Item when user  been connected
                        
                            </div>

                        </div>

                    </div>
                </div>
            </Fragment>
    );
}

export default connect(null, {_loadUser})(ShopMainListUserConnected)
