import React, { Fragment, useEffect } from "react";
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Action: _xxYYYY
import { _setIsOpen } from "../../actions/modal";
import { _logout } from '../../actions/auth';
import { _getMyPreferredShops } from "../../actions/shop";

const Navbar = ({ auth: { isAuthentificated, loading, user }, _logout, _setIsOpen, shops_liked, _getMyPreferredShops,  }) => {

    
    /**
     * Hook React
     * Init shop_list length
     */
    //eslint-enable no-alert, no-console 

    useEffect(() => {

      _getMyPreferredShops(); 

    }, [_getMyPreferredShops]);





    /**
     * Appearance of menu 
     * if user is connected or not.
     */
    const guestLinks = (
      <ul>
        <li>
          <Link to="/register">REGISTER</Link>
        </li>
        <li>
          <Link to="#" onClick={() => _setIsOpen()}>
            LOGIN
          </Link>
        </li>

   
      </ul>
    );

    const authLinks = (

        <ul>
            <li><Link to="#">{!user ? null : user.name  }</Link></li>
            <li><Link to="#" onClick={ () => _logout() } >LOGOUT</Link></li>
            <li>
                <Link to="/favorites-shop" className="site-cart">
                    <span className="icon icon-heart"></span>
                    <span className="count"> {shops_liked.length} </span>
                </Link>
            </li>

          
        </ul>

    );






    return (
        <Fragment>

        <header className="site-navbar" role="banner">
            <div className="site-navbar-top">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left"></div>

                            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                                <div className="site-logo">
                                    <Link to="/default-page" className="js-logo-clone">Mern Stack</Link>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                                <div className="site-top-icons">
                                    
                                    {/* false && true  ?  name/logout : register/login */}
                                    {!loading && isAuthentificated ? authLinks : guestLinks }
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
    </header>

 </Fragment>

    )
}

//PropType  
Navbar.propTypes = {
  _setIsOpen: PropTypes.func.isRequired,
  _logout: PropTypes.func.isRequired,
  _getMyPreferredShops: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,     //piece of store
  shops_liked: PropTypes.array,

};



const mapStateToProp = state => ({
  auth: state.auth,
  shops_liked: state.shop.preferred_shops,
});
export default connect(mapStateToProp, { _setIsOpen, _logout, _getMyPreferredShops })(Navbar)
