import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import 'react-toastify/dist/ReactToastify.css';

const Transactions = () => {
    const user = localStorage.getItem('user');
    const customer = JSON.parse(user);
    const accounts = customer.accounts || []; 

    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedDate, setSelectedDate] = useState(''); 
    const [transactions, setTransactions] = useState([]);

    const fetchTransactions = async (accountId, date) => {
        try {
            const response = await axios.get(`http://localhost:9291/transaction/getTransactionByAccNum/${accountId}`, {
                params: { date } 
            });
            setTransactions(response.data.data);
        } catch (error) {
            setTransactions([]);
        }
    };

    const handleAccountChange = (event) => {
        const accountId = event.target.value;

        setSelectedAccount(accountId);
        setSelectedDate('');
        if (accountId) {
            fetchTransactions(accountId, '');
        } else {
            setTransactions([]); 
        }
    };

    const handleDateChange = (event) => {
        const date = event.target.value;
        setSelectedDate(date);

        if (selectedAccount) {
            fetchTransactions(selectedAccount, date); 
        }
    };

    return (
        <>
            <Header />
          
            <div className="container mt-4">
                <h2>Select an Account to Fetch Transactions</h2>
                <select value={selectedAccount} onChange={handleAccountChange}>
                    <option value="">Select an Account</option>
                    {accounts.map(account => (
                        <option key={account.id} value={account.id}>
                            {account.accountType} - {account.id}
                        </option>
                    ))}
                </select>

                
                <div className="mt-2">
                    <label htmlFor="transactionDate">Select Date:</label>
                    <input
                        type="date"
                        id="transactionDate"
                        value={selectedDate}
                        onChange={handleDateChange}
                        className="ml-2"
                    />
                </div>

                {transactions.length > 0 ? (
                    <table className="table table-striped mt-4">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Transaction Type</th>
                                <th>Transaction Date</th>
                                <th>Amount</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(transaction => (
                                <tr key={transaction.transactionId}>
                                    <td>{transaction.transactionId}</td>
                                    <td>{transaction.transactionType}</td>
                                    <td>{transaction.transactionDate}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : selectedAccount && <p>No Transactions Found for this Account</p>}
            </div>
            <Footer />
        </>
    );
}

export default Transactions;
