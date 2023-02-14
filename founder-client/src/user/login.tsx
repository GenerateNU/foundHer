// import {useState} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {loginThunk} from "./thunks.js";
// import {Navigate, useNavigate} from "react-router";
// import React from "react";

<<<<<<< HEAD


// const Login = () => {
//     const {currentUser} = useSelector((state) => state.users)
//     const [username, setUsername] = useState('phamlo')
//     const [password, setPassword] = useState('password')
//     const dispatch = useDispatch()
//     const handleLoginBtn = () => {
//         try {
//             dispatch(loginThunk({username, password}))
//         } catch (e) {
=======
const Login = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const [username, setUsername] = useState('phamlo')
    const [password, setPassword] = useState('password')
    // const dispatch = useDispatch<any>()
    const handleLoginBtn = () => {
        try {
            // dispatch(loginThunk({username, password}))
        } catch (e) {
>>>>>>> frontend/ts-refactor

//         }
//     }
//     if (currentUser) {
//         localStorage.setItem('access_token', currentUser.access_token)
//         return (<Navigate to={'/profile'}/>)
//     }
    
//     return(
//         <>
//             <h1>Login</h1>
//             Username
//             <input
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="form-control"
//                 placeholder="username"
//                 value={username}/>
//             Password
//             <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="form-control" placeholder="password" type="password" value={password}/>
//             <button
//                 className="btn btn-primary w-100"
//                 onClick={handleLoginBtn}>Login</button>
//         </>
//     )
// }

// export default Login

// let _token: { accessToken: string, refreshToken: string } = JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || '') || null;
// const getExpirationDate = (jwtToken?: string): number | undefined => {
//     if (!jwtToken) {
//         return undefined;
//     }

//     const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

//     // multiply by 1000 to convert seconds into milliseconds
//     return jwt && jwt.exp && jwt.exp * 1000 || null;
// };

// const isExpired = (exp?: number) => {
//     if (!exp) {
//         return false;
//     }

//     return Date.now() > exp;
// };

// const getToken = async () => {
//     if (!_token) {
//         return null;
//     }

//     if (isExpired(getExpirationDate(_token.accessToken))) {
//         const updatedToken = await fetch('/update-token', {
//             method: 'POST',
//             body: _token.refreshToken
//         })
//             .then(r => r.json());

//         setToken(updatedToken);
//     }

//     return _token && _token.accessToken;
// };

// const isLoggedIn = () => {
//     return !!_token;
// };

// let observers: Array<(isLogged: boolean) => void> = [];
// const subscribe = (observer: (isLogged: boolean) => void) => {
//     observers.push(observer);
// };

// const unsubscribe = (observer: (isLogged: boolean) => void) => {
//     observers = observers.filter(_observer => _observer !== observer);
// };
// const notify = () => {
//     const isLogged = isLoggedIn();
//     observers.forEach(observer => observer(isLogged));
// };
// const setToken = (token: typeof _token) => {
//     if (token) {
//         localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
//     } else {
//         localStorage.removeItem('REACT_TOKEN_AUTH');
//     }
//     _token = token;
//     notify();
// };
