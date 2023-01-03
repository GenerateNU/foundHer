import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "./thunks.js";
import {Navigate, useNavigate} from "react-router";
import React from "react";


let _token = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;
const getToken = async () => {
    if (!_token) {
        return null;
    }

    return _token && _token.accessToken;
};

const isLoggedIn = () => {
    return !!_token;
};
let observers = [];
const subscribe = (observer) => {
    observers.push(observer);
};

const unsubscribe = (observer) => {
    observers = observers.filter(_observer => _observer !== observer);
};
const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach(observer => observer(isLogged));
};
const setToken = (token) => {
    if (token) {
        localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    } else {
        localStorage.removeItem('REACT_TOKEN_AUTH');
    }
    _token = token;
    notify();
};

const createTokenProvider = () => {

    /* Implementation */

    return {
        getToken,
        isLoggedIn,
        setToken,
        subscribe,
        unsubscribe,
    };
};

const tokenProvider = createTokenProvider();


const Login = () => {
    const {currentUser} = useSelector((state) => state.users)
    const [username, setUsername] = useState('alice')
    const [password, setPassword] = useState('alice1234')
    const dispatch = useDispatch()
    const handleLoginBtn = () => {
        try {
            dispatch(loginThunk({username, password}))
        } catch (e) {

        }
    }
    if (currentUser) {
        return (<Navigate to={'/profile'}/>)
    }
    return(
        <>
            <h1>Login</h1>
            Username
            <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="username"
                value={username}/>
            Password
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control" placeholder="password" type="password" value={password}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleLoginBtn}>Login</button>
        </>
    )
}
export default Login