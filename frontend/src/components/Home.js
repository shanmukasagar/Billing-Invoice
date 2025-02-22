import React, {useEffect, useRef} from 'react';
import {Box, Typography, Button, Grid} from "@mui/material";
import {useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getAllTransactions} from "../store/actions/homeActions";
import {authenticationPage, resetAuthPageError} from "../store/actions/userAuthActions";

const Home = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const fetchOnce = useRef(false);
    const dispatch = useDispatch();
    const transactionsData = useSelector(state => state.getTransactionReducer.transactionData);
    const authPageResponse = useSelector(state => state.authPageReducer.generalError);

    useEffect(() => {
        if(!fetchOnce.current) {
            dispatch(authenticationPage());
            fetchOnce.current = true;
        }
    },[dispatch])

    useEffect(() => { //get all transactions
        if(authPageResponse !== "") {
            if(authPageResponse === "success") {
                dispatch(getAllTransactions());
            }
            else{
                navigate('/');
                dispatch(resetAuthPageError());
            }
        }
    },[dispatch, authPageResponse])

    return (
        <React.Fragment>
            {authPageResponse === "success" && (
                <Box className = "home_main">
                    <Box className = "header_main">
                        <Typography className = "title">Billing Invoice</Typography>
                        <Button className = "button_style" onClick = {() => navigate("/create-invoice")}>Create Invoice</Button>
                    </Box>
                    <Typography className = "transaction_text">Transaction Report</Typography>
                    <Box className = "grid_main">
                        <Grid container className = "grid_parent">
                            <Grid item xs = {2}><Typography className = "key_name">Supplier/Customer</Typography></Grid>
                            <Grid item xs = {2}><Typography className = "key_name">Product</Typography></Grid>
                            <Grid item xs = {3}><Typography className = "key_name">User</Typography></Grid>
                            <Grid item xs = {2}><Typography className = "key_name">Transaction</Typography></Grid>
                            <Grid item xs = {1}><Typography className = "key_name">Mode</Typography></Grid>
                            <Grid item xs = {1}><Typography className = "key_name">Status</Typography></Grid>
                            <Grid item xs = {1}><Typography className = "key_name">Transaction type</Typography></Grid>
                        </Grid>
                        {
                            transactionsData.length > 0 && transactionsData.slice().reverse().map((item, index) => (
                                <Grid container className = "grid_child" key = {index}>
                                    <Grid item xs = {2}><Typography className = "value_name">{item.sup_nm || item.cus_nm}</Typography></Grid>
                                    <Grid item xs = {2}><Typography className = "value_name">{item.products.p_nm}</Typography></Grid>
                                    <Grid item xs = {3}><Typography className = "value_name">{item.userId}</Typography></Grid>
                                    <Grid item xs = {2}><Typography className = "value_name">{item.payment.txn_no}</Typography></Grid>
                                    <Grid item xs = {1}><Typography className = "value_name">{item.payment.txn_method}</Typography></Grid>
                                    <Grid item xs = {1}><Typography className = "value_name">{item.payment.status}</Typography></Grid>
                                    <Grid item xs = {1}><Typography className = "value_name">{item.txn_type}</Typography></Grid>
                                </Grid>
                            ))
                        }
                    </Box>
                </Box>
            )}
        </React.Fragment>
    )
}

export default Home

