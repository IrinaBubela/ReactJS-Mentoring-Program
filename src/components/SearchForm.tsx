import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Outlet } from 'react-router-dom';

interface Props {
    initialQuery: string;
    onSearch: (query: string) => void;
}

const SearchForm: React.FC<Props> = ({ initialQuery, onSearch }) => {
    const [query, setQuery] = useState<string>(initialQuery);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(query);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
          onSearch(query);
        }
    };

    const handleSubmit= (event: React.FormEvent) => {
        event.preventDefault();
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
            
            <Outlet />
        </div>
    );
};

export default SearchForm;
