import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerThunk} from "../../user/thunks";
import {Navigate, useNavigate} from "react-router";
import {BottomLine, NeedHelpContactUs} from "../../util/util";
const EmployerRegister = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company_name, setCompanyname] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<any>()
    const handleRegisterBtn = () => {
        dispatch(registerThunk({username, password, email, company_name, is_applicant: false}))
    };
    
    if (currentUser) {
        navigate("/profile");
    }  
    
    return(
        <div className="box">
            <div className="title">Create an Account</div>
            <div className="description">as an Employer</div>
            <div className="">
                <input
                onChange={(e) => setCompanyname(e.target.value)}
                className="form-control field"
                placeholder="Company Name"
                value={company_name}/>
            </div>

            <div className="">
                <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control field"
                placeholder="Username"
                value={username}/>
            </div>
            
            <div className="">
                <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control field"
                placeholder="Email"
                value={email}/>    
            </div>
            <div>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control field"
                placeholder="Password"
                type="password"
                value={password}/>
            </div>
            
            <div className="">
            <input
                className="form-control field"
                placeholder="Confirm Password"
                type="password"
                />
            </div>

            <button className="btn btn-primary button"
                onClick={handleRegisterBtn}>
                Create Account
            </button>

            <BottomLine/>
            <NeedHelpContactUs/>
        </div>
  );
}
export default EmployerRegister;
