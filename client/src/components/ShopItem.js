import React from 'react'
import { Link } from 'react-router-dom';
const ShopItem = () => {
    return (
        <div className="col-sm-6 col-lg-3 mb-3" data-aos="fade-up">

            <div className="block-4 text-center border">

                <figure className="block-4-image">
                    <Link to="#">
                        <img src="images/cloth_1.jpg" alt="placeholder" className="img-fluid" />
                    </Link>
                </figure>

                <div className="block-4-text p-4">
                    <h3><a href="shop-single.html">Tank Top</a></h3>
                    <button type="button" className="btn btn-danger btn-sm" >Dislike</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-primary btn-sm">Like</button>
                </div>
            </div>
        </div>
    )
}

export default ShopItem