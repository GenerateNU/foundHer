import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

export default function Profile() {
  const { currentUser } = useSelector((state: any) => state.users);
  // const dispatch = useDispatch<any>()

  try {
    useEffect(() => {
      // dispatch(profileThunk(localStorage.getItem("access_token")))
    }, []);
  } catch (e) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      Profile
      {currentUser && <h1>Welcome, {currentUser.username}</h1>}
    </>
  );
}
