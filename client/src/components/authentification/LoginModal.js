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
//Components
import AlertNotification from '../layout/AlertNotification';
//Actions : _xxYYY
import { _setIsOpen } from "../../actions/modal";
import { _login } from '../../actions/auth';



const LoginModal = (props) => {

   // const {isAuthentificated} = props;

    //Hook: Definition of state : [state, setState ] =  useSate(initialize)
    const [formModalData, setFormModalData] = useState({
        email: '',
        password: '',
    });


    // const { email, password } = this.state;
    const { email, password } = formModalData;


    //close modal : send action redux
    const toggle = () => {
         props._setIsOpen()
     };


    //Maj state input fields text on change
    const onChange = (e) => {
        setFormModalData({
          ...formModalData,
          [e.target.name]: e.target.value
        });
    };


    //Call action redux to send request to "/api/login"
    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('UserLogin:',email, password)
        props._login(email, password);

    }


    //Redirect if logged in
    if(props.isAuthentificated){
        console.log('auth?: ', props.isAuthentificated)

        return <Redirect to="/mainpage" />


    }

    console.log('modal',props.isOpen)

    return (

        <Fragment >
            <div  >

                <Modal isOpen={props.isOpen} toggle={() => toggle()}  >

                    <ModalHeader toggle={()=>toggle()} >
                          <span className="text-center"> SIGN IN </span>  
                    </ModalHeader>

                    <ModalBody>

                        { /** Connected to redux state global*/}
                        <AlertNotification/>

                        <Form onSubmit={e => onSubmit(e)} >
                            <FormGroup>

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e)=>onChange(e) }
                                />

                                <Label for="name">Password</Label>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e)=>onChange(e)}
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
    _setIsOpen: PropTypes.func.isRequired,  //action
    _login: PropTypes.func.isRequired,      //action
    isAuthentificated: PropTypes.bool,       //piece of store
    isOpen:PropTypes.bool,                  //piece of store

};

// mappons le state dans les props du component.
const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  isAuthentificated : state.auth.isAuthentificated
});

export default connect(mapStateToProps, {_setIsOpen, _login})(LoginModal);