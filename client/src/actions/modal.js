import { TOGGLE_MODAL } from "./types";


export const _setIsOpen = () => {

    return function (dispatch) {

        dispatch({ 
            type: TOGGLE_MODAL
        })

    }
}