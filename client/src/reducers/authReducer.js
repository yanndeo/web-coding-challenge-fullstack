import { 
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    LOGOUT,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),  
    isAuthentificated: null,        //Mare sure if user if connected
    loading: true,               //Make sure if user data is loaded or not
    user: null                  //Keep user data

};

export default function (state = initialState, action) {

    let nextState ; 

    const { type, payload } = action;

    switch (type) {


        case USER_LOADED:
            return nextState = {
                ...state,
                isAuthentificated: true,
                loading: false,
                user: payload
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token); //add token if user signup
            return nextState = {
                    ...state ,  
                    ...payload,                      //token returned by server
                    isAuthentificated: true,
                    loading: false
                };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token'); //remove token
            return nextState = {
                ...state,
                token: null,                            
                isAuthentificated: false,
                loading: false
            };    

        default:
            return nextState || state;

    }


}