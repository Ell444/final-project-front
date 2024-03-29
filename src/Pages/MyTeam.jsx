import axios from "axios";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default () => {

    const { user, token, updateUser } = useUser();
    const [error, setError] = useState(false);
    const [team, setTeam] = useState([]);
    const [customPokemon, setCustomPokemon] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                if (user) {
                    const response = axios.get(`${VITE_API_URL}/user/${user._id}`, axiosHeaders(token));
                    setTeam(user.team);
                    updateUser();
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
                updateUser();
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

            <h1 className="team-title">My Team</h1>
            {team.length === 0 &&
                <div className="info">You have no pokemon in your team yet. Go catch them all!</div>
            }
            <ul className="pokemon-list">
                {team.map((cp) => {
                    return (
                        <Link className="team-link" to={`/custompokemons/${cp._id}`} key={cp._id}>
                            <li className="pokemon-card">
                                {customPokemon ? (
                                    <>
                                        <figure>
                                            <img src={cp.image} alt={`Picture of ${cp.name}`} />
                                        </figure>
                                        <p><strong>Name:</strong> {cp.name}</p>
                                        <p><strong>Nickname:</strong> {cp.nickname && cp.nickname}</p>
                                        <p><strong>Level:</strong> {cp.level}</p>
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