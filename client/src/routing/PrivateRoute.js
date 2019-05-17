import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { _setAlert } from '../actions/alert';



const PrivateRoute = ({ component: Component, auth: { isAuthentificated, loading} , ...rest }) => (

    <Route {...rest} render={ 
            props => !isAuthentificated && !loading
                 ?
                    (
                    <Redirect to='/' /> 
                    )
                 :
                    ( <Component {...props} /> ) 
                
                 } />
)

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  _setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth 
})
export default connect(mapStateToProps,{_setAlert} )(PrivateRoute);