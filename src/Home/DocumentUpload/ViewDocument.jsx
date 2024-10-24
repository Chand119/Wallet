import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import axios from "axios";
import { toast } from "react-toastify";

const ViewDocumnet=()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    const customerId=user.customerId;
    const [documents,setDocuments]=useState([]);
    
    const fetchDocs=async ()=>{
        try{
            const response=await axios.get(`http://localhost:9291/documents/viewdoc/${customerId}`);
        setDocuments(response.data.data);
        }
        catch(error){
            toast.error('cannot fetch docs');
        }
    }
    const deleteImage= async(fileName)=>{
        confirm('really');
     
      try{
        const response= await axios.get(`http://localhost:9291/documents/deletedoc/${fileName}/${customerId}`);
        toast.success("Document Deleted Successfully");
        fetchDocs();
      }
catch(error){
toast.error("Cannot Delete the Document!!!");
}
    }
    useEffect(()=>{
        fetchDocs();
    },[]);
    return(
       

        <>
        <Header/>
        <h1>Documents Viewer!!!</h1>
        {
            documents.length==0?(
                <div className="alert alert-warning" role="alert">
                    No Documents Uploaded Till Yet...
                </div>

            ):(
                <div className="row">
                    {
                        documents.map((path,index)=>{
                            const fileName=path.split('\\').pop();
                            const imageURL = `http://localhost:9291/images/${fileName}`

                            return(
                                <div 
                                key={index}
                                className="col-lg-3 mb-4 mt-4">
                                    <div className="card ">
                                        <img src={imageURL} alt={fileName} className="card-img-top mt-2"/>
                                        <div className="card-body imgcard">
                                            <h5 className="card-title">{fileName}</h5>
                                            <button className="btn btn-danger" onClick={()=>deleteImage(fileName)}>Delete</button>
                                            <a href={`http://localhost:9291/images/${fileName}`} className="btn btn-primary ms-2">View Image</a>

                                        </div>
                                    </div>

                                </div>
                        
                            )
                        })
                    }
                </div>
            )
           
        }

        <Footer/>
        </>
    )
}
export default ViewDocumnet;