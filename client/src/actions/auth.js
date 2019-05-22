import axios from "axios";
//Types
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from "./types";
//Others actions
import { _setAlert } from "./alert";

//Utils
import { API_URI } from "../utils/constantsValues";
import configTokenInHeader from "../utils/configTokenInHeader";




/**
 * LOAD USER and update state with his informations
 */
export const _loadUser = () => async dispatch =>{

    if (localStorage.token){
        configTokenInHeader(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
           return dispatch({
                type: USER_LOADED,
                payload:res.data
            });

    } catch (error) {
       // console.log(error)
        dispatch({
            type: AUTH_ERROR
        })
    }

};








/**
 * REGISTER USER 
 */
export const _register = ({ name, email, password  })=> async dispatch => {
   
    //1-Define it explicitly (like in postman environment)
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //2-Convert the JavaScript object to a JSON object
    const userData = JSON.stringify({name, email, password});

    try {
        //3-Send request to node server 
        const response = await axios.post(`${API_URI}/register`, userData, config );

      
        //4-Dispatch action
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data  //srv return token
        });

        //5- load user connected
       await _loadUser();

        dispatch(_setAlert('You are connected', 'success'));
       

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            for (const err of errors) {
                dispatch( _setAlert( err.msg, 'danger'))  ; //We call the action directly
            }
        }

        dispatch({
            type:REGISTER_FAIL
            //we don't need a payload
        })
        
    }


};











/**
 * LOGIN USER
 */
export const _loginUser = ( email, password ) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const userData = JSON.stringify({ email, password });

    try {
        const response =  await axios.post(`${API_URI}/login`, userData, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload : response.data
        });
        dispatch(_loadUser());

        dispatch(_setAlert('You are connected', 'success'));


        }catch(error){

        const errors = error.response.data.errors;
        if (errors) {
            for (const err of errors) {
                dispatch(_setAlert(err.msg, 'danger')); 
            }
        } 

        dispatch({ type: LOGIN_FAIL })

    }


};









/**
 * LOGOUT 
 */

export const _logout = () => dispatch => {

    dispatch({ type: LOGOUT })

};




