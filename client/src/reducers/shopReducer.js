import {
  GET_DEFAULT_SHOPS_LIST,
  GET_MAIN_SHOPS_LIST,
  GET_PREFERRED_SHOPS,
  GET_NEARBY_SHOPS,
  REMOVE_SHOPS_USER_RELATED,
  SUCCESS_OR_ERROR_SHOPS
} from "../actions/types";

const initialState = {
  default_shops_list: [],
    main_shops_list:[],
    preferred_shops: [],
    nearby_shops: [], 
    loading:true,
    status: {}
};

export default function (state = initialState, action) {

    let nextState;

    const { type, payload } = action;

    switch (type) {

      case GET_DEFAULT_SHOPS_LIST:
        return nextState = {
          ...state,
          loading: false,
          default_shops_list: payload,
          status: {}
        };

      case GET_MAIN_SHOPS_LIST:
        return nextState = {
          ...state,
          loading: false,
          main_shops_list: payload,
          status: {}
        };

      case GET_NEARBY_SHOPS:
        return nextState = {
          ...state,
          loading: false,
          nearby_shops: payload,
          status:{}
        };

      case GET_PREFERRED_SHOPS:
        return nextState = {
          ...state,
          loading: false,
          preferred_shops: payload,
          status:{}
        };

     case REMOVE_SHOPS_USER_RELATED:
        return nextState = {
          ...state,
          preferred_shops: null,
          nearby_shops: null,
          loading: false,
          status: {}
        };

        case SUCCESS_OR_ERROR_SHOPS:
        return nextState = {
            ...state,
            status:payload,
            loading:false
        };
        
      default:
        return nextState || state;
    }


}


