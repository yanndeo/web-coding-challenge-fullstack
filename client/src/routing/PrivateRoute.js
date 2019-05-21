import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { _setAlert } from '../actions/alert';


/**
 * 
 * Define HOC component to handle private routes
 */
const PrivateRoute = ({
      component: Component,
      auth: { isAuthentificated, loading }, 
      ...rest }) => (


    <Route 
        {...rest} 
            render={ 
                props => !isAuthentificated && !loading
                 ?
                    (
                    <Redirect
                        back
                        to={{
                            pathname: '/default-page',
                            attempt: true  
                        }}
                    /> 
                    )
                 :
                    ( <Component {...props} /> ) 
                
                 }
     />


);



//Required auth 
PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  _setAlert: PropTypes.func.isRequired,
};

//Check auth from store redux
const mapStateToProps = (state) => ({
    auth: state.auth 
})
export default connect(mapStateToProps,{_setAlert} )(PrivateRoute);