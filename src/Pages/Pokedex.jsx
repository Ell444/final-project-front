import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
import { useUser } from "../context/UserContext";
const { VITE_API_URL } = import.meta.env;


export default () => {

    const [pokemons, setPokemons] = useState();
    const [error, setError] = useState();
    const { token } = useUser();

    useEffect(() => {
        axios.get(`${VITE_API_URL}/pokemons`, axiosHeaders(token))
            .then(res => setPokemons(res.data))
            .catch(error => {
                console.error(error);
                setError(true);
            })
    }, []);

    return (<>

        <div className="pokedex">
            <h1>Pokedex</h1>

            {error && <div className="info error">There was an error.</div>}
            {!error && <>
                {!pokemons &&
                    <div className="loader">
                        <img src="/pokemon-loader.gif" alt="loader gif" />
                    </div>
                }
                {pokemons && <>
                    {pokemons.length === 0 && <div>No pokemon available.</div>}
                    {pokemons.length !== 0 &&
                        <ul className="pokemon-list">
                            {pokemons.map(p => (
                                <li key={p._id} className="pokemon-card">
                                    {p.id} {p.name}
                                    <figure className="poke-img">
                                        <img src={p.image} alt={`Picture of ${p.name}`} />
                                    </figure>

                                </li>
                            ))}
                        </ul>
                    }
                </>}
            </>}
        </div>

    </>)

}