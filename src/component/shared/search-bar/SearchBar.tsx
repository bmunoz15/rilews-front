import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase, styled, useMediaQuery, useTheme } from '@mui/material';

const SearchContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'width 0.3s ease',
}));

const StyledSearchIcon = styled(SearchIcon)(({ }) => ({
    color: '#808080',
    cursor: 'pointer',
    padding: '8px',
}));

const SearchInput = styled(InputBase)(({ }) => ({
    flex: 1,
    border: 'none',
    outline: 'none',
    paddingLeft: '8px',
    paddingRight: '8px'
}));

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expanded, setExpanded] = useState(false);
    const theme = useTheme();
    const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));
    const containerRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            alert(`Buscando: ${searchTerm}`);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleIconClick = () => {
        if (isSmallDevice) {
            setExpanded(!expanded);
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        if (isSmallDevice) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSmallDevice]);

    return (
        <SearchContainer ref={containerRef} style={{ width: isSmallDevice && !expanded ? '40px' : 'auto' }}>
            <StyledSearchIcon onClick={handleIconClick} />
            {(!isSmallDevice || expanded) && (
                <SearchInput
                    placeholder="Ingresa búsqueda"
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                    value={searchTerm}
                />
            )}
        </SearchContainer>
    );
};

export default SearchBar;