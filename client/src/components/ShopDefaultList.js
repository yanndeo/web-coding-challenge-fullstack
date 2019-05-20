import React, { Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
//Component
import ShopItem from "./ShopItem";
import AlertNotification from "./layout/AlertNotification";
import SpinnerLoader from "./layout/SpinnerLoader";


//Actions
import { _setAlert } from '../actions/alert';
import { _getDefaultShopList, _likeShop, _unLikeShop,_getMainShopList } from '../actions/shop';


const ShopDefaultList = ({ _getDefaultShopList, _getMainShopList, _setAlert, location, default_shops, main_shops, loading, _likeShop, _unLikeShop, status, isAutenthificated}) => {

  /**
   * Hook React 
   * Define lifecycle component() and
   */
  useEffect(()=>{

    //Define page's title
    if (isAutenthificated ? document.title = `Main Page` : document.title = `Default Page`);

    //Load default data shop list
    _getDefaultShopList();

    _getMainShopList();    

    //Check if the user has been redirected after an unauthorized action
    let hasAttempt = location.attempt;
    if (hasAttempt) {
        _setAlert("Unauthorized : You must first be connected", "warning");
    }

  }, [ ]) //=> specify just for mount and unmount()




  /**
 * Second hook to handle 
 * like/unlike actions
 */
  useEffect(() => {

    if( status.status === 200){
      _setAlert("Success: successful operation... ", "success");

    }

    if (status.msg !== null && status.status === 409) {
      _setAlert(status.msg, "dark");
    }

    if(status.msg !== null && status.status === 404 ){
      _setAlert(status.msg, "danger");

    }
    if (status.msg !== null && status.status === 500) {
      _setAlert('Echec', "danger");

    }

  }, [status]); 



  console.log('Attempted', location.attempt)


  /**
   * LIKE A SHOP
   * if isAuthentificated: false => call _setAlert() 
   * else call _likeShop()
   */
  const handleLiked = (e, id) => {
    e.preventDefault();
    console.log(id)

    if(!isAutenthificated){
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
    e.preventDefault();
    console.log(id)

    if (!isAutenthificated) {
      _unLikeShop(id)
    } else {
      _setAlert('Unauthorized : You must first be connect', 'warning')
    }
  };




  /**
   * Define () that return 
   * all shops list default from store OR
   * all shops list without the shops already liked
   */
  const renderShopItem =()=>{

    //if no connected show him default list .
    if(isAutenthificated){

      return default_shops.map((shop, id) => {
        return <ShopItem
                  key={id}
                  shop={shop}
                  handleLikeCallback={handleLiked}
                  handleUnLikeCallback={handleUnLiked}
                />
      })
      //if user is connected show him main list .
    }else{

      return main_shops.map((shop, id) => {
        return <ShopItem
                  key={id}
                  shop={shop}
                  handleLikeCallback={handleLiked}
                  handleUnLikeCallback={handleUnLiked}
                />

      })
    }
      
  };



  
  return (

    <Fragment>

      <AlertNotification />

      <div className="site-section">
        <div className="container">
          <h1> Tittre</h1>
          <div className="row">
    
            <div className="row col-md-12 ">
              {!loading && (default_shops.length || main_shops.length > 0) ?  renderShopItem() : <SpinnerLoader/> }
            
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
  _getMainShopList: PropTypes.func,
  _likeShop: PropTypes.func,
  _unLikeShop: PropTypes.func,

  default_shops: PropTypes.array.isRequired,
  main_shops: PropTypes.array.isRequired,
  loading: PropTypes.bool,
  isAutenthificated: PropTypes.object
};


// mappons le state dans les props du component
const mapStateToProps = state => ({

    default_shops: state.shop.default_shops_list,
    main_shops: state.shop.main_shops_list,
    loading: state.shop.loading,
    isAutenthificated:  state.auth.isAutenthificated,
    status :  state.shop.status

});

export default connect(mapStateToProps, { _getDefaultShopList ,_getMainShopList, _setAlert, _likeShop, _unLikeShop })(ShopDefaultList);
