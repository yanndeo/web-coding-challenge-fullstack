import React, { Fragment, useEffect} from 'react'
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Component
import ShopItem from "./ShopItem";
import AlertNotification from "../layout/AlertNotification";
import SpinnerLoader from "../layout/SpinnerLoader";
//Actions
import { _setAlert } from '../../actions/alert';
import { _getDefaultShopList, _likeShop, _unLikeShop,_getMainShopList } from '../../actions/shop'


/**
 * ShopList Component:
 * same Component for default-shop and main-shop
 * depending on whether the user is connected or not
 */

const ShopList = ({ _getDefaultShopList, _getMainShopList, _setAlert, location, default_shops, main_shops, loading, _likeShop, _unLikeShop, status, isAuthentificated }) => {


  /**
   * Hook React 
   * Define lifecycle component() and
   */
  useEffect(()=>{

    //Define page's title
    if (isAuthentificated ? document.title = `Main Page` : document.title = `Default Page`);

    //Load data shop list
    _getDefaultShopList();

    _getMainShopList();    

    //Check if the user has been redirected after an unauthorized action
    let hasAttempt = location.attempt;
    if (hasAttempt) {
        _setAlert("Unauthorized : You must first be connected", "warning");
    }

  }, [ ]) 




  /**
 * Second hook to handle 
 * like/unlike actions
 */
  useEffect(() => {

    //like or dislike
    if( status.status === 200){
      _setAlert("Success: successful operation... ", "success");
      
    }
    //Shop already like or dislike
    if (status.msg !== null && status.status === 409) {
      _setAlert(status.msg, "dark");
    }
    //shop not exist
    if(status.msg !== null && status.status === 404 ){
      _setAlert(status.msg, "danger");

    }
    //Server error
    if (status.msg !== null && status.status === 500) {
      _setAlert('Echec', "danger");

    }

  }, [status, _setAlert]); 



  /**
   * LIKE A SHOP
   * if isAuthentificated: false => call _setAlert() 
   * else call _likeShop()
   */
  const handleLiked = (e, id) => {
   // e.preventDefault();
    console.log(id)

    if (isAuthentificated){
      _likeShop(id)

    }else{
      _setAlert('Unauthorized : You must first be connect', 'warning' )
    }

  };



  /**
   * UNLIKE A SHOP
   * if isAuthentificated: false => call _setAlert() 
   * else call _unlikeShop()
   */
  const handleUnLiked =  (e, id) => {
    //e.preventDefault();
    console.log(id)

    if (isAuthentificated) {
      _unLikeShop(id)

    } else {
      _setAlert('Unauthorized : You must first be connect', 'warning')
    }
  };



   /**
    * Define shop variable
    * And value assignment
    */
  let shops = [];
  if (isAuthentificated ? (shops = main_shops) : (shops = default_shops));



  /**
   * Define () that return 
   * all shops list default from store OR
   * all shops list without the shops already liked
   */
  const renderShopItem =()=>{

      return shops.map((shop, id) => {
        return <ShopItem
                  key={id}
                  shop={shop}
                  handleLikeCallback={handleLiked}
                  handleUnLikeCallback={handleUnLiked}
                />
      })
      
  };



  
  return (

    <Fragment>
      <br/>
      <AlertNotification />

      <div className="site-section">
        <div className="container">
          <div className="row">
    
            <div className="row col-md-12 ">
              
                { !loading && shops.length > 0 ?  renderShopItem() : <SpinnerLoader/> }
            
            </div>
          </div>
        </div>
      </div>

    </Fragment>
  );
}


ShopList.propTypes = {
  attempt: PropTypes.bool,

  _setAlert: PropTypes.func.isRequired,
  _getDefaultShopList: PropTypes.func.isRequired,
  _getMainShopList: PropTypes.func,
  _likeShop: PropTypes.func,
  _unLikeShop: PropTypes.func,

  default_shops: PropTypes.array.isRequired,
  main_shops: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  isAuthentificated: PropTypes.bool
};


// mappons le state dans les props du component
const mapStateToProps = state => ({

    default_shops: state.shop.default_shops_list,
    main_shops: state.shop.main_shops_list,
    loading: state.shop.loading,
    isAuthentificated:  state.auth.isAuthentificated,
    status :  state.shop.status

});

export default connect(mapStateToProps, { _getDefaultShopList, _getMainShopList, _setAlert, _likeShop, _unLikeShop })(ShopList);
