import axios from "axios";
import { createContext, useContext, useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
const { VITE_API_URL } = import.meta.env;

const UserContext = createContext();

export const UserProvider = ({ children }) => { //children: tutto ciò che verrà incluso nel conesto dello User.

    const oldValue = localStorage.getItem('storedUser'); //oldvalue = ciò che sta già salvato nel localstorage

    const [userData, setUserData] = useState(oldValue !== null ? JSON.parse(oldValue) : null);

    const changeData = (newValue) => { //funzione che serve per salvare lo user aggiornato nel localStorage
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
        changeData({});
    }

    //Funzione che mi serve per tenere l'utente aggiornato col suo team quando cattura/libera un pokemon
    const updateUser = () => {
        axios.get(`${VITE_API_URL}/user/${userData.user._id}`, axiosHeaders(userData.token))
            .then(obj => {
                setUserData({
                    ...userData, //Faccio lo spread di userData per preservare il token.
                    user: obj.data
                })
            }).catch(error => console.error(error))
    }

    const value = {
        ...userData, // per estrarre separatamente dal context user e token
        signUp,
        logIn,
        logOut,
        updateUser,
        error,
        loading
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => { //Funzione che serve per lanciare un errore quando cerco di usare UserContext su un componente non inculso nell' UserProvider.
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider.')
    }
    return context;
}
