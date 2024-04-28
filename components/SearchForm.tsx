import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';

interface Props {
    onSearch: (query: string) => void;
}

const SearchForm: React.FC<Props> = ({ onSearch }) => {
    const router = useRouter();
    const [query, setQuery] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSearch(query);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/?query=${encodeURIComponent(query)}`);
    };

    return (
        <div className="search-form container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <div className="input-group-append">
                    <button type="submit" className="btn btn-outline-danger btn-lg">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
