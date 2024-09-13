import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            alert(`Buscando: ${searchTerm}`);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div style={styles.container}>
            <FaSearch style={styles.icon} />
            <input
                type="text"
                placeholder="Ingresa búsqueda"
                style={styles.input}
                onKeyPress={handleKeyPress}
                onChange={handleChange}
                value={searchTerm}
            />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '5px 10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    icon: {
        marginRight: '10px',
        color: '#888',
        fontSize: '20px', // Aumenta el tamaño del ícono
    },
    input: {
        outline: 'none',
        flex: 1,
        padding: '5px', // Añade un poco de padding para el input
        border: 'none', // Quita el borde del cuadro de texto
    },
};

export default SearchBar;