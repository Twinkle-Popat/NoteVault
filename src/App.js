import './App.css';
import {
 
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notestate';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import UserState from './context/userState';


function App() {
  return (

    <>
    <NoteState>
    <Navbar/>
    {/* <Alert message={"File is successfully deleted"}/> */}

    <div className="container">
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route exact path="/about" element={<About/>}/>
    
    <Route exact path="/login" element={<Login/>}/>
  <Route exact path="/signup" element={<Signup/>}/>
          

         
</Routes>
</div>
    
</NoteState>

    </>
  );
}

export default App;
