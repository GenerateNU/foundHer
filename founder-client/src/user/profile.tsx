// import {useState, useEffect} from "react";
// import {useDispatch, useSelector} from "react-redux";
// import React from "react";
// import { profileThunk } from "./thunks";
// import {Navigate, useNavigate} from "react-router";

<<<<<<< HEAD
// const Profile = () => {
//     const {currentUser} = useSelector((state) => state.users)
//     const dispatch = useDispatch()
=======
const Profile = () => {
    const {currentUser} = useSelector((state: any) => state.users)
    const dispatch = useDispatch<any>()
>>>>>>> frontend/ts-refactor
    
//     try {
//         useEffect(() => {
//             dispatch(profileThunk(localStorage.getItem("access_token")))
//           }, [])
//     } catch (e) {
//         return (<Navigate to={'/login'}/>)
//     }
    

//     return (
//         <>
//             Profile
//             {
//                 currentUser &&
//                 <h1>Welcome, {currentUser.username}</h1>
//             }
//         </>
//     )
// }
// export default Profile;