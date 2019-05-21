import React from 'react'
import { Alert } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//2- Destructuring des du state placé en props.

const AlertNotification = ({ alerts }) => {

       if (alerts !== null && alerts.length > 0) {
           
          return alerts.map(alert => (
              
              <Alert key={alert.id} color={alert.alertType} > 
                            {alert.msg}
              </Alert>
          ));

       }else{
           return null
       }   
}


Alert.propTypes = {
    alerts: PropTypes.array
}

//1- mappons le state dans les props 

const mapStateToProps = state => ({
    alerts: state.alert
});

export default connect(mapStateToProps, null)(AlertNotification);
