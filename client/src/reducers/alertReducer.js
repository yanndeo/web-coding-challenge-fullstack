import {
    SET_ALERT,
    REMOVE_ALERT
} from "../actions/types";

const initialState = []; 

export default function (state = initialState, action) {

    let nextState;

    const { type, payload } = action;  

    switch (type) {

        case SET_ALERT:
            return nextState = [...state, payload];

        case REMOVE_ALERT:
            return nextState = state.filter(alert => alert.id !== payload) //this payload here is ID

        default:
            return nextState || state;


    }


}


