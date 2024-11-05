import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => { 
 const [formData,setFormData]=useState({
    firstName: "",
      lastName: "",
      emailId: "",
      contactNo: "",
      gender: "",
      password: "",
      confirmPassword: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      pincode: "",
      state: ""
})
const navigate=useNavigate();
const handleFormChange=(event)=>{
    let {name,value}=event.target;
    setFormData({
        ...formData,
        [name]:value
    })
}
const handleForm= async(event)=>{
    event.preventDefault();
  
    try{
        const response= await axios.post('http://localhost:9291/customer/createcustomer',formData);
        toast.success(response.data.message+"/n Now Go and Login with your email and password");
       
    }
catch(error){
    resetForm();
toast.error("Signup Failed");

}
}

const resetForm=()=>{
    setFormData({
        firstName: "",
        lastName: "",
        emailId: "",
        contactNo: "",
        gender: "",
        password: "",
        confirmPassword: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        pincode: "",
        state: ""
    });
}














    return (
        <div className="container">
            <form onSubmit={handleForm}>
                <div className="text-center">
                    <h1 className="mb-4">Registration For Wallet App</h1>
                    <h4>* Fields Are Required</h4>
                </div>
                <div className="form-group">
                    <label htmlFor="txtFnm">First Name*</label>
                    <input type="text" className="form-control" id="txtFnm" name="firstName" placeholder="eg Chand" maxLength="50" required
                    value={formData.firstName}
                    onChange={handleFormChange}
                     />
                </div>
                <div className="form-group">
                    <label htmlFor="txtLnm">Last Name</label>
                    <input type="text" className="form-control" id="txtLnm" name="lastName" placeholder="eg Sharma" maxLength="50" 
                    value={formData.lastName}
                    onChange={handleFormChange}
                    />

                </div>
                <div className="form-group">
                    <label htmlFor="txtEmail">Email*</label>
                    <input type="email" className="form-control" id="txtEmail" name="emailId" placeholder="eg Cs@gmail.com" required
                    value={formData.emailId}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txtAdd1">Address Line 1*</label>
                    <input type="text" className="form-control" id="txtAdd1" name="addressLine1" placeholder="eg 351 HB Colony" required
                    value={formData.addressLine1}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txtAdd2">Address Line 2</label>
                    <input type="text" className="form-control" id="txtAdd2" name="addressLine2" placeholder="eg 1234 Elm St"
                      value={formData.addressLine2}
                      onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txtState">State*</label>
                    <select className="form-control" id="txtState" name="state" required
                    value={formData.state}
                    onChange={handleFormChange}
                    >
                        <option value="">Select State</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Goa">Goa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="txtCity">City*</label>
                    <select className="form-control" id="txtCity" name="city" required
                    value={formData.city}
                    onChange={handleFormChange}
                    >
                        <option value="">Select City</option>
                        <option value="Panipat">Panipat</option>
                        <option value="Rohtak">Rohtak</option>
                        <option value="Karnal">Karnal</option>
                        <option value="Ambala">Ambala</option>
                        <option value="Bhiwani">Bhiwani</option>
                        <option value="Jhajjar">Jhajjar</option>
                        <option value="Jind">Jind</option>
                        <option value="Kurukshetra">Kurukshetra</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="Pcnm">Postal Code*</label>
                    <input type="tel" className="form-control" id="Pcnm" name="pincode" maxLength="6" placeholder="eg 132103" required
                    value={formData.pincode}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="Pnm">Mobile Number*</label>
                    <input type="tel" className="form-control" id="Pnm" name="contactNo" maxLength="10" placeholder="Mobile Number without country code" required
                    value={formData.contactNo}
                    onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label>Gender*</label>
                    <div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="genderMale" name="gender" value="MALE" required
                             checked={formData.gender === 'MALE'}
                             onChange={handleFormChange}
                            />
                            <label className="form-check-label" htmlFor="genderMale">Male</label>
                        </div>
                        <div className="form-check">
                            <input type="radio" className="form-check-input" id="genderFemale" name="gender" value="FEMALE" required
                             checked={formData.gender === 'FEMALE'}
                             onChange={handleFormChange}
                            />
                            <label className="form-check-label" htmlFor="genderFemale">Female</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="txtPwd">Enter Password*</label>
                    <input type="password" className="form-control" id="txtPwd" name="password" placeholder="minimum 8 characters" minLength="8" required 
                     value={formData.password}
                     onChange={handleFormChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="txtcPwd">Confirm Password*</label>
                    <input type="password" className="form-control" id="txtcPwd" name="confirmPassword" placeholder="confirm password" required
                     value={formData.confirmPassword}
                     onChange={handleFormChange}
                    />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-danger me-2 mt-2">Sign Up</button>
                    <button type="reset" className="btn btn-info ml-2 mt-2" onClick={resetForm}>Reset</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
