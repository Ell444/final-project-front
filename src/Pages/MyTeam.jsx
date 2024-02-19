import { useEffect, useState } from "react";
import axios from "axios";
const { VITE_API_URL } = import.meta.env;
import { axiosHeaders } from "../../lib/utilities";
import { useUser } from "../context/UserContext";


export default () => {

    const { token } = useUser();
    const [team, setTeam] = useState([]);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/myteam`, axiosHeaders(token));
                const teamData = response.data;
                setTeam(teamData);
            } catch (error) {
                console.error('Error getting the team:', error);
            }
        }
        fetchTeam();
    }, []);

    return (
        <div className="my-team page">
            <h1>My Team</h1>
            <ul>
                {team.map((pokemon) => {
                    <li key={pokemon.id}>{pokemon.name}</li>
                })}
            </ul>
        </div>
    )
}