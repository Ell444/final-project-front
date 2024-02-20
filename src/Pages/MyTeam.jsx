import axios from "axios";
import { useUser } from "../context/UserContext";
import { useState } from "react";

export default () => {

    //creare uno state team([]);
    //creare useEffect con chiamata axios.get a user/:id
    //salvare la response (user) nello state team(user.team)
    //(response.data.team)
    //map di team con creazione piccole card con link a pagina del customPokemon singolo ed editabile.
    //?.map

    const { user, token } = useUser();
    const [error, setError] = useState();

    return (
        <div className="my-team page">
            <h1>My Team</h1>
            <ul>
                {console.log(user)}
                {user.team.map((cpId) => {
                    let cPokemon;
                    const fetchPokemon = await axios.get(`${VITE_API_URL}/custompokemons`, axiosHeaders(token))
                    try {
                        cPokemon = res.data;

                    } catch (error) {
                        console.error(error);
                        setError(true);
                        return <li key={ }>{pokemon.name}</li>
                    })}
            </ul>
        </div>
    )
}