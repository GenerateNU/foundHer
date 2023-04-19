import React, { useState } from "react";

function SearchBar(props: { onSearchQueryChange: (arg0: React.SetStateAction<string>) => void; }) {
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearchInputChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setSearchQuery(event.target.value);
    props.onSearchQueryChange(event.target.value);
  }

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="Search..."
    />
  );
}

export default SearchBar;