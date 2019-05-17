import React, { Component, Fragment } from 'react'
import ShopItem from './ShopItem';
import SubNavbar from './layout/SubNavbar';
import { Link } from 'react-router-dom';




class ShopMainListUserConnected extends Component {




    componentDidMount() {
        document.title = `Main Page`;

    }


    componentDidUpdate() {
        document.title = `Main Page`;
    } 

    render() {
        return (
            <Fragment>
                <SubNavbar />

                <div className="site-section">
                    <div className="container">



                        <div className="row">
                            <div className="row col-md-12 ">

                                <ShopItem />
                                <ShopItem />
                                <ShopItem />
                        
                            </div>

                        </div>

                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ShopMainListUserConnected;