import React, { useState } from "react";

function Search({onSearch}) {
    const [currentSearch, setCurrentSearch] = useState("");
    
    function handleSubmit(e) {
        e.preventDefault();
        onSearch(currentSearch); 
    }
    return (
        //search bar form
        <form className="searchbar" onSubmit={handleSubmit}>
            <input
            type="text"
            id="search"
            placeholder="search restaurant info"
            value={currentSearch} 
            onChange={(e) => setCurrentSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search;