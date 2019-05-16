import React, { Component ,Fragment} from 'react'
import ShopItem from './ShopItem';
import SubNavbar from './layout/SubNavbar';
import { Link } from "react-router-dom";


class ShopListPreferred extends Component {

    
    render() {
        return (
            <Fragment>

            <SubNavbar/>
            <div className="site-section">
                <div className="container">
                <h4> ___Mes magasins favoris ____</h4>
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

export default ShopListPreferred;