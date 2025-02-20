import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {getUserAuthentication, resetAuthDataError} from "../store/actions/userAuthActions";
import {useNavigate } from "react-router-dom";
import SignupPage from './SignupPage';

const CreateAccount = () => {
    const [userData, setUserData] = useState({email: '', pwd: '' });
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const userLoginResponse = useSelector(state => state.authUserDataReducer.generalError);

    useEffect(() => {
        if(userLoginResponse !== "") {
            if(userLoginResponse === "success") {
                navigate("/home");
            }
        }
    },[userLoginResponse])

    const handleTextFieldChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSignup = () => {
        setIsLoginPage(false);
        setErrorMessage(false);
    }

    const handleSubmit = () => {
        dispatch(resetAuthDataError());
        for(const item of Object.keys(userData)) {
            if(userData[item] === "") {
                setErrorMessage(true);
                return;
            }
        }
        dispatch(getUserAuthentication(userData));
    }

    return (
        <React.Fragment>
            {isLoginPage ? (
                <Box className="user-register-main">
                    <Box className="create-account-main">
                        <Box className="sub1-account-main">
                            <Box className="sub2-account-box">
                                <Box className="account-top-box">
                                    <Typography className="create-account-title">Signin to Account</Typography>
                                    <Typography className="content-style">Enter your email and password to Signin</Typography>
                                </Box>
                                <Box className="text-fields-main">
                                    <TextField required  fullWidth label="Email" name="email" onChange={handleTextFieldChange}
                                        value={userData.email} className= "text-field-style" />
                                    <TextField required type = "password" fullWidth label="Password" name="pwd" onChange={handleTextFieldChange}
                                        value={userData.pwd} className = "text-field-style"/>
                                    <Button className="button-style" onClick = {handleSubmit}>Sign in</Button>
                                    <Typography className="no-account-text">Don't have an account? 
                                        <span className="link-style" onClick={handleSignup}>
                                            Click here to create a new account
                                        </span>
                                    </Typography>
                                    {errorMessage && <Typography className = "error-message">Please fill required details</Typography>}
                                    {userLoginResponse && userLoginResponse !== "success" && <Typography className = "error-message">{userLoginResponse}</Typography>}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            ) :
                (<SignupPage setIsLoginPage = {setIsLoginPage}/>)
            }
        </React.Fragment>
    );
}

export default CreateAccount;
