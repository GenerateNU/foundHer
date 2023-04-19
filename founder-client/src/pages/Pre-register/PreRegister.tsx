import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loginThunk} from "../../services/user/thunks"
import {Navigate, useNavigate} from "react-router-dom";
import './preregister.css';
import {BottomLine, NeedHelpContactUs} from "../../util/util";
const PreRegister = () => {
    const navigate = useNavigate();

    const handleNavigateButtonApplicant = () => {
        return navigate("/register-applicant");
    }

    const handleNavigateButtonEmployer = () => {
        return navigate("/register-employer");
    }

    return (<div className="background"><div className="box">
        <div className="title">
            Create an Account
        </div>
        <div className="description">
            Are you a Job Seeker or an Employer?
        </div>

        <button className="option" onClick={handleNavigateButtonApplicant}>
            Job Seeker
        </button>
        
        <button className="option" onClick={handleNavigateButtonEmployer}>
            Employer
        </button>

        <BottomLine />
        <span>
        <NeedHelpContactUs/>
        </span>
    </div></div>)
}

export default PreRegister;