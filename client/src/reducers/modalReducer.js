import { TOGGLE_MODAL } from "../actions/types";

const initialState = { isOpen:false}

export default function (state = initialState, action) {

    let nextState;
    switch (action.type) {

        case TOGGLE_MODAL:
            return nextState = {
                ...state,
                isOpen: !state.isOpen }
        default:
            return nextState || state;


    }


}


