
import { React, createContext, useState } from 'react';   

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // const login = (userData) => {
    //     setUser(userData);
    //     setIsAuthenticated(true);
    // };
    
    // const logout = () => {
    //     setUser(null);
    //     setIsAuthenticated(false);
    // };
    const updateUser = (userData) => {  
        setUser(userData);
    }   
    const clearUser = () => {
        setUser(null);  
    }
    
    return (
        <UserContext.Provider value={{
            user,
            updateUser,
            clearUser
        }}>
        {children}
        </UserContext.Provider>
    );
}
    

export default UserProvider;