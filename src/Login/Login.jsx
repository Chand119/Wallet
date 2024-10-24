import 'bootstrap/dist/css/bootstrap.min.css';

import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
const Login =()=>{

   const navigate=useNavigate();
   const dispatch = useDispatch();
  
        
        const[userDetails,setUserDetails]=useState({
            emailId:"",
            password:""
          })
          const handleForm= async (event)=>{
        event.preventDefault();
        
        if(userDetails.emailId.trim()== "" || userDetails.password.trim()=="")
        {
          toast.error("Username or Password should not be blank");
          return;
        }
        try{
          const response= await  axios.post('http://localhost:9291/customer/isValidUser',{
            emailId: userDetails.emailId,
            password: userDetails.password
          }
        );
        dispatch(login());
        
        localStorage.setItem('user',JSON.stringify(response.data.data));
       
       

        
      
        navigate('/Home');
        resetField();
        }
        catch(error){
         
          toast.error("Login failed: " + (error.response?.data?.message || "Unknown error"));
        }
        
          }
        
        
         const handleSignUp =()=>{
          navigate('/SignUp')
         }
        
          const handlChange=(event,field)=>{
            let actualValue=event.target.value;
            setUserDetails({
              ...userDetails,
              [field]:actualValue
            });
          }
            const resetField=()=>{
        
              setUserDetails({
                emailId:"",
                password:""
              })
          }
        return(
          <div classNameName="container">
        <div className="row justify-content-center mt-5">
        <div className="col-md-6">
        <div className="card">
        <div className="card-header bg-primary text-white">
        <h1 className="text-center"><i className="fas fa-user"></i> User Login</h1>
        </div>
        <div className="card-body">
        <form onSubmit={handleForm}>
        <div className="form-group">
        <label for="txtUnm">Username:</label>
        <input type="text" className="form-control" id="txtUnm" name="txtUnm" 
        value={userDetails.emailId}
        onChange={(e)=>{handlChange(e,'emailId')}}
        />
        </div>
        <div className="form-group">
        <label for="txtPwd">Password:</label>
        <input type="password" className="form-control" id="txtPwd" name="txtPwd" 
        value={userDetails.password}
        onChange={(e)=>{handlChange(e,'password')}}
        />
        </div>
        <div classNameName="d-flex justify-content-center mt-2">
        <button type="submit"  className="btn btn-outline-danger btn-block me-2 mt-2"
        >Login</button>
        <button type="reset" onClick={resetField} className="btn btn-outline-info btn-block me-2 mt-2"
        >Reset</button>
        <p class="mt-3 text-center">New User? <a href="#"onClick={handleSignUp}>Signup</a></p>
        </div>
        
        </form>
        
        </div>
        </div>
        </div>
        </div>
        <ToastContainer/>
        </div>
        
        ); 
        
        }
        
        
export default Login;