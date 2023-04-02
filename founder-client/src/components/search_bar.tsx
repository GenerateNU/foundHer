import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function SearchBar(props: { onSearchQueryChange: (arg0: React.SetStateAction<string>) => void; }) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<any>();
  const handleSubmitBtn = () => {
    try {
      dispatch({searchQuery});
    } catch (e) {}
  };
  
  function handleSearchInputChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSearchQuery(event.target.value);
    props.onSearchQueryChange(event.target.value);
  }

  return (
    <div>
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="Search..."
    />
    <button className='submitButton' onClick={handleSubmitBtn}>
          Submit
        </button>
    </div>
  );
}


export default SearchBar;