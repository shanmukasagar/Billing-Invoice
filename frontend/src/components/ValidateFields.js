const authRegex = {
    email: /^(?!.*\.\.)[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/,
    u_nm: /^[a-zA-Z]{3,}$/,
    no_units : /^[0-9]/
};

const validationMessages = {
    email: "Please provide a valid email.",
    pwd: "Password must have at least 7 characters, including one uppercase, one lowercase, one number, and one special character.",
    u_nm: "Username must be at least 3 characters and contain only letters.",
    no_units : "Please provide valid no of units of the product"
};

export const authValidation = (inputData) => {
    for (const [key, value] of Object.entries(inputData)) {
        if (!value.trim()) {
            return { isError: true, message: "Please fill all required fields." };
        }
        if (authRegex[key] && !authRegex[key].test(value)) {
            return { isError: true, message: validationMessages[key] || "Invalid input." };
        }
    }
    return { isError: false, message: "Validation successful." };
};

export const validateForm = (invoiceData) => {
    for(const item of Object.keys(invoiceData)) {
        if(item === "sup_id" || item === "cus_id") {
            if(!invoiceData.sup_id && !invoiceData.cus_id) {
                return {isError : true, message : "Please fill all details"};
            }
        }
        else if(!invoiceData[item]) {
            return {isError : true, message : "Please fill all details"};
        }
        else if(authRegex[item] && !authRegex[item].test(invoiceData[item])) {
            return {isError : true, message : validationMessages[item]};
        }
    }
    return {isError : false, message : "success"};
}
