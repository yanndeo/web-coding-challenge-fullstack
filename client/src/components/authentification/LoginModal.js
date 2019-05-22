import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
//Component
import AlertNotification from '../layout/AlertNotification';
//Actions : _xxYYY
import { _setIsOpen } from "../../actions/modal";
import {  _loginUser } from '../../actions/auth';



const LoginModal = ({ isAuthentificated, isOpen, _setIsOpen, _loginUser} ) => {


    /**
     * Hook: Definition of state : [state, setState ] =  useSate(initialize)
     */
    const [formModalData, setFormModalData] = useState({
        email: '',
        password: '',
    });

  

    // const { email, password } = this.state;
    const { email, password } = formModalData ;

    

   /**
    * close modal : 
    * send action redux
    */
    const toggle = () => {
         _setIsOpen()
     };



    /**
     * Maj state input fields text on change
     */
    let onChange = (e) => {
        setFormModalData({
            ...formModalData,
            [e.target.name]: e.target.value
        });
    };



    /**
     * Call action redux to send request
     * to "/api/login"
     */
    const onSubmit = (e) => {
        e.preventDefault();
        _loginUser(email, password);

         toggle()

        return <Redirect to = '/mainpage' />

    }
    
   /*  if (isAuthentificated) {
        console.log(isAuthentificated);
        toggle()
   
    }; */
   


    return (

        <Fragment >
            <div  >

                <Modal isOpen={ isOpen } toggle={() => toggle()} >

                    <ModalHeader toggle={()=>toggle()} >
                          <span className="text-center"> SIGN_IN </span>  
                    </ModalHeader>

                    <ModalBody>

                        { /** Connected to redux state global*/}
                        <AlertNotification />

                        <Form onSubmit={ e => onSubmit(e) } >
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Email"
                                    onChange={(e)=> onChange(e) }
                                />

                                <Label for="name">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    value={password}
                                    placeholder="Password"
                                    onChange={(e)=> onChange(e)}
                                />
                                <br/>

                                <Button color="primary"block={true}>
                                    LOGIN
                                </Button>

                            </FormGroup>
                        </Form>

                        
                    </ModalBody>
                </Modal>
            </div>
        </Fragment>

    );


}

LoginModal.propTypes = {
  _setIsOpen: PropTypes.func.isRequired, //action
 _loginUser:PropTypes.func.isRequired,  //action

  isAuthentificated: PropTypes.bool, //piece of store
  isOpen: PropTypes.bool //piece of store
};

// mappons le state dans les props du component.
const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  isAuthentificated: state.auth.isAuthentificated
});

export default connect(mapStateToProps, { _setIsOpen, _loginUser, })(LoginModal);