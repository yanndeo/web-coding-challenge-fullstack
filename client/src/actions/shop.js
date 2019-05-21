import axios from 'axios';
import {
  GET_DEFAULT_SHOPS_LIST,
  GET_MAIN_SHOPS_LIST,
  GET_PREFERRED_SHOPS,
  //REMOVE_DISLIKE_OF_USER,
  SUCCESS_OR_ERROR_SHOPS
} from "./types";
//Utils
import { API_URI, TIME_OUT } from '../utils/constantsValues';
import configTokenInHeader from "../utils/configTokenInHeader";




/**
 * Default shop list.
 * without criterias
 */
export const _getDefaultShopList = () => async dispatch => {

    try {
        const response = await axios.get(`${API_URI}/shops/default`);

        dispatch({
            type: GET_DEFAULT_SHOPS_LIST,
          payload: response.data
        });  

    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.statusText, status: error.response.status }
        })
    }
};






/**
 * Main Shops List
 * List without the shops already liked.
 * NB:"liked shops shouldn’t be displayed on the main page"
 */
export const _getMainShopList = () => async dispatch => {

    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   
    }

    try {
        const response = await axios.get(`${API_URI}/shops`);

        dispatch({
            type: GET_MAIN_SHOPS_LIST,
            payload: response.data
        });

    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });

    }

};







/**
 * Get preferred shop of user connected
 * user must connected
 */
export const _getMyPreferredShops = () => async dispatch => {

    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   //set header request
    }

    try {
        const response = await axios.get(`${API_URI}/shops/preferred`);

        dispatch({
            type:GET_PREFERRED_SHOPS,
            payload: response.data
        });

    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg , status: error.response.status }
        });

    }

};

/**
 * Remove 'dislike' of user.
 * NB: " it won’t be displayed within “Nearby Shops” list during the next 2 hours"
 * when dislike it remove, shop reappears in main list of user
 */
export const _removeDislikeUser=(shopID) =>  async dispatch =>{
    

    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   
    }

    try {
        await axios.put(`${API_URI}/shops/remove/dislike/${shopID}`);

        dispatch(_getMainShopList()) //updated list of all components connected in this state redux


    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });

    };
    
}





/**
 * Like a shop
 */
export const _likeShop = (shopID) => async (dispatch) =>{

    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   //set header request
    }

    try {
        const response=  await axios.put(`${API_URI}/shops/like/${shopID}`);

        //console.log(response)
        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: response.data.msg, status:response.status }
        });

        //updated all components connected to this state of store
          dispatch(_getMyPreferredShops()) ;          
        
          dispatch(_getMainShopList());

    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });

    }

};



/**
 * UnLike a shop
 * add user inside table dislikes shop
 */
export const _unLikeShop = (shopID) => async (dispatch) => {

    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   //set header request
    }

    try {
        const response = await axios.put(`${API_URI}/shops/dislike/${shopID}`);

        console.log(response)
        dispatch({                                      //This dislike action hide shop from main list and add user in dislikes[] of shop model
            type: SUCCESS_OR_ERROR_SHOPS,         
            payload: { msg: response.data.msg, status: response.status }
        });

        dispatch(_getMainShopList())                   //update new main list without shop disliked

        setTimeout(() => 
            dispatch(_removeDislikeUser(shopID))     //After 2h this action is called and remode user to inside dislikes[], to reappears shops in main list.
        , TIME_OUT)
      
    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });



    }

};




/**
 * Remove Shop from favorite list.
 */
export const _removeShop = (shopID) => async (dispatch) => {


    if (localStorage.token) {
        configTokenInHeader(localStorage.token);   //set header request
    }


    try {
        const response = await axios.delete(`${API_URI}/shops/preferred/${shopID}`);

        console.log(response)

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: response.data.msg, status: response.status }
        });

        dispatch(_getMyPreferredShops()) 

    } catch (error) {

        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });



    }

}

