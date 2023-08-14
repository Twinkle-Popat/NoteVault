import React, {useContext,useState} from "react";
import NoteContext from '../context/notecontext';


const Signup = () => {
  

  const context = useContext(NoteContext);
  const {signupuser} = context;

const[details,setdetails]=useState({name:"",email:"",password:""});

const handlechange=(e)=>{
  setdetails({...details, [e.target.name]: e.target.value});
}

const handleclick=(e)=>{
  e.preventDefault();
  signupuser(details.name,details.email,details.password);
}
  return (
    <>
    <div className="container my-3">
    <form className="row g-3 needs-validation my-3" >
  <div className="conatiner my-3">
    <label htmlFor="validationCustom01" className="form-label">Your Name</label>
    <input type="text" name="name"  onChange={handlechange} className="form-control" id="name" value={details.name} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
 
  <div className="container my-3">
    <label htmlFor="validationCustomUsername" className="form-label">Email</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">✉️</span>
      <input type="email" id="email" name="email" onChange={handlechange} value={details.email} className="form-control"  aria-describedby="inputGroupPrepend" required/>
      <div className="invalid-feedback">
       
      </div>
    </div>
  </div>
 
 
  <div className="container my-3">
    <label htmlFor="validationCustom05" className="form-label">Password</label>
    <input type="password" id="password" name="password" onChange={handlechange} value={details.password} className="form-control"  required/>
   
  </div>
  <div className="col-12">
 
  </div>
  <div className="col-12">
    <button className="btn btn-primary" onClick={handleclick} type="submit">Submit form</button>
  </div>
</form>
</div>
    </>
    );
}

export default Signup;