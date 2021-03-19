import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { userContext } from '../../App';
import { firebaseConfigFrameWork, handleFbSignIn, handleGoogleSignIn, handleLogIn } from './LoginManager';
import Header from '../Header/Header';

const Login = () => {
    firebaseConfigFrameWork();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
        .then(res => {
            if(res.email){
                const newUser = {
                    isSignIn: true,
                    email: res.email,
                    name: res.name,
                    error: '',
                    photo: res.photoURL,
                    success: true
                }
                setLoggedInUser(newUser);
                history.replace(from);
            }
            else{
                const newUser = {
                    error: res
                }
                setLoggedInUser(newUser);
            }
        })
    }

    const fbSignIn = () => {
        handleFbSignIn()
        .then(res => {
            if(res.email){
                const newUser = {
                    isSignIn: true,
                    email: res.email,
                    name: res.name,
                    error: '',
                    photo: res.photoURL,
                    success: true
                }
                setLoggedInUser(newUser);
                history.replace(from);
            }
            else{
                const newUser = {
                    error: res
                }
                setLoggedInUser(newUser);
            }
        })
    }

    const formLogIn = (event) => {
        handleLogIn(user.email, user.password)
        .then(res => {
            if(res.email){
                const newUser = {
                    isSignIn: true,
                    email: res.email,
                    name: res.name,
                    error: '',
                    photo: res.photoURL,
                    success: true
                }
                setLoggedInUser(newUser);
                history.replace(from);
            }
            else{
                const newUser = {
                    error: res
                }
                setLoggedInUser(newUser);
            }
        })
        event.preventDefault();
    }

    const handleBlur = (event) => {
        let isValid = true;
        if(event.target.name === 'email'){
        isValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'password'){
        isValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
        }
        if(isValid){
        const newUser = {...user};
        newUser[event.target.name] = event.target.value;
        setUser(newUser);
        }
    }

    return (
        <>
        <Header/>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6} className="mt-4">
                    <div className="p-4" style={{border:'2px solid lightgray'}}>
                        <h4>Log In</h4>
                        {
                            loggedInUser.error ? <h6 style={{color: 'red', textAlign: 'center', marginTop:'10px'}}>{loggedInUser.error}</h6> : <h4></h4>
                        }
                        <form className="login-form" onSubmit={formLogIn}>
                            <input type="text" onBlur={handleBlur} name="email" placeholder="Enter email" required/><br/>
                            <input type="password" onBlur={handleBlur} name="password" placeholder="Enter password" required/><br/>
                            <input className="submit-btn" type="submit" value="Login"/>
                        </form>
                        <h6 className="mt-3 text-center">Don't have an account?<Link to="/signup"> Create an account</Link></h6>
                    </div>
                    <hr/>
                    <h5 className="text-center">Or</h5>
                    <hr/>
                    <div className="text-center social-btn">
                    <button onClick={googleSignIn}><FontAwesomeIcon icon={faGoogle}/> Continue With Google</button><br/>
                    <button onClick={fbSignIn}><FontAwesomeIcon icon={faFacebook}/> Continue With Facebook</button>
                    </div>
                    
                </Col>
            </Row>
        </Container>
        </>
    );
};

export default Login;