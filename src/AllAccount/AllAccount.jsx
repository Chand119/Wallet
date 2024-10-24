import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Header from "../Header/Header";
import 'react-toastify/dist/ReactToastify.css';

const AllAccount = () => {
    const [accounts, setAccounts] = useState([]);
    const user = localStorage.getItem('user');
    const customer = JSON.parse(user);

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get(`http://localhost:9291/account/getAccountsByEmailId/${customer.emailId}`);
                setAccounts(response.data.data);
            } catch (error) {
                toast.error("Error fetching accounts: " + (error.response?.data?.message || error.message));
            }
        };

        fetchAccounts();
    }, [customer.emailId]);

    return (
        <>
            <Header />
            <ToastContainer />
            <div className="container mt-4">
                <h2>Your Accounts</h2>
                {accounts.length > 0 ? (
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Account Number</th>
                                <th>Account Type</th>
                                <th>Opening Balance</th>
                                <th>Opening Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accounts.map((account, index) => (
                                <tr key={index}>
                                    <td>{account.id}</td>
                                    <td>{account.accountType}</td>
                                    <td>{account.openingBalance}</td>
                                    <td>{account.openingDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No Accounts For You</p>
                )}
            </div>
        </>
    );
}

export default AllAccount;
