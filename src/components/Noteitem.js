import React from 'react'
import NoteContext from '../context/notecontext';
import { useContext,useEffect } from 'react';   


const Noteitem = (props) => {
  const context = useContext(NoteContext);
  const {deletenote,editnote} = context;

    const {note,updatenotes} = props;

    const deletenotes = ()=>{
      deletenote(note._id)
    }
    const editnotes = ()=>{
      editnote(note._id,note.title,note.description,note.tag)
    }
  return (
    
    <div className='col-md-3 my-3'>
      <div className="card ">
 
  <div className="card-body ">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash" onClick={deletenotes}></i>
    <i className="fa-solid fa-pen-to-square mx-3" onClick={()=>updatenotes(note)}></i>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
    </div>
   
  )
}

export default Noteitem
