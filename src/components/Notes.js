import React from 'react';
import { useContext,useEffect,useRef,useState } from 'react';
import NoteContext from '../context/notecontext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';




const Notes = () => {
  const context = useContext(NoteContext);
  const {notes,getnotes,editnote} = context;
  const modalref = useRef(null);
  const closeref = useRef(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getnotes();
  }
  else{
    navigate('/login');
  }
},[])

//   const[title,settitle]=useState("");
//   const[description,setdescription]=useState("");

// const handlechanget = (e)=>{
//   settitle(e.target.value);
// }
// const handlechanged = (e)=>{
//   setdescription(e.target.value);
// }

const [note,setNote]  =useState({eid:"",etitle:"", edescription:"",etag:""});
 const onChanget=(e)=>{
  setNote({...note,[e.target.name]:e.target.value});
 }

 const handleclick=(e)=>{
  e.preventDefault();
  editnote(note.eid,note.etitle,note.edescription,note.etag);
    closeref.current.click();
    
 }

  const updatenotes=(currentNote)=>{
    modalref.current.click();
    setNote({eid:currentNote._id,etitle: currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
  }
  return (
    <>
    <AddNote/>
    <button ref={modalref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div>
      
        <form>
  <div className="mb-3 my-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" name="etitle"value={note.etitle} id="etitle" aria-describedby="emailHelp" onChange={onChanget}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
    <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChanget}/>
  </div>
 
</form>

    </div>
      </div>
      <div className="modal-footer">
        <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={handleclick} className="btn btn-primary">Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className='container row my-3'>
      <h1>Your notes</h1>
      <div className="container">
        {notes.length===0 && 'No Notes to Display'}
      </div>
      {notes.map((noteItem)=>{
  return <Noteitem key={noteItem._id} updatenotes={updatenotes}  note={noteItem}/>
})}
    </div>
    </>
  )
}

export default Notes
