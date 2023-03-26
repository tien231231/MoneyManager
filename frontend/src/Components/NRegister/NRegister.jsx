import { useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/globalContext";


import "./nregister.css"
export const NRegister = () =>{
  const {register} = useGlobalContext()
  const [email,setEmail] = useState("");
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  
  const navigate = useNavigate();

  const handleSignup= (e)=>{
    e.preventDefault();
    const newUser = {
      email: email,
      password:password,
      username:username
    };
    register(newUser,navigate)
  }  

    return(<div className="nsignup">
         
    
        <div className="signup">
      <div className="avatar">
        <img src="avatar.png" />
      </div>
      <h2>Sign Up</h2>
      <h3>Welcome back</h3>

      <form className="signup-form" onSubmit={handleSignup}>
        <div className="textbox">
          <input style={{color:"black",border: "3px solid #ffffff"}} type="email" placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
          
        </div>
        <div className="textbox">
          <input style={{color:"black",border: "3px solid #ffffff"}} type="username" placeholder="Username" onChange={e=>setUsername(e.target.value)} />
          
        </div>
        <div className="textbox">
          <input style={{color:"black",border: "3px solid #ffffff"}} type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)}/>
          
        </div>
        <button type="submit">SignUp</button>
        <Link className="login-register-link" to="/login">
        Log in
      </Link>
      </form>
    </div>
    
    
    
    </div>)
}