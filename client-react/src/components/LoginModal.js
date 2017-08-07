import React from 'react';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import './LoginModal.css';
import Validate from "react-validate-form"
import axios from 'axios';
var ReactDOM = require('react-dom');
axios.defaults.baseURL = "http://localhost:8000/letdoapi";
const validations = {
    email: ["email"],
    password: ["required", "min:3", "max:15"],
}
class LoginModal extends React.Component {
    state = {
        isShowingModal: false,
    }
    handleClick = () => this.setState({ isShowingModal: true })
    handleClose = () => this.setState({ isShowingModal: false })
    onLogin = () => {
        console.log(this.refs);
        let email = this.email.value
        let password = this.password.value
        let self = this;
        axios.post('/auth/login', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
                let json = response.data;
                if (json.status == 'ok'){
                    localStorage.setItem('currentUser', JSON.stringify(json.token));
                    self.setState({ isShowingModal: false })
                    self.props.onLoginSuccess();
                }else{
                    alert(json.message)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    render() {
        return <a onClick={this.handleClick}>Log In
      {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog onClose={this.handleClose}>
                        <Validate validations={validations}>
                            {({ validate, errorMessages }) => (
                                <form className="form-horizontal">
                                    <h1>Login Dialog</h1>
                                    <div className='form-group'>
                                        <input name="email" onChange={validate} className='form-control' type='text' placeholder='Email Address' ref={el => this.email = el} />
                                        <p className="validate_error">{errorMessages.email}</p>
                                    </div>
                                    <div className='form-group'>
                                        <input className='form-control' onChange={validate} type='password' name='password' placeholder='Password' ref={el => this.password = el}></input>
                                        <p className="validate_error">{errorMessages.password}</p>
                                    </div>
                                    <div className='form-group'>
                                        <button type="button" className="btn btn-primary" onClick={this.onLogin}>LogIn</button>
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

export default LoginModal