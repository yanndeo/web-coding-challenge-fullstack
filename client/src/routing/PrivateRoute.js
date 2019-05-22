import React from 'react'
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";


/**
 * Define HOC component to handle private routes
 */
const PrivateRoute = ({
      component: Component,
      isAuthentificated,loading, 
      ...rest }) => (
    <Route 
        {...rest} 
            render={ 
                props => !isAuthentificated && !loading
                 ?
                    (
                        <Redirect
                            to={{
                                pathname: '/default-page',
                                state: { from: props.location },
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
  loading: PropTypes.bool,
  isAuthentificated: PropTypes.bool,
};

//Check auth from store redux
const mapStateToProps = (state) => ({
    auth: state.auth ,
    loading: state.shop.loading,
    isAuthentificated: state.auth.isAuthentificated,
});
export default connect(mapStateToProps,{} )(PrivateRoute);