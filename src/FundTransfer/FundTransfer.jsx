import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { toast } from "react-toastify";
import axios from "axios";

const FundTransfer=()=>{
    const user = localStorage.getItem('user');
    const customer = JSON.parse(user);
    const Accounts = customer.accounts;


   const [fundForm,setFundForm]= useState({
      
        "customerId":customer.customerId,
        "accountNumber":"",
        "amount":"",
        "description":"",
        "fromAccountNumber":""
        
    })

    const resetForm=()=>{
        setFundForm({
            "customerId":customer.customerId,
            "accountNumber":"",
            "amount":"",
            "description":"",
            "fromAccountNumber":""
        })
    }
    

    const handleChange=(event)=>{
        const {name,value}=event.target;
        setFundForm({
            ...fundForm,
            [name]:value
        })


    }
    const handleForm= async (event)=>{
        event.preventDefault();
        
        try{
        const response= await axios.post('http://localhost:9291/transaction/fundTransfer',fundForm);
        toast.success("Transaction Successful with id"+response.data.data);
        resetForm();
        }
        catch(error){
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message); 
                resetForm();
              } else {
                toast.error("An unexpected error occurred."); 
                resetForm();
              }
            }

    }


return(
    <>
    <Header/>

<div className="container mt-4">
            <h2>Fund Transfers</h2>
{Accounts && Accounts.length >0?(
<form onSubmit={handleForm}>
<div class="container mt-5">
    <h2>Fund Transfer</h2>
<div class="form-group">
            <label for="amount">Amount</label>
            <input type="number" class="form-control" id="amount" name="amount" placeholder="Enter amount" required
            value={fundForm.amount}
            onChange={handleChange}
            />
        </div>
        <div className="form-group">
        <label htmlFor="accountSelect">From Account:</label>
        <select 
                            className="form-control" 
                            id="accountSelect" 
                            name="accountNumber"
                            value={fundForm.accountNumber}
                            onChange={handleChange}
                        >
                            <option value="">Choose an account...</option>
                            {Accounts.map((account, index) => (
                                <option key={index} value={account.accountNumber}>
                                    {account.id} 
                                </option>
                            ))}
                        </select>
                        </div>
                        <div class="form-group">
            <label for="accountNumber">To Account</label>
            <input type="number" class="form-control" id="fromAccountNumber" name="fromAccountNumber" placeholder="Enter From Account Number" required
            value={fundForm.fromAccountNumber}
            onChange={handleChange}
            />
        </div>
                        <div class="form-group">
            <label for="description">Description</label>
            <textarea class="form-control" id="description" name="description" rows="3" placeholder="Enter description"
            value={fundForm.description}
            onChange={handleChange}
            ></textarea>
        </div>
     <button type="submit" class="btn btn-danger mt-2">Deposit</button>
    </div>
</form>
):
(
    <p>No Accounts For You</p>
)
}

</div>

<Footer/>

    </>
)
}
export default FundTransfer;