import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import './LoginModal.css';
import Validate from "react-validate-form"
import axios from 'axios';
const validations = {
    fullname: ["required"],
    email: ["email"],
    password: ["required", "min:3", "max:15"],
    password_conf: ["required"],
}
const rules = {
    equalto: {
        test:  arg => val => val.length >= arg ,
        message: arg => name => `${name} must be at least ${arg} characters.`,
    },
};
class SignUpModal extends React.Component {
    state = {
        isShowingModal: false,
    }
    handleClick = () => this.setState({ isShowingModal: true })
    handleClose = () => this.setState({ isShowingModal: false })

    onSignUp = () => {
              console.log(this.refs);
        let fullname = this.fullname.value
        let email = this.email.value
        let password = this.password.value
        let self = this;
        axios.post('/auth/signup', {
            fullname: fullname,
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                let json = response.data;
                if (json.status == 'ok'){
                    alert("Successfully Registered!")
                }else{
                    alert(json.message)
                }
                
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render() {
        return <a onClick={this.handleClick}>Sign Up
      {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <Validate validations={validations} rules={rules}>
                            {({ validate, errorMessages }) => (
                                <form className="form-horizontal">
                                    <h1>SignUp Dialog</h1>
                                    <div className='form-group'>
                                        <input name="fullname" onChange={validate} className='form-control' type='text' placeholder='Your Name' ref={el => this.fullname = el}></input>
                                        <p className="validate_error">{errorMessages.fullname}</p>
                                    </div>
                                    <div className='form-group'>
                                        <input name="email" onChange={validate} className='form-control' type='text' placeholder='Email Address' ref={el => this.email = el}></input>
                                        <p className="validate_error">{errorMessages.email}</p>
                                    </div>
                                    <div className='form-group'>
                                        <input name="password" onChange={validate} className='form-control' type='password' placeholder='Password' ref={el => this.password = el}></input>
                                        <p className="validate_error">{errorMessages.password}</p>
                                    </div>
                                    <div className='form-group'>
                                        <input name="password_conf" onChange={validate} className='form-control' type='password' placeholder='Conf Password' ></input>
                                        <p className="validate_error">{errorMessages.password_conf}</p>
                                    </div>
                                    <div className='form-group'>
                                        <button type="button" className="btn btn-primary" onClick={this.onSignUp}>SignUp</button>
                                    </div>
                                </form>
                            )}
                        </Validate>
                    </ModalDialog>
                </ModalContainer>
            }
        </a>;
    }
}

export default SignUpModal