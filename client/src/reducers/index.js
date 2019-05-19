import { combineReducers } from "redux";

import alertReducer from "./alertReducer"; 
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import shopReducer from "./shopReducer";



export default combineReducers({
    
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  shop: shopReducer
});