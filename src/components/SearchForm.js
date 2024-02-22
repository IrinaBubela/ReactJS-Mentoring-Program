import React, {useState} from 'react';

export const SearchForm = ({initialQuery, onSearch}) => {
    const [query, setQuery] = useState(initialQuery);

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          onSearch(query);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchForm;