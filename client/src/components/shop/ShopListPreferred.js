
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Component
import ShopItem from "./ShopItem";
import AlertNotification from "../layout/AlertNotification";
//Actions
import { _setAlert } from '../../actions/alert';
import { _getMyPreferredShops, _removeShop } from "../../actions/shop";
import SpinnerLoader from '../layout/SpinnerLoader';


/**
 * ShopListPreferred Component
 * display favorites shops of user.
 * component child of Private Route
 */

const ShopListPreferred = ({ shops, loading, _setAlert, _getMyPreferredShops, _removeShop, status, errors }) => {

    /**
     * Hook React 
     * Define lifecycle component() 
     */
    useEffect(() => {

        //Define page's title
        document.title = `Preferred Shop`;

        //Load default data shop list
         _getMyPreferredShops();

    }, []) 



    /**
     * Second hook to handle 
     * remove actions
     */
    useEffect(() => {

        if (status.status === 200) {
            _setAlert(status.msg, "success");

        }

        if (status.msg !== null && status.status === 400) {
            _setAlert(status.msg, "dark");
        }

        if (status.msg !== null && status.status === 404) {
            _setAlert(status.msg, "primary");

        }
        if (status.msg !== null && status.status === 500 ) {
            _setAlert('Echec', "danger");

        }

    }, [status,_setAlert]); 



    /**
    * Remove A SHOP from prefrerred list
    * Call action redux
    */
    const handleRemoveShopFromPreferredList = (e, id) => {
        e.preventDefault();
        _removeShop(id);
    };

    /**
     * Define () that return preferred shops list of user
     * from store 
     */
    const renderShopList = () => {

        if(shops === null){
             _setAlert(errors.msg, 'primary');

        }else{
            return shops.map((shop, id) => {
                return <ShopItem
                            key={id}
                            shop={shop}
                            preferred={true}   //To change appearance of the buttons
                            handleRemoveCallback={handleRemoveShopFromPreferredList}
                         />

            })  
        }
       
    };




    return (

        <Fragment>

            <AlertNotification />

            <div className="site-section">
                <div className="container">
                    <div className="row">

                        <div className="row col-md-12 ">

                            { !loading ? renderShopList() : <SpinnerLoader/> }

                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    );
}


ShopListPreferred.propTypes = {
    _setAlert: PropTypes.func.isRequired,
    _getMyPreferredShops: PropTypes.func.isRequired,
    _removeShop: PropTypes.func,
    shops: PropTypes.array,
    loading: PropTypes.bool,
    errors:PropTypes.object,
    
};


// mappons le state dans les props du component
const mapStateToProps = state => ({
  shops: state.shop.preferred_shops,
  loading: state.shop.loading,
  errors: state.shop.errors,
  //isAuthentificated: state.auth.isAuthentificated, //user already authentificated with PrivateRoute
  status: state.shop.status
});

export default connect(mapStateToProps, { _getMyPreferredShops, _setAlert,_removeShop })(ShopListPreferred);
