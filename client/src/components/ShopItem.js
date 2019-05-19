import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Actions
import { _setAlert } from '../actions/alert';
import { _likeShop } from '../actions/shop';



const ShopItem = (props) => {

    const { shop, preferred, handleLikeCallback } = props


    

    const renderButton = ()=>{
        if(preferred){
            //& nbsp;& nbsp;
            return (
                <Fragment>
                    <button type="button" className="btn btn-danger btn-sm" >Remove</button> 
                     &nbsp;&nbsp;
                </Fragment>
             )

        }else{
            return( 
                <Fragment>
                    <button type="button" className="btn btn-danger btn-sm" >Dislike</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => handleLikeCallback(e, shop._id)} >Like</button>
                </Fragment>
            )
        }
    }


    return (
        <div className="col-sm-6 col-lg-3 mb-3" data-aos="fade-up">

            <div className="block-4 text-center border">

                <figure className="block-4-image">
                    <Link to="#">
                        <img src={`images/${shop.imageURL}`} alt="placeholder" className="img-fluid" />
                    </Link>
                </figure>

                <div className="block-4-text p-4">
                    <h6><a href="shop-single.html">{shop.name}</a></h6>
                    <br/>
                    {renderButton()}
                   
                </div>
            </div>
        </div>
    )
}
ShopItem.propTypes = {

  handleLikeCallback:PropTypes.func,
  preferred:  PropTypes.bool,
};



export default connect()(ShopItem);