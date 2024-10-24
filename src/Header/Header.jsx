import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logout } from '../store/authSlice';

const Header =()=>{

    const navigate= useNavigate();
    const dispatch=useDispatch();

    const handleLogoutButton=()=>{
      dispatch(logout());

        toast.success("LogOut Successfully!!");
        navigate('/');
    }

    const handleDocumnet=()=>{
      navigate('/Upload');
    }
    const handleLoginButton=()=>{
navigate('/CreateAccount')
    }

    const handleWithdraw=()=>{
        navigate('/Withdraw')
            }

            const handleTransaction=()=>{
  navigate('/Transaction')
  }
  const handleAllAccount = ()=>{
    navigate('/AllAccount');
  }
  const handleViewDocument=()=>{
    navigate('/ViewDocuments');
  }

  const handleDeposit=()=>{
    navigate('/Deposit')
        }

        const handleFundTransfer=()=>{
            navigate('/fundtransfer')
                }
                const handleHome=()=>{
                  navigate('/Home');
                }

   return(
    <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleHome}>Home</a></li>
          {/* <li><a href="#" class="nav-link px-2 text-white" onClick={handleTransaction}>Transactions</a></li> */}
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleWithdraw}>Withdraw</a></li>
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleDeposit}>Deposit</a></li>
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleFundTransfer}>Fund Transfer</a></li>
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleAllAccount}>Manage Accounts</a></li>
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleDocumnet}>Upload Documents</a></li>
          <li><a href="#" class="nav-link px-2 text-white" onClick={handleViewDocument}>View Documents</a></li>
        </ul>

    

        <div class="text-end">
          <button type="button" class="btn btn-outline-light rounded-pill  me-2 "onClick={handleLoginButton}>Create Account</button>
          <button type="button" class="btn btn-warning rounded-pill  " onClick={handleLogoutButton}>Logout</button>
        </div>
      </div>
    </div>
    <ToastContainer/>
  </header>

   )

}
export default Header;