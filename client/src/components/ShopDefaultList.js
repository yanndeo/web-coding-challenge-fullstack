import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Component
import ShopItem from "./ShopItem";
import AlertNotification from "./layout/AlertNotification";
//Actions
import { _setAlert } from '../actions/alert';
import { _getDefaultShopList, _likeShop, _getMyPreferredShops } from '../actions/shop';



const ShopDefaultList = ({ _getDefaultShopList, _setAlert, location, shops, loading, _likeShop, status, isAutenthificated}) => {

  /**
   * Hook React 
   * Define lifecycle component() and
   */
  useEffect(()=>{

    //Define page's title
    document.title = `Default Page`;

    //Load default data shop list
    _getDefaultShopList();

    //Check if the user has been redirected after an unauthorized action
    let hasAttempt = location.attempt;
    if (hasAttempt) {
        _setAlert("Unauthorized : You must first be connected", "warning");
    }

  }, [ ]) //=> specify just for mount and unmount()



/**
 * Second hook to handle 
 * like/unlike/remove actions
 */
  useEffect(() => {

    if (status.msg !== null && status.status === 409) {
      _setAlert(status.msg, "dark");
    }
    if( status.status === 200){
      _setAlert("Success: This shop has been added in your favorites list", "success");

    }

  }, [status]); 



  console.log('Attempted', location.attempt)


  /**
   * Like a shop
   * if isAuthentificated: false => call _setAlert() 
   * else call _likeShop()
   */
  const handleLiked = async (e, id) => {
    e.preventDefault();
    console.log(id)

    if(isAutenthificated){
      _likeShop(id)

    }else{
      _setAlert('Unauthorized : You must first be connect', 'warning' )
    }
  };


  /**
   * Define () that return all shops list default
   * from store 
   */
  const renderShopItem =()=>{
      return shops.map( (shop,id) => {
         return <ShopItem 
                    key={id} 
                    shop={shop} 
                    handleLikeCallback={handleLiked} 
                />

      })
  };





  /**
   * Make a spinner for loading store is true
   */
  const renderSpinner = ()=>{
    return (<div style={{ marginLeft: 473,  }}>
              <img src="/images/spinner.gif" alt="spinner" />
            </div>)
  }


  
  return (

    <Fragment>

      <AlertNotification />

      <div className="site-section">
        <div className="container">
          <div className="row">

            <div className="row col-md-12 ">

               {!loading && shops.length > 0  ? renderShopItem() : renderSpinner() }
            
            </div>

            <div className="row" data-aos="fade-up">
              <div className="col-md-12 text-center">
                <div className="site-block-27">
                  <ul>
                    <li>
                      <Link to="#">&lt;</Link>
                    </li>
                    <li className="active">
                      <span>1</span>
                    </li>
                    <li>
                      <Link to="#">2</Link>
                    </li>
                    <li>
                      <Link to="#">3</Link>
                    </li>
                    <li>
                      <Link to="#">4</Link>
                    </li>
                    <li>
                      <Link to="#">5</Link>
                    </li>
                    <li>
                      <Link to="#">&gt;</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


ShopDefaultList.propTypes = {
  attempt: PropTypes.bool,
  _setAlert: PropTypes.func.isRequired,
  _getDefaultShopList: PropTypes.func.isRequired,
  __likeShop: PropTypes.func,
  shops: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  isAutenthificated: PropTypes.object,
};


// mappons le state dans les props du component
const mapStateToProps = state => ({
    shops: state.shop.default_list_shops,
    loading: state.shop.loading,
    isAutenthificated:  state.auth.isAutenthificated,
    status :  state.shop.status
});

export default connect(mapStateToProps, { _getDefaultShopList, _setAlert, _likeShop })(ShopDefaultList);
