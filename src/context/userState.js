import UserContext from "./userContext";

const UserState = (props) => {
    

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
      console.log("logged in")
      
  
      }

    const signupuser = async (name,email,password)=>{

        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method:'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name,email, password })

      });
  
      
      const json=await response.json();
      console.log(json);
      console.log("Signed up")
      
  
      }



    return(
        <UserContext.Provider value={{loginuser,signupuser}}>
        {props.children}
    </UserContext.Provider> 
    );
}

export default UserState;