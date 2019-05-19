
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Component
import ShopItem from "./ShopItem";
import AlertNotification from "./layout/AlertNotification";
//Actions
import { _setAlert } from '../actions/alert';
import { _getMyPreferredShops } from "../actions/shop";



const ShopListPreferred = ({ shops, loading, _setAlert, _getMyPreferredShops,errors }) => {

    /**
     * Hook React 
     * Define lifecycle component() and
     */
    useEffect(() => {

        //Define page's title
        document.title = `Preferred Shop`;

        //Load default data shop list
        _getMyPreferredShops();

        console.log('mvmt')

      

    }, []) //=> specify just for mount and unmount()





    /**
     * Define () that return shops list nearby of user
     * from store 
     */
    const renderShopList = () => {
        return shops.map((shop, id) => {
            return <ShopItem 
                    key={id} 
                    shop={shop} 
                    preferred={true}
                     />

        })    
    };

    /**
     * Make a spinner for loading store is true
     */
    const renderSpinner = () => {
        return (<div style={{ marginLeft: 473, }}>
            <img src="/images/spinner.gif" alt="spinner" />
        </div>)
    }







    /**
     * Handle content 
     * if shop is empty or not
     * it loading is true or false
     * component required be connected
     */

    const renderContent = ()=>{

        if(!loading){

            if (shops === null ) {
                 return _setAlert(errors.msg, 'primary');

            }else{
                return renderShopList()
            }

        }else{
            renderSpinner()
        }
       
    }




    return (

        <Fragment>

            <AlertNotification />

            <div className="site-section">
                <div className="container">
                    <div className="row">

                        <div className="row col-md-12 ">
                            { renderContent() }
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
    shops: PropTypes.array,
    loading: PropTypes.bool,
    errors:PropTypes.object,
    //isAuthentificated: PropTypes.func.isRequired,
    

};


// mappons le state dans les props du component
const mapStateToProps = state => ({
  shops: state.shop.preferred_shops,
  loading: state.shop.loading,
  errors: state.shop.errors,
  sAuthentificated: state.auth.isAuthentificated, 
  status: state.shop.status
});

export default connect(mapStateToProps, { _getMyPreferredShops, _setAlert })(ShopListPreferred);
