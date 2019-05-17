import React, { Fragment} from 'react'
import { Link} from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Action: _xxYYYY
import { _setIsOpen } from "../../actions/modal";
import { _logout } from '../../actions/auth';



const Navbar = ({ auth: { isAuthentificated, loading } , _logout, _setIsOpen}) => {


    const guestLinks = (

         <ul>
            <li><Link to="/register">REGISTER</Link></li>

            <li><Link to="#" onClick={() => _setIsOpen()} >LOGIN</Link></li>

        </ul>
    );

    const authLinks = (

        <ul>
            <li><Link to="#" onClick={() => _logout()} >LOGOUT</Link></li>
            <li>
                <Link to="/favorites-shop" className="site-cart">
                    <span className="icon icon-heart"></span>
                    <span className="count">2</span>
                </Link>
            </li>
            <li className="d-inline-block d-md-none ml-md-0">
                <Link to="#" className="site-menu-toggle js-menu-toggle">
                    <span className="icon-menu"></span>
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
                                    <Link to="/" className="js-logo-clone">Mern Stack</Link>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                                <div className="site-top-icons">
                                    {!loading && (<Fragment> { isAuthentificated ? authLinks : guestLinks }</Fragment> )}
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
  auth: PropTypes.object.isRequired,     //piece of store
};



const mapStateToProp = state =>({
    auth :state.auth
})
export default connect(mapStateToProp, { _setIsOpen, _logout })(Navbar)
