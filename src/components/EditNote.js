import React from 'react'
import NoteContext from '../context/notecontext';
import { useContext,useState,useRef } from 'react';   

const EditNote = (props)=>{
  const[title,settitle]=useState("");
  const[description,setdescription]=useState("");

const handlechanget = (e)=>{
  settitle(e.target.value);
}
const handlechanged = (e)=>{
  setdescription(e.target.value);
}

   return(
<div>

<button ref={props.modalref} type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div>
      
        <form>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={handlechanget}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" onChange={handlechanged}/>
  </div>
 
</form>

    </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
</div>
   )
}

export default EditNote
