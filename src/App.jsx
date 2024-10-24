
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Login/Login';

import Home from './Home/Home';
import Transactions from './Transactions/Transactions';
import Withdraw from './Withdraw/Withdraw';
import FundTransfer from './FundTransfer/FundTransfer';
import Deposit from './Deposit/Deposit';
import { useState } from 'react';

import CreateAccount from './CreateAccount/CreateAccount';
import Signup from './Signup/Signup';
import AllAccount from './AllAccount/AllAccount';
import { useSelector } from 'react-redux';
import Upload from './Home/DocumentUpload/UploadDoc';
import ViewDocumnet from './Home/DocumentUpload/ViewDocument';


function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  

  return(
    <Router>
    <ToastContainer />
    <Routes>
    <Route path='/' element={<Login  />}/>
     <Route path='/Home' element={<Home/>}/>

     <Route path='/Transaction' element={isLoggedIn?<Transactions/>:<Navigate to="/"/>}/>

     <Route path='/Withdraw' element={isLoggedIn?<Withdraw/>:<Navigate to="/"/>}/>

     <Route path='/fundtransfer' element={isLoggedIn?<FundTransfer/>:<Navigate to="/"/>}/>

     <Route path='/Deposit' element={isLoggedIn?<Deposit/>:<Navigate to="/"/>}/>

     <Route path='/Upload' element={isLoggedIn?<Upload/>:<Navigate to="/"/>}/>
     <Route path='/ViewDocuments' element={isLoggedIn?<ViewDocumnet/>:<Navigate to="/"/>}/>


     <Route path='/CreateAccount' element={isLoggedIn?<CreateAccount/>:<Navigate to="/"/>}/>

     <Route path='/SignUp' element={<Signup/>}/>

     <Route path='/AllAccount' element={isLoggedIn?<AllAccount/>:<Navigate to="/"/>}/>
    </Routes>
  </Router>
  );
}
export default App;
