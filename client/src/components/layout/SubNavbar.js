import React from 'react'
import { Link } from "react-router-dom";

const SubNavbar = () => {

    return (

        <div className="bg-light py-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 mb-0 " >

                        <span className="text-left">
                            <Link to="/mainpage">Nearby Shops</Link> 
                            
                                <span className="mx-2 mb-0">/</span> 

                            <Link to="/favorites-shop" className="text-black">My preferred Shops</Link> 
                        </span>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubNavbar