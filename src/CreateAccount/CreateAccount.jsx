import { useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const CreateAccount = () => {
    const user = localStorage.getItem('user');
    const customer = JSON.parse(user) ;
  

    const [createAccount, setCreateAccount] = useState({
        customerId: customer.customerId,
        accountType: "",
        openingBalance: "",
        description: "",
    });
    

    const formChange = (event) => {
        const { name, value }=event.target;

        setCreateAccount({
            ...createAccount,
            [name]: value,
        });
    };

    const handleForm = async (event) => {
        event.preventDefault(); 
        console.log(createAccount);
        try{
            const response= await axios.post('http://localhost:9291/account/create',createAccount);
            toast.success("Account Created SuccessFully");
            resetForm();
        }
        catch(error){
            toast.error("Can't Create Account");
            resetForm();
        }
    };

    const resetForm=()=>{
        setCreateAccount({
            accountType: "",
            openingBalance: "",
            description: "",
        })
    }

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>Create Account</h2>
                <form onSubmit={handleForm}>
                    <div className="form-group">
                        <label htmlFor="accountType">Account Type</label>
                        <select
                            className="form-control"
                            id="accountType"
                            name="accountType"
                            required
                            value={createAccount.accountType}
                            onChange={formChange}
                        >
                            <option value="">Select Account Type</option>
                            <option value="SAVINGS">Savings</option>
                            <option value="LOAN">Loan</option>
                            <option value="CURRENT">Current</option>
                            <option value="ZERO">Zero Balance</option>
                            <option value="SALARY">Salary</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="openingBalance">Opening Balance</label>
                        <input
                            type="number"
                            className="form-control"
                            id="openingBalance"
                            name="openingBalance"
                            placeholder="Enter opening balance"
                            required
                            value={createAccount.openingBalance}
                            onChange={formChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description" 
                            rows="3"
                            placeholder="Enter description"
                            required
                            value={createAccount.description}
                            onChange={formChange}
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-danger mt-2">Create</button>
                </form>
            </div>
        </>
    );
}

export default CreateAccount;
