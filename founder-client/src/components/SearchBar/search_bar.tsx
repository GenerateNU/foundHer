import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import './search_bar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

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
    
    <div className = "search-bar">
    <FontAwesomeIcon icon={faMagnifyingGlass} />
    <input className="input"
      type="text"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="Search"
    />
    <button className='submitButton' onClick={handleSubmitBtn}>
          Submit
        </button>
    </div>
  );
}


export default SearchBar;