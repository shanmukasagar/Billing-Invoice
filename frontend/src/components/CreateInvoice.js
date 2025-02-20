import React, {useState, useEffect, useRef} from 'react';
import {Box, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Button} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import {getAllProducts} from "../store/actions/formActions";
import {useNavigate } from "react-router-dom";
import {createOrder, verifyPayment, cashOnPayment} from "./Payment"

const CreateInvoice = () => {
    const [tnx_type, setTnx_Type] = useState("");
    const [errorMessage, setErrorMessage] = useState(false);
    const [invoiceData, setInvoiceData] = useState({
        p_id : "", sup_id : null, cus_id : null, no_units : "", adv_paid : "", no_inst: "", pay_term : "", bill_addr : "",
        ship_addr : "", remarks : "", bal_amt: "", total_amount : "", inst_amount : ""

    });

    const fetchOnce = useRef(false);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const productAccounts = useSelector(state => state.getAllProductsReducer.ProductAccounts);

    useEffect(() => { //Payment gateway page
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("Razorpay SDK Loaded");
        document.body.appendChild(script);
    }, []);
    
    useEffect(() => { //Update balance amount and installment amount
        if(invoiceData.total_amount !== "" && invoiceData.adv_paid !== "" && invoiceData.no_inst !== "") {
            const balance_amount = invoiceData.total_amount - invoiceData.adv_paid;
            const inatallment_amount = balance_amount/Number(invoiceData.no_inst);
            setInvoiceData((prev) => ({...prev, bal_amt :  balance_amount, adv_paid : Number(invoiceData.adv_paid),
                inst_amount : inatallment_amount
            }));
        }

    },[invoiceData.adv_paid, invoiceData.no_inst, invoiceData.total_amount])

    useEffect(() => { //Update total amount, tax amount, price of the product
        if(invoiceData.p_id !== "" && invoiceData.no_units !== "") {
            const total_price = invoiceData.unit_price*Number(invoiceData.no_units);
            const total_tax_amount = (total_price * invoiceData.total_tax_per/100);
            const total_amount = total_price + total_tax_amount;

            setInvoiceData((prev) => ({...prev, total_price : total_price, total_tax_amount : total_tax_amount,
                total_amount : total_amount
            }));
        }

    },[invoiceData.no_units, invoiceData.p_id])

    useEffect(() => { //Get all products
        if(!fetchOnce.current) {
            dispatch(getAllProducts());
            fetchOnce.current = true;
        }
    },[])

    const handleTxnType = (e) => { //Choose purschase or sales
        setTnx_Type(e.target.value);
        setInvoiceData((prev) => ({...prev, sup_id : null, cus_id : null}));
    }

    function formatCurrency(amount, currency = "INR", locale = "en-IN") { //Format currency
        return new Intl.NumberFormat(locale, {
            style: "currency",
            currency: currency,
            maximumFractionDigits: 0 
        }).format(amount);
    }

    const handleCustoomerOrSupplier = (e) => { //Choose customer or supplier id
        for(const item of productAccounts.accounts) {
            if(item._id === e.target.value) {
                if(e.target.name === "sup_id") {
                    setInvoiceData((prev) => ({...prev, [e.target.name] : item._id, sup_nm : item.supplierName}));
                }
                else{
                    setInvoiceData((prev) => ({...prev, [e.target.name] : item._id, cus_nm : item.customerName}));
                }
                break;
            }
        }
    }

    const handleProductDetails = (e) => { //Choose Product 
        for(const item of productAccounts.products) {
            if(item.p_id === e.target.value) {
                setInvoiceData((prev) => ({ ...prev, [e.target.name] : item.p_id,
                    p_nm : item.name, unit_type : item.unitType, unit_price : item.unitRate,
                    total_tax_per: item.centralTax + item.stateTax + item.additionalTax,
                    tax_type : item.taxType
                }))
            }
        }
    }

    const handleTextFieldChange = (e) => { //Handle textfield change
        setInvoiceData((prev) => ({...prev, [e.target.name] : e.target.value}));
    }

    const handleCancel = (e) => { //Handle cancel button
        setErrorMessage(false);
        navigate("/home");
    }

    const handlePayment = async(invoiceData ) => { //Handle payment functionality
        try {
            const order = await createOrder({ amount: invoiceData.inst_amount,
                currency: invoiceData.currency || "INR",
                receipt: `receipt_${Date.now()}`,
            });
            if(!order.success) {
                alert(order.message);
                navigate('/');
                return;
            }
            const options = {
                key: "rzp_test_e5c3qatxS8khEn", 
                amount: order.order.amount,
                currency: order.order.currency,
                name: "My Billing Invoice",
                description: "Invoice Payment",
                order_id: order.order.id,
                handler: async function (response) {
                    const paymentData = {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        invoiceData,
                    };
                    const verifyRes = await verifyPayment(paymentData);
                    if (verifyRes.success) {
                        alert("Payment Successful & Invoice Saved");
                        navigate("/home");
                    } else {
                        alert("Payment Verification Failed");
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
        } 
        catch (error) {
            console.error("Payment Error:", error);
        }
    }

    const handleSubmit = async() => { //Handle submit
        invoiceData.tnx_type = tnx_type;
        for(const item of Object.keys(invoiceData)) {
            if(item === "sup_id" || item === "cus_id") {
                if(!invoiceData.sup_id && !invoiceData.cus_id) {
                    setErrorMessage(true);
                    return;
                }
            }
            else if(!invoiceData[item]) {
                setErrorMessage(true);
                return;
            }
        }
        if(invoiceData.pay_term === "cod") { 
            const result = await cashOnPayment(invoiceData);
            if(result.success) {
                alert("Payment success");
                navigate("/home");
                return;
            }
            else if(result.message === "Unauthorized" || result.message === "Invalid or expired token") {
                alert(result.message);
                navigate('/');
                return;
            }
            else{
                alert(result.message);
                navigate('/home');
                return;
            }
        }
        else{
            handlePayment(invoiceData);
        }
    }

    return (
        <Box className = "form_main">
            <Typography className = "main_title">Create Invoice</Typography>
            <Grid container spacing={2}>
                <Grid item xs = {4}>
                    <FormControl fullWidth required>
                        <InputLabel id="demo-simple-select-label" >Transaction Type</InputLabel>
                        <Select labelId="demo-simple-select-label" value = {tnx_type} label="Transaction Type" onChange = {handleTxnType}>
                            <MenuItem value = "purchase">Suppliers</MenuItem>
                            <MenuItem value = "sales">Customers</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {tnx_type !== "" && (
                    <Grid item xs = {4}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">
                                {tnx_type === "purchase" ? "Select suppliers" : "select customers"}</InputLabel>
                                <Select labelId="demo-simple-select-label" onChange = {handleCustoomerOrSupplier}
                                    name = {tnx_type === "purchase" ? "sup_id": "cus_id"} value = {invoiceData.sup_id || invoiceData.cus_id}
                                    label={tnx_type === "purchase" ? "Select suppliers" : "select customers"}>
                                    {Object.keys(productAccounts).length > 0 &&
                                        productAccounts.accounts
                                        .filter(account => account.txn_type === tnx_type) // Filter based on txn_type
                                        .map((account, index) => (
                                            <MenuItem key={index} value={account._id}>
                                            {account.supplierName || account.customerName}
                                            </MenuItem>
                                        ))}
                                </Select>
                        </FormControl>
                    </Grid>
                )}
            </Grid>
            <Box className = "products_main">
                <Typography className = "product_title">Product Details</Typography>
                <Grid container spacing = {2}>
                    <Grid item xs = {4}>
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-label">Select Product</InputLabel>
                            <Select labelId="demo-simple-select-label" name = "p_id" value = {invoiceData.p_id} label= "Select Product" onChange = {handleProductDetails}>
                                {Object.keys(productAccounts).length > 0 &&
                                    productAccounts.products.map((product, index) => (
                                        <MenuItem key={index} value={product.p_id} >{product.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs = {4}>
                        <TextField required onChange = {handleTextFieldChange} value = {invoiceData.no_units} fullWidth label="No of units" name="no_units" className= "text-field-style" />
                    </Grid>
                </Grid>
                {invoiceData.total_amount !== "" && (
                    <Box className = "amounts_main">
                        <Box className = "sub_amounts_main">
                            <Typography>Total Price: </Typography>
                            <Typography>{formatCurrency(invoiceData.total_price)}</Typography>
                        </Box>
                        <Box className = "sub_amounts_main">
                            <Typography>Total Tax Amount:</Typography>
                            <Typography>{formatCurrency(invoiceData.total_tax_amount)}</Typography>
                        </Box>
                        <Box className = "sub_amounts_main">
                            <Typography>Total Amount:</Typography>
                            <Typography>{formatCurrency(invoiceData.total_amount)}</Typography>
                        </Box>
                    </Box>
                )}
                <Box className = "">
                    <Grid container spacing = {2}>
                        <Grid item xs = {4}>
                            <TextField required  fullWidth label="Advance Paid" name="adv_paid" 
                                value = {invoiceData.adv_paid} className= "text-field-style" onChange = {handleTextFieldChange}/>
                        </Grid>
                        <Grid item xs = {4}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">No of Installments</InputLabel>
                                <Select labelId="demo-simple-select-label" label="No of Installments" name = "no_inst" 
                                    value = {invoiceData.no_inst} onChange = {handleTextFieldChange}>
                                    <MenuItem value = "1">1</MenuItem>
                                    <MenuItem value = "2">2</MenuItem>
                                    <MenuItem value = "3">3</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs = {4}>
                            <FormControl fullWidth required>
                                <InputLabel id="demo-simple-select-label">Payment Term</InputLabel>
                                <Select labelId="demo-simple-select-label" label="Payment Term" name = "pay_term"
                                    value = {invoiceData.pay_term} onChange = {handleTextFieldChange}>
                                    <MenuItem value = "net 30">Net 30</MenuItem>
                                    <MenuItem value = "cod">cash on Delivery</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                {invoiceData.bal_amt !== "" && invoiceData.no_inst !== "" && (
                    <Box className = "amounts_main">
                        <Box className = "sub_amounts_main">
                            <Typography>Balance Amount:</Typography>
                            <Typography>{formatCurrency(invoiceData.bal_amt)}</Typography>
                        </Box>
                        <Box className = "sub_amounts_main">
                            <Typography>Installment Amount:</Typography>
                            <Typography>{formatCurrency(invoiceData.inst_amount)}</Typography>
                        </Box>
                    </Box>
                )}
                <Box className = "">
                    <Grid container spacing = {2}>
                        <Grid item xs = {8}>
                            <TextField required  fullWidth label="Billing Address" name="bill_addr" 
                                className= "text-field-style" onChange = {handleTextFieldChange}/>
                        </Grid>
                        <Grid item xs = {8}>
                            <TextField required  fullWidth label="Shipping Address" name="ship_addr" 
                                className= "text-field-style" onChange = {handleTextFieldChange}/>
                        </Grid>
                        <Grid item xs = {8}>
                            <TextField required  fullWidth label="Remarks" name="remarks" 
                            className= "text-field-style" onChange = {handleTextFieldChange}/>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {errorMessage && <Typography className = "error-message">Please fill required fields</Typography>}
            <Box className = "button_main">
                <Button className = "button_style" onClick = {handleCancel}>Cancel</Button>
                <Button className = "button_style" onClick = {handleSubmit}>Create Invoice</Button>
            </Box>
        </Box>
    )
}

export default CreateInvoice;
