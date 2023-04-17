import React from 'react';
import { useSelector } from 'react-redux';
import Uploader from '../components/FileUpload/FileUpload';
export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);
  
  return (<div>{currentUser && 
  <h1>Welcome new user: {currentUser.username}</h1>
  } 
  <Uploader/>
  </div>);
}
