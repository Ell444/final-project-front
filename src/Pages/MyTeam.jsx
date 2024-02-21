import axios from "axios";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default () => {

    const { user, token } = useUser();
    const [error, setError] = useState(false);
    const [team, setTeam] = useState([]);
    const [customPokemon, setCustomPokemon] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                if (user) {
                    const response = axios.get(`${VITE_API_URL}/user/${user._id}`, axiosHeaders(token));
                    setTeam(user.team);
                }
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };

        const fetchCustomPokemon = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/custompokemons`, axiosHeaders(token))
                setCustomPokemon(response.data);
            } catch (error) {
                console.error(error);
                setError(true);
            }
        };
        fetchTeam();
        fetchCustomPokemon();
    }, [user, token]);



    return (
        <div className="my-team page">
            <h1>My Team</h1>
            <ul className="pokemon-list">
                {team.map((cp) => {
                    return (
                        <Link to={`/custompokemons/${cp._id}`} key={cp._id}>
                            <li className="pokemon-card">
                                {customPokemon ? (
                                    <>
                                        <figure>
                                            <img src={cp.image} alt={`Picture of ${cp.name}`} />
                                        </figure>
                                        <p><strong>Name:</strong> {cp.name}</p>
                                        <p><strong>ID:</strong> {cp.id}</p>
                                    </>
                                ) : (
                                    <div className="loader">
                                        <img src="/pokemon-loader.gif" alt="loader gif" />
                                    </div>
                                )}
                            </li>
                        </Link>

                    );
                })}
            </ul>
        </div>
    )
}