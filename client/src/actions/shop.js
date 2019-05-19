import axios from 'axios';
import {
  GET_DEFAULT_LIST_SHOPS,
  GET_PREFERRED_SHOPS,
  GET_NEARBY_SHOPS,
  REMOVE_SHOPS_USER_RELATED,
  SUCCESS_OR_ERROR_SHOPS
} from "./types";
//Utils
import { API_URI } from '../utils/uri';
import configTokenInHeader from "../utils/configTokenInHeader";
import { configHeadersIfOrNotToken } from "../utils/configHeadersIfOrNotToken";

//Ohers actions




/**
 * Default shop list.
 * without criterias
 */
export const _getDefaultShopList = () => async dispatch => {

    try {
        const response = await axios.get(`${API_URI}/shops/default`);

        dispatch({
          type: GET_DEFAULT_LIST_SHOPS,
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
 * Like a shop
 */
export const _likeShop = (shopID) => async (dispatch, getState) =>{

    try {
        const response=  await axios.put(`${API_URI}/shops/like/${shopID}`, configHeadersIfOrNotToken(getState));

        console.log(response)
        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: response.data.msg, status:response.status }
        });
       // dispatch(_getMyPreferredShops()); //ici ou dans App?


    } catch (error) {
        console.log(error);

        dispatch({
            type: SUCCESS_OR_ERROR_SHOPS,
            payload: { msg: error.response.data.msg, status: error.response.status }
        });



    }

}