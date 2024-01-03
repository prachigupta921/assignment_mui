import React,{useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../redux/Action/Login';

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("")
  const dispatch =useDispatch();
  const navigate=useNavigate();
  console.log(email,password);
  const {loginAction:error}=useSelector((store)=>store.login)
  console.log(error,"login....");

  const handleLogin=()=>{
    const userObj = {
      userName: email,
      password: password
    }
    dispatch(LoginAction(userObj,navigate))
  }
  return (
    <div>
      <input value={email} onChange={(e)=>setEmail(e.target.value)} type='text' placeholder='Enter Email'/>
      <input value={password} onChange={(e)=>setPassword(e.target.value)} type='text' placeholder='password'/>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
