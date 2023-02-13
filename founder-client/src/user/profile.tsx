import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import { profileThunk } from "./thunks";
import {Navigate, useNavigate} from "react-router";

const Profile = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const dispatch = useDispatch()
    
    try {
        useEffect(() => {
            dispatch(profileThunk(localStorage.getItem("access_token")))
          }, [])
    } catch (e) {
        return (<Navigate to={'/login'}/>)
    }
    

    return (
        <>
            Profile
            {
                currentUser &&
                <h1>Welcome, {currentUser.username}</h1>
            }
        </>
    )
}
export default Profile;