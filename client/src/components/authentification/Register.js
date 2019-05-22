import React, { Fragment, useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import PropTypes from "prop-types";
//Components
import AlertNotification from "../layout/AlertNotification";
//Actions : _xxYYY
import { _setAlert } from '../../actions/alert';
import { _register } from '../../actions/auth';
import { _setIsOpen } from '../../actions/modal';



const Register = ({ _setAlert, _register, _setIsOpen, isAuthentificate})=>{


    //Definition du state : Hook[state, setState ] =  useSate(initialize)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    /**
     * Hook Reack : change page title
     */
    useEffect(() => {
        document.title = `Register`;
    });




    // const { name, email, password, password2 } = this.state;
    const { name, email, password, password2 } = formData;


    /**
     * Maj state input fields text on change
     */
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };



    /**
     *  User Registration 
     *  on submit form
     *  call action redux
     */
    const onSubmit = async (e) => {
        e.preventDefault();
    
        //Check matching password
        if (password !== password2) {
            _setAlert('Passwords do not match', 'danger'); 
            console.log('Register','password no correspondance');

        } else {
            _register({ name, email, password }); 
            console.log('Register', formData);

        }
    };

  



   

    return (
    <Fragment>

        <div className="row">
            <div className="col-md-6 ">
            <br/><br/>
            
            <form  onSubmit={e => onSubmit(e)} noValidate >
                <div className="p-3 p-lg-5 border">

                <h3>Sign up</h3>

                <div className="form-group row">
                    <div className="col-md-12">
                    <label htmlFor="name" className="text-black">
                        Name <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        placeholder="Your name"
                        onChange={e => onChange(e)}
                        required
                    />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                    <label htmlFor="email" className="text-black">
                        Email <span className="text-danger">*</span>
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                    <label htmlFor="password" className="text-black">
                        Password <span className="text-danger">*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                    </div>
                </div>


                <div className="form-group row">
                    <div className="col-md-12">
                    <label htmlFor="c_email" className="text-black">
                        Password2 <span className="text-danger">*</span>
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        required
                    />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-lg-12">
                    <input
                        type="submit"
                        className="btn btn-primary btn-lg btn-block"
                        value="REGISTER"
                    />
                    </div>
                </div>


                    <p className="my-1">
                        Already have an account? <Link to="#" onClick={ ()=>_setIsOpen() } >Sign In</Link>
                    </p>
                </div>
                
            </form>
                
            </div>

            <div className="col-md-6" >
                <br /><br />
                    <AlertNotification/>
            </div>

        </div>

    </Fragment>

    );


}

Register.propTypes = {
    _setAlert: PropTypes.func.isRequired,
    _setIsOpen:PropTypes.func.isRequired,
    _register: PropTypes.func.isRequired,
    isAuthentificate: PropTypes.bool,


}

// mappons le state dans les props du component
const mapStateToProps = state => ({
    isAuthentificate: state.auth.isAuthentificate,
});

export default connect( mapStateToProps, { _setAlert, _register, _setIsOpen })(Register)
