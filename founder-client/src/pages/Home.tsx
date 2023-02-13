import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import React from "react";

const Home = () => {
    const {currentUser} = useSelector((state: any) => state.users)

    return (
        <>
            {
                currentUser &&
                <h1>Welcome new user: {currentUser.username}</h1>
            }
        </>
    )
}
export default Home