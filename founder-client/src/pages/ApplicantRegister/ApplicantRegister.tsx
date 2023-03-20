import {useState, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {registerApplicantThunk} from "../../user/thunks";
import {Navigate, useNavigate} from "react-router-dom";
import {BottomLine, NeedHelpContactUs} from "../../util/util";
import "./applicantregister.css";


const ApplicantRegister = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [institution, setInstitution] = useState('');
    const [latest_job_title, setLatestJobTitle] = useState('');
    const [latest_company, setLatestCompany] = useState('');
    const [resume_file, setResumeFile] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const handleRegisterBtn = () => {
        dispatch(registerApplicantThunk({fullname, username, 
                                password, email, city, state, country, institution, 
                                latest_company, latest_job_title}))
    };

    if (currentUser) {
        localStorage.setItem('access_token', currentUser.access_token);
        localStorage.setItem('currentUserID', currentUser.id);
        navigate("/profile");
    }
    
    return(
        <div className="box">
            <div className="title">Create an Account</div>
            <div className="description">as a Job Seeker</div>
            <div className="">
                <input
                onChange={(e) => setFullname(e.target.value)}
                className="form-control field"
                placeholder=" Full Name"
                value={fullname}/>
            </div>

            <div className="">
                <input
                onChange={(e) => setUsername(e.target.value)}
                className="form-control field"
                placeholder=" Username"
                value={username}/>
            </div>
            
            <div className="">
                <input
                onChange={(e) => setEmail(e.target.value)}
                className="form-control field"
                placeholder=" Email"
                value={email}/>    
            </div>
            <div>
            <input
                onChange={(e) => setPassword(e.target.value)}
                className="form-control field"
                placeholder=" Password"
                type="password"
                value={password}/>
            </div>
            
            <div className="">
            <input
                className="form-control field"
                placeholder=" Confirm Password"
                type="password"
                />
            </div>

            <div>
            <input
                onChange={(e) => setState(e.target.value)}
                className="form-control field"
                placeholder="state"
                value={state}/>
            </div>

            <div>
            <input
                onChange={(e) => setCity(e.target.value)}
                className="form-control field"
                placeholder="city"
                value={city}/>
            </div>

            <div>
            <input
                onChange={(e) => setCountry(e.target.value)}
                className="form-control field"
                placeholder="country"
                value={country}/>
            </div>

            <div>
            <input
                onChange={(e) => setLatestCompany(e.target.value)}
                className="form-control field"
                placeholder="latest company"
                value={latest_company}/>
            </div>

            <div>
            <input
                onChange={(e) => setInstitution(e.target.value)}
                className="form-control field"
                placeholder="institution"
                value={institution}/>
            </div>

            <div>
            <input
                onChange={(e) => setLatestJobTitle(e.target.value)}
                className="form-control field"
                placeholder="latest job title"
                value={latest_job_title}/>
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
export default ApplicantRegister;
