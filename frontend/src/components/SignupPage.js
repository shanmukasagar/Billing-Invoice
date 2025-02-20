import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {addNewUser, resetAddNewUserError} from "../store/actions/userAuthActions";
import {useNavigate } from "react-router-dom";

const SignupPage = ({setIsLoginPage}) => {
    const [userData, setUserData] = useState({ u_nm: '', email: '', pwd: '' });
    const [errorMessage, setErrorMessage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const userSignupResponse = useSelector(state => state.addNewUserReducer.generalError);

    useEffect(() => {
        if(userSignupResponse !== "") {
            if(userSignupResponse === "success") {
                navigate('/home');
            }
        }
    },[userSignupResponse])

    const handleTextFieldChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        setErrorMessage(false);
        setIsLoginPage(true);
    }

    const handleSubmit = () => {
        dispatch(resetAddNewUserError());
        for(const item of Object.keys(userData)) {
            if(userData[item] === "") {
                setErrorMessage(true);
                return;
            }
        }
        dispatch(addNewUser(userData));
    }

    return (
        <Box className="user-register-main">
            <Box className="create-account-main">
                <Box className="sub1-account-main">
                    <Box className="sub2-account-box">
                        <Box className="account-top-box">
                            <Typography className="create-account-title">Create Account</Typography>
                            <Typography className="content-style">Enter your email and password to create an account
                            </Typography>
                        </Box>
                        <Box className="text-fields-main">
                            <TextField required fullWidth label="Username" name="u_nm" onChange={handleTextFieldChange}
                                value={userData.u_nm} className="text-field-style" />
                            <TextField required  fullWidth label="Email" name="email" onChange={handleTextFieldChange}
                                value={userData.email} className= "text-field-style" />
                            <TextField required fullWidth label="Password" name="pwd" onChange={handleTextFieldChange}
                                value={userData.pwd} className = "text-field-style"/>
                            <Button className="button-style" onClick = {handleSubmit}>Create Account</Button>
                            <Typography className="no-account-text">Already have an account?
                                <span className="link-style" onClick={handleLogin}>Click here to SignIn</span>
                            </Typography>
                            {errorMessage && <Typography className = "error-message">Please fill required details</Typography>}
                            {userSignupResponse && userSignupResponse !== "success" && 
                                <Typography className = "error-message">{userSignupResponse}</Typography>}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
export default SignupPage;
