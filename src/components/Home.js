import React from 'react';
import { useContext,useEffect } from 'react';
import NoteContext from '../context/notecontext';
import Notes from './Notes';
import AddNote from './AddNote';

const Home = () => {
  

    return (
        <div className="container my-3">

<Notes/>
</div>
    );
}

export default Home;