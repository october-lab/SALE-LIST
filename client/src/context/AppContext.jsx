/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState({});
    const [theme, setTheme] = useState('black');
    const [currentPage, setCurrentPage] = useState(1);


    return (
        <AppContext.Provider value={{ state, setState, theme, setTheme, currentPage, setCurrentPage }}>
            {children}
        </AppContext.Provider>
    );
};
