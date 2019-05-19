
//Setup config/headers and token
export const configHeadersIfOrNotToken = (getState) => {

    //Get token from localStorage
    const token = getState().auth.token;

    //Headers 
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //If token , add to headers
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config;
}