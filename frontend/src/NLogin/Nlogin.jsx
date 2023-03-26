import"./nlogin.css"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../context/globalContext";

export const Nlogin =()=> {
    const{login} = useGlobalContext()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const newUser = {
    username: username,
    password: password,
  };
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
   login(newUser,navigate)
   
  };
    return(<div className="nlogin">
        <div className="login">
      <div className="avatar">
        <img/>
      </div>
      <h2>Login</h2>
      <h3>Welcome back</h3>

      <form className="login-form" onSubmit={handleLogin}>
        <div className="textbox">
          <input style={{color:"black",border: "3px solid #ffffff"}} type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
          
        </div>
        <div className="textbox">
          <input style={{color:"black",border: "3px solid #ffffff"}} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
          
        </div>
        <button type="submit">LOGIN</button>
        
        <Link className="login-register-link" to="/register">
        Sign Up
      </Link>
      </form>
    </div>
    
    </div>)
}