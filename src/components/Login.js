import React, { useState,useContext } from "react";
import NoteContext from '../context/notecontext';


const Login = () => {
    const context = useContext(NoteContext);
    const {loginuser} = context;
    const [email,setemail]=useState("");
    const [pass,setpass]=useState("");

    const handlechange = (e)=>{
        setemail(e.target.value);
    }
    const handlechangep=(e)=>{
        setpass(e.target.value);
    }
    const handlesubmit = (e)=>{
        e.preventDefault();
        loginuser(email,pass);
    }




  return (
    <>
    <div className="conatiner my-3">
  
<label htmlFor="formGroupExampleInput" className="form-label my-3">Email</label>
 <div className="input-group has-validation">
 
      <span className="input-group-text" id="inputGroupPrepend">✉️</span>
      
      <input type="email" value={email} onChange={handlechange} className="form-control" name="email "id="validationCustomUsername" aria-describedby="inputGroupPrepend" required/>
      </div>    
<div className="mb-3 my-3">
  <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
  <input type="password" value={pass} name="password" onChange={handlechangep}  className="form-control" id="formGroupExampleInput2" />
</div>
<div className="col-12 my-3">
    <button className="btn btn-primary" onClick={handlesubmit} type="submit">Login</button>
 
</div>
</div>
    </>
    );
}

export default Login;