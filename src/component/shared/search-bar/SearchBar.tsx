import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Box, InputBase, styled } from '@mui/material';

const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '5px',
    padding: '5px 10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const SearchIcon = styled(FaSearch)(({ theme }) => ({
    marginRight: '10px',
    color: theme.palette.text.secondary,
    fontSize: '20px',
}));

const SearchInput = styled(InputBase)(({ }) => ({
    flex: 1,
    padding: '5px',
    border: 'none',
    outline: 'none',
}));

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            alert(`Buscando: ${searchTerm}`);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <SearchContainer>
            <SearchIcon />
            <SearchInput
                placeholder="Ingresa búsqueda"
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                value={searchTerm}
            />
        </SearchContainer>
    );
};

export default SearchBar;