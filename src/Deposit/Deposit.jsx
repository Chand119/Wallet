import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const Deposit=()=>{
    const user = localStorage.getItem('user');
    const customer = JSON.parse(user);
    const Accounts = customer.accounts;


 // {
      
    //     "customerId":1,
    //     "accountNumber":5,
    //     "amount":500,
    //     "description":"from postman",
    //     "fromAccountNumber":6
  
        
    // }

   const [depositForm,setDepositForm]= useState({
        "customerId":customer.customerId,
        "accountNumber":"",
        "amount":"",
        "description":"",
        "fromAccountNumber":""

    })

    const handleChange=(event)=>{
const {name,value}=event.target;
setDepositForm({
    ...depositForm,
    [name]:value
})
    }

    const resetForm=()=>{
        setDepositForm({
            "customerId":customer.customerId,
            "accountNumber":"",
            "amount":"",
            "description":"",
            "fromAccountNumber":""
        })
    }

    const handleForm= async(event)=>{
        event.preventDefault();
        console.log(depositForm);
        try{
        const response= await axios.post('http://localhost:9291/transaction/depositAmountInAccount',depositForm);
        toast.success("Transaction Successful with id"+response.data.data);
        resetForm();
        }
        catch(error){
            resetForm();
            toast.error("Transaction Failed");
        }

    }
   


    return(
<>
<Header/>

    <div className="container mt-4">
                <h2>Deposit Money To Account</h2>
    {Accounts && Accounts.length >0?(
<form onSubmit={handleForm}>
<div class="container mt-5">
        <h2>Deposit</h2>
<div class="form-group">
                <label for="amount">Amount</label>
                <input type="number" class="form-control" id="amount" name="amount" placeholder="Enter amount" required
                value={depositForm.amount}
                onChange={handleChange}
                />
            </div>
            <div className="form-group">
            <label htmlFor="accountSelect">Account To Deposit:</label>
            <select 
                                className="form-control" 
                                id="accountSelect" 
                                name="accountNumber"
                                value={depositForm.accountNumber}
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
                <label for="fromAccountNumber">TO Account</label>
                <input type="number" class="form-control" id="fromAccountNumber" name="fromAccountNumber" placeholder="Enter From Account Number" required
                value={depositForm.fromAccountNumber}
                onChange={handleChange}
                />
            </div>
                            <div class="form-group">
                <label for="description">Description</label>
                <textarea class="form-control" id="description" name="description" rows="3" placeholder="Enter description"
                value={depositForm.description}
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
    );

}
export default Deposit;