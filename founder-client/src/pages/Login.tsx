import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../user/thunks"
import {Navigate, useNavigate} from "react-router";
import React from "react";

const Login = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch<any>()
    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}));
        } catch (e) {
        }
    }
    if (currentUser) {
      localStorage.setItem('access_token', currentUser.access_token)
      return (<Navigate to={'/profile'}/>)
    }
  return (
    <>
      <h1>Login</h1>
      Username
      <input
        onChange={e => setUsername(e.target.value)}
        className='form-control'
        placeholder='username'
        value={username}
      />
      Password
      <input
        onChange={e => setPassword(e.target.value)}
        className='form-control'
        placeholder='password'
        type='password'
        value={password}
      />
      <button className='btn btn-primary w-100' onClick={handleLoginBtn}>
        Login
      </button>
    </>
  );
};
export default Login;