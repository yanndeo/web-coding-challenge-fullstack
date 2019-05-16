import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";
import axios from 'axios'



const Register = (props)=>{



    //Definition du state : Hook[state, setState ] =  useSate(initialize)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });


    // const { name, email, password, password2 } = this.state;
    const { name, email, password, password2 } = formData;


    //Maj state input fields text on change
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };


    const onSubmit = async (e) => {
        e.preventDefault();
    
        //Check matching password
        if (password !== password2) {

            console.log('password no correspondance');
            //props._setAlert('password no correspondance', 'danger');

        } else {

            console.log('SUCCESS', formData);
         
            //Create user Object
                const newUser ={
                    name,
                    email,
                    password
                }

            /**
             * Async/await
             * Define headers like postman
             * Convert object javascript to object json (stringify)
             * Launch request axios.
             */
                try{
                     const config= {
                        headers: {
                            'Content-Type':'application/json'
                        }
                    }

                    const body  =  JSON.stringify(newUser);

                    let res =  await axios.post('/api/register', body, config);

                    console.log(res.data)


                } catch (error) {
                    console.error(error.response.data)
                }
        }
    }




    return (

      <Fragment>

        <div className="col-md-6 ">

        <br/><br/>
          <form  onSubmit={e => onSubmit(e)}>
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
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </div>
            
          </form>
              
        </div>

        <div className="col-md-6" />
      </Fragment>

    );


}

Register.propTypes = {
}

export default Register