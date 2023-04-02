import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SearchBar from '../components/search_bar';

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.users);
  const [search, setSearch] = useState("");
  return <>{currentUser && <h1>Welcome new user: {currentUser.username}</h1>} 
  <SearchBar onSearchQueryChange={setSearch}/> <p>{search}</p></>;
}