import NoteContext from "./notecontext";
import { useState,useEffect } from "react";   
import { useNavigate } from 'react-router-dom';


const NoteState = (props) => {
    const notesinitail=[]
      const [notes, setnotes] = useState(notesinitail);
      const navigate = useNavigate();


    //Get all notes
  const getnotes = async ()=>{

      const response = await fetch(`http://localhost:5000/api/notes/fetchnotes`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
      }
      
    });

     const data = await response.json();
     setnotes(data);

    }

    

    

    //Add a note
    const addnote = async (title,description,tag)=>{

      const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
      },
      
      body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
    });
    // const json = response.json();

      //API call
     const note={
        "_id": "6499a98b418401385fbe7f9056",
          "user": "64901d91489fff2092e1a6221",
          "title": title,
          "description": description,
          "tag": "#dustin",
          "date": "2023-06-26T15:06:51.996Z",
          "__v": 0
      }
      setnotes(notes.concat(note));
      

    }
    //Edit a note



    
    const editnote = async (id,title,description,tag)=>{


      const response = await fetch(`http://localhost:5000/api/notes/updatenotes/${id}`, {
        method:'PUT',
        headers: {
          "Content-Type": "application/json",
         "auth-token":localStorage.getItem('token')
        },
        
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const json = response.json();
      console.log(json);


   let newnotes = JSON.parse(JSON.stringify(notes))
      for(let i=0;i<newnotes.length;i++){
        if(newnotes[i]._id===id){
          newnotes[i].title=title;
          newnotes[i].description=description;
          newnotes[i].tag=tag;
          break;
        }
      }
      console.log(newnotes);
      setnotes(newnotes)
    }

    
    //Delete a note
    const deletenote = async(id)=>{
      const response = await fetch(`http://localhost:5000/api/notes/deletenotes/${id}`, {
      method:'DELETE',
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
      }

      
       // body data type must match "Content-Type" header
    });

      const json = response.json();
      
      const filterednotes = notes.filter((item) => item._id !== id);
      setnotes(filterednotes);
      console.log("deleted");


    }

    //Auth.js 

    const loginuser = async (email,password)=>{

      const response = await fetch(`http://localhost:5000/api/auth/authenticate`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })

    });

    
    const json=await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.authtoken)
    }
    navigate('/');

    

    }

  const signupuser = async (name,email,password)=>{

      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method:'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name,email, password })

    });

    
    const json1=await response.json();
    console.log(json1);
    navigate('/login');

    console.log("Signed up");
    

    }

    
    
    return(
        <NoteContext.Provider value={{notes,setnotes,addnote,editnote,deletenote,getnotes,loginuser, signupuser}}>
            {props.children}
        </NoteContext.Provider> 
    )
}

export default NoteState;