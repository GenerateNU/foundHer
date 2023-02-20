import React from 'react';
import { useSelector } from 'react-redux';

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);

  return <>{currentUser && <h1>Welcome new user: {currentUser.username}</h1>}</>;
}
