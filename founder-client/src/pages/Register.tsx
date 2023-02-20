import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../user/thunks";
import {Navigate} from "react-router";

const Register = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch<any>()
    const handleRegisterBtn = () => {
        dispatch(registerThunk({username, password, email}))
    };
    
    
    return(
        <>
            <h1>Register</h1>
            <div>
                Username
                <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                placeholder="username"
                value={username}/>
            </div>
            <div>
                Email
                <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="email"
                value={email}/>    
            </div>
            password      
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="password"
                type="password"
                value={password}/>
            <button
                className="btn btn-primary w-100"
                onClick={handleRegisterBtn}>
                Register
            </button>
            {/* {
                currentUser &&
                <h1>Welcome new user: {currentUser.username}</h1>
            } */}
        </>
    )
}
export default Register