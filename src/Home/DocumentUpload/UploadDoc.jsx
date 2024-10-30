import { useRef, useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import { toast } from "react-toastify";
import axios from "axios";


const UploadDoc=()=>{
    const user=JSON.parse(localStorage.getItem('user'));

    const userId=user.customerId;
    const customerId=user.customerId;

    const [upload,setUpload]=useState({
        "DocumentName":"",
        "mfile":null,
        "userId":userId,
    })
    const fileRef=useRef(null);
    const formChange=(event)=>{
const {name,type,value}=event.target;
if(type=='file')
{
    setUpload({
        ...upload,
        mfile:event.target.files[0],
    });
}
else{
    setUpload({
        ...upload,
        [name]:value,
    });
}
    }
    const resetForm=()=>{
        setUpload({
        "DocumentName":"",
        "mfile":null,
        "userId":userId,
        })
        fileRef.current.value="";
    }

    const handleForm=async (event)=>{
        event.preventDefault();
        const checkDoc=await axios.get(`http://localhost:9291/documents/checkdoc/${upload.DocumentName}/${customerId}`);
        if(checkDoc.data.code==226){
         
           const userConfirmed= confirm("Document with this catgeory is already present !Do you want to update it..");
            if (!userConfirmed) {
                resetForm();
                return; 
            }
        }
       
        const formData =new FormData();
        formData.append('DocumentName',upload.DocumentName);
        formData.append('mfile',upload.mfile);
        formData.append('customerId',upload.userId);
        
        try{
           const response=await axios.post('http://localhost:9291/documents/uploaddoc', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
         
     
            toast.success(response.data.message);
           
            resetForm();
           

        }
        catch(error){
            if(error.status==415){
               
                toast.error('only jpg jpeg and png type are required')
            }
        
            resetForm();
        }

        
    }
   

    


    return(
    <>
    <Header/>
    <h1>Upload Your Documents Here !!!</h1>
    <div class="container mt-5">
        <h2>Document</h2>
    <form onSubmit={handleForm}>
   <div class="form-group">
<label htmlFor="docName" className="form-label">Document Name:</label>
<select className="form-select" required
id="DocumentName"
name="DocumentName"
onChange={formChange}
value={upload.DocumentName}
>
<option value="" >Select Document Name</option>
<option value="ADHAR CARD">ADHAR CARD</option>
<option value="PAN CARD">PAN CARD</option>
<option value="SIGNATURE">SIGNATURE</option>
</select>
</div>

<div className="form-group">
<label htmlFor="uploadFile" className="form-label">Upload File</label>
<input className="form-control"  type="file" id="uploadFile" name="mfile"
required

onChange={formChange}
ref={fileRef}


/>
</div>
<div className="form-group">
    <button type="submit" class="btn btn-danger mt-2">Upload</button>
</div>

 </form>

    </div>
    <Footer/>
    </>
    )
}


// first merge
export default UploadDoc;