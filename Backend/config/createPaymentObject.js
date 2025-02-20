const paymentObject = async (invoiceData, txn_no, method, status, userId) => { //Payment Object of the invoice
    return {
        userId : userId,
        "txn_type" : invoiceData.tnx_type,
        "date" : new Date(),
        "time" : new Date().toTimeString().split(' ')[0],
        sup_id : invoiceData.sup_id || "",
        sup_nm : invoiceData.sup_nm || "",
        cus_id : invoiceData.cus_id || "",
        cus_nm : invoiceData.cus_nm || "",
        products : {
            p_id : invoiceData.p_id,
            p_nm : invoiceData.p_nm,
            unit_type : invoiceData.unit_type,
            unit_rate : invoiceData.unit_price,
            quantity : Number(invoiceData.no_units),
            total_price : invoiceData.total_price,
            total_tax_per : invoiceData.total_tax_per,
            total_tax_amount : invoiceData.total_tax_amount,
            tax_type : invoiceData.tax_type,
        },
        total_amount : invoiceData.total_amount,
        paid_amount : invoiceData.inst_amount,
        bal_amount : invoiceData.total_amount - invoiceData.inst_amount,
        no_installments : invoiceData.no_inst,
        ship_addr : invoiceData.ship_addr,
        bill_addr : invoiceData.bill_addr,
        payment : {
            txn_method : method, //TODO
            txn_no : txn_no,
            pay_term : invoiceData.pay_term,
            date : new Date(),
            status : status === "captured" ? "success" : "failure",  //TODO
            amount : invoiceData.inst_amount, 
         },
        remarks : invoiceData.remarks
    }
};

module.exports = {paymentObject};