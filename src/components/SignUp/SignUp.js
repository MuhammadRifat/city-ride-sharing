import React, { useContext, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Header from '../Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { userContext } from '../../App';
import { firebaseConfigFrameWork, handleFbSignIn, handleGoogleSignIn, handleSignUp } from '../Login/LoginManager';
import { useHistory, useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const SignUp = () => {
    firebaseConfigFrameWork();
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    const [user, setUser] = useState({
        name: '',
        email: '',
        newPassword: '',
        confirmPassword: '',
        emailValid: true,
        newPasswordValid: true,
        confirmPasswordValid: true,
        error: ''
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
                    photo: res.photoURL
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
                    photo: res.photoURL
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

    const handleBlur = (event) => {
        let isValid = true;
        if(event.target.name === 'email'){
        isValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === 'newPassword'){
        isValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
        }
        if(event.target.name === 'confirmPassword'){
        isValid = event.target.value.length >= 6 && /\d{1}/.test(event.target.value);
        }
        if(isValid){
        const newUser = {...user};
        newUser[event.target.name] = event.target.value;
        newUser[event.target.name+"Valid"] = true;
        setUser(newUser);
        }
        else{
            const newUser = {...user};
            newUser[event.target.name+"Valid"] = false;
            setUser(newUser);
        }
    }

    const formSignUp = (event) => {
        if(user.email && user.newPassword && user.confirmPassword){
            if(user.newPassword.length === user.confirmPassword.length){
                handleSignUp(user.email, user.confirmPassword)
                .then(res => {
                    if(res.email){
                        const newUser = {
                            isSignIn: true,
                            email: res.email,
                            name: res.name,
                            error: '',
                            photo: res.photoURL
                        }
                        setLoggedInUser(newUser);
                        const userDetail = {...user};
                        userDetail.error = "";
                        setUser(userDetail);
                    }
                    else{
                        const newUser = {
                            error: res
                        }
                        setLoggedInUser(newUser);
                        const userDetail = {...user};
                        userDetail.error = "";
                        setUser(userDetail);
                    }
                })
            }
            else{
                const userDetail = {...user};
                userDetail.error = "Password do not match";
                setUser(userDetail);
            }
        }

        event.preventDefault();
    }

    return (
        <>
        <Header/>
        <Container>
            <Row className="justify-content-md-center">
                <Col md={6} className="mt-4">
                    <div className="p-4" style={{border:'2px solid lightgray'}}>
                        <h4>Create an account</h4>
                        {
                            user.error && <h6 style={{color: 'red', textAlign: 'center', marginTop:'10px'}}>{user.error}</h6>
                        }
                        {
                            loggedInUser.error && <h6 style={{color: 'red', textAlign: 'center', marginTop:'10px'}}>{loggedInUser.error}</h6>
                        }
                        {
                            loggedInUser.email && <h6 style={{color: 'green', textAlign: 'center', marginTop:'10px'}}>Sign up successful <Link to="/login">Go to login page</Link></h6>
                        }
                        <form className="login-form" onSubmit={formSignUp}>
                            <input type="text" onBlur={handleBlur} name="name" placeholder="Name" required/><br/>
                            <input type="text" onBlur={handleBlur} name="email" placeholder="Email" required/><br/>
                            {!user.emailValid && <span style={{color:'red'}}>Enter a valid email</span>}
                            <input type="password" onBlur={handleBlur} name="newPassword" placeholder="Password" required/><br/>
                            {!user.newPasswordValid && <span style={{color:'red'}}>Enter a valid password (at least 6 character and number)</span>}
                            <input type="password" onBlur={handleBlur} name="confirmPassword" placeholder="Confirm password" required/><br/>
                            <input className="submit-btn" type="submit" value="Create an account"/>
                        </form>
                        <h6 className="mt-3 text-center">Already have an account?<Link to="/login"> Login</Link></h6>
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

export default SignUp;