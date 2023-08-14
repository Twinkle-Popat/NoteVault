import React from 'react'
import { useContext,useEffect } from 'react';   
import NoteContext from '../context/notecontext';
import { useState } from 'react';

const AddNote = () => {
    const context = useContext(NoteContext);
  const {addnote} = context;
  const[title,settitle]=useState("");
    const[description,setdescription]=useState("");

const handlechanget = (e)=>{
    settitle(e.target.value);
}
const handlechanged = (e)=>{
    setdescription(e.target.value);
}
const handleclick = (e)=>{
    e.preventDefault();
    addnote(title,description,"#dustin");
    settitle("");
    setdescription("");
}

  return (
    
    <div>
       <h2>Add a Note</h2>
        <form>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" value={title} id="title"  onChange={handlechanget}/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" value={description} id="description" onChange={handlechanged}/>
  </div>
 
  <button disabled={title.length<5 || description.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Submit</button>
</form>

    </div>
  )
}



export default AddNote
