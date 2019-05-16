import React,{Fragment} from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Fragment>

        <header className="site-navbar" role="banner">
            <div className="site-navbar-top">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                         
                        </div>

                            <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                                <div className="site-logo">
                                    <Link to="/" className="js-logo-clone">Mern Stack</Link>
                                </div>
                            </div>

                            <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                                <div className="site-top-icons">

                                    <ul>
                                        <li><Link to="/register">REGISTER</Link></li>
                                        <li><Link to="/">LOGIN</Link></li>
                                        <li>
                                            <Link to="/favorites-shop" className="site-cart">
                                                <span className="icon icon-heart"></span>
                                                <span className="count">2</span>
                                            </Link>
                                        </li>
                                        <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu"></span></a></li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                </div> 
    </header>

   

 </Fragment>

    )
}

export default Navbar