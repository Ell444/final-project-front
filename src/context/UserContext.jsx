import axios from "axios";
import { createContext, useContext, useState } from "react";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const oldValue = localStorage.getItem('storedUser'); //oldvalue = ciò che sta già salvato nel localstorage

    const [userData, setUserData] = useState(oldValue !== null ? JSON.parse(oldValue) : null);

    const changeData = (newValue) => {
        setUserData(newValue);
        localStorage.setItem('storedUser', JSON.stringify(newValue));
    }

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const signUp = async (email, password) => {

        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data: userAndToken } = await axios.post(`${VITE_API_URL}/auth/signup`, body);
            changeData(userAndToken);
        } catch (error) {
            console.error(error);
            setError(error.response.user);
        } finally {
            setLoading(false);
        }
    }

    const logIn = async (email, password) => {

        if (loading) return;

        setError(null);
        setLoading(true);

        try {
            const body = { email, password };
            const { data: userAndToken } = await axios.post(`${VITE_API_URL}/auth/login`, body);
            changeData(userAndToken);
        } catch (error) {
            console.error(error);
            setError(error.response.user);
        } finally {
            setLoading(false);
        }
    }

    const logOut = () => {
        changeData({ user: null });
    }

    const value = {
        ...userData, // per estrarre separatamente dal context user e token
        signUp,
        logIn,
        logOut,
        error,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider.')
    }
    return context;
}
