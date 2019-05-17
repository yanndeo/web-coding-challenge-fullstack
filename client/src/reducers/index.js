import { combineReducers } from "redux";

import alertReducer from "./alertReducer"; 
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";


export default combineReducers({
    
  modal: modalReducer,
  alert: alertReducer,
  auth: authReducer
});