import React, { Fragment} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";




const ShopItem = ({ shop, preferred, isAuthentificated, handleLikeCallback, handleUnLikeCallback, handleRemoveCallback }) => {




    const renderButton = ()=>{

        if (isAuthentificated){

            if (preferred) {
                
                return (
                    <Fragment>
                        <button type="button" className="btn btn-danger btn-sm" onClick={(e) => handleRemoveCallback(e, shop._id)} > Remove</button>&nbsp;&nbsp;
                    </Fragment>
                )

            } else {
                return (
                    <Fragment>
                        <button type="button" className="btn btn-danger btn-sm" onClick={(e) => handleUnLikeCallback(e, shop._id)} >Dislike</button>&nbsp;&nbsp;
                        <button type="button" className="btn btn-primary btn-sm" onClick={(e) => handleLikeCallback(e, shop._id)} >Like</button>
                    </Fragment>
                )
            }

        }else{

            return (
                <Fragment>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => handleUnLikeCallback(e, shop._id)} >Dislike</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-secondary btn-sm" onClick={(e) => handleLikeCallback(e, shop._id)} >Like</button>
                </Fragment>
            )
        }
            
    };




    return (
        <div className="col-sm-6 col-lg-3 mb-3 " data-aos="fade-up"  >

            <div className="block-4 text-center border">

                <figure className="block-4-image">
                    <Link to="#">
                        <img src={`images/${shop.imageURL}`} alt="placeholder" className="img-fluid" />
                    </Link>
                </figure>

                <div className="block-4-text p-4">
                    <h6><Link to="#">{shop.name}</Link></h6>
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
  isAuthentificated: PropTypes.bool,
};

// mappons le state dans les props du component
const mapStateToProps = state => ({
  isAuthentificated: state.auth.isAuthentificated
});

export default connect(mapStateToProps, {})(ShopItem);