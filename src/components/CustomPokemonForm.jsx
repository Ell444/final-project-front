import axios from "axios";
import { useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;

export default ({ customPokemon }) => {

    const [formData, setFormData] = useState({
        nickname: customPokemon.nickname,
        level: customPokemon.level,
        attacks: customPokemon.attacks.join(', ')
    });

    const { token } = useUser();
    const { id } = useParams();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPokemon = {
            nickname: formData.nickname,
            level: formData.level,
            attacks: formData.attacks.split(',').map(a => a.trim())
        };
        try {
            await axios.patch(`${VITE_API_URL}/customPokemon/${id}`, updatedPokemon, axiosHeaders(token));
        } catch (error) {
            console.error('There was an error during the update of the custom pokemon:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nickname:</label>
                <input
                    type="text"
                    id="nickname"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Level:</label>
                <input
                    type="number"
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label>Attacks:</label>
                <input
                    type="text"
                    id="attacks"
                    name="attacks"
                    value={formData.attacks}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Save</button>
        </form>
    )
}