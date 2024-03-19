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

    const handleSubmit= (event) => {
        console.log('handleSubmit', event);
    };

    return (
        <div className="search-form container">
            <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress} />
                <div className="input-group-append">
                    <button className="btn btn-outline-danger btn-lg" onClick={handleSearch} type="submit">Search</button>
                </div>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;