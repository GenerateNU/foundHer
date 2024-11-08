import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import { profileThunk, logoutThunk } from "../../services/user/thunks";
import {Navigate, useNavigate} from "react-router-dom";
import "./profile.css"
const Profile = () => {
    const {currentUser} = useSelector((state: any) => state.users);
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    try {
        useEffect(() => {
            dispatch(profileThunk(localStorage.getItem("access_token")))
          }, [])
    } catch (e) {
        return (<Navigate to={'/login'}/>)
    }
    
    const handleLogoutBtn = () => {
        dispatch(logoutThunk());
        localStorage.removeItem("access_token");
        localStorage.removeItem("currentUserID")
        navigate("/login");
    }

    return (
        <div className="box main">
            {
                currentUser &&
                <h1>Welcome, {currentUser.username}</h1>
            }

            <button
                className="btn btn-primary w-100"
                onClick={handleLogoutBtn}>Logout</button>
        </div>
    )
}
export default Profile;
