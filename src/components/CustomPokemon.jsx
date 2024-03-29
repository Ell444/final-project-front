import axios from "axios";
import { useEffect, useState } from "react"
import { axiosHeaders } from "../../lib/utilities";
import { useUser } from "../context/UserContext";
import { useParams } from "react-router-dom";
import CustomPokemonForm from "./CustomPokemonForm";
const { VITE_API_URL } = import.meta.env;

export default () => {

    const { token, updateUser } = useUser();
    const [error, setError] = useState(false);
    const [customPokemon, setCustomPokemon] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const { id } = useParams();


    useEffect(() => {
        const fetchCustomPokemon = async () => {
            try {
                const response = await axios.get(`${VITE_API_URL}/custompokemons/${id}`, axiosHeaders(token));
                setCustomPokemon(response.data);
            } catch (error) {
                console.error(error);
                setError(true)
            }
        };
        fetchCustomPokemon();
    }, [id]);


    const handleReleasePokemon = async () => {
        try {
            await axios.delete(`${VITE_API_URL}/custompokemons/${id}`, axiosHeaders(token));
            setCustomPokemon(null);
            updateUser(); //Funzione che mi serve per aggiornare lo User quando "libera" un pokemon (vedi userContext)
        } catch (error) {
            console.error('There was an error while releasing your pokemon:', error);
        }
    };

    const handleConfrimRelease = () => {
        setConfirmDelete(true);
    };

    const handleCancelRelease = () => {
        setConfirmDelete(false)
    };

    const handleConfirm = () => {
        handleReleasePokemon();
        setConfirmDelete(false);
    }

    const handleDeletePopoup = () => {
        setConfirmDelete(false)
    };

    if (!customPokemon) {
        return (
            <div className="info">
                <p>This pokemon was released.</p>
            </div>
        )
    };

    return (
        <div className="customPokemon page">
            <h1>ID {customPokemon.id} - {customPokemon.name}</h1>
            <div className="custom-container">
                <figure className="custompokemon-img">
                    <img src={customPokemon.image} alt={`Picture of ${customPokemon.name} `} />
                </figure>
                <div className="cp-text-container">

                    <div>
                        <p><strong>Nickname:</strong> {customPokemon.nickname}</p>
                    </div>
                    {customPokemon.type && (
                        <div>
                            <p><strong>Type:</strong> {Array.isArray(customPokemon.type) ? customPokemon.type.join(', ') : customPokemon.type}</p>
                        </div>
                    )}
                    <div>
                        <p><strong>Level:</strong> {customPokemon.level}</p>
                    </div>
                    {customPokemon.attacks && (
                        <div>
                            <p><strong>Attacks:</strong> {Array.isArray(customPokemon.attacks) ? customPokemon.attacks.join(', ') : customPokemon.attacks}</p>
                        </div>
                    )}
                    <div>
                        <p><strong>Info:</strong> {customPokemon.description}</p>
                    </div>

                </div>

                {!confirmDelete ? (
                    <button onClick={handleConfrimRelease}>Release pokemon</button>

                ) : (
                    <div className="confirm-delete-popup" onClick={handleDeletePopoup}>
                        <p>Are you sure that you want to release this pokemon?</p>
                        <div className="delete-btn">
                            <button onClick={handleConfirm}>Bye bye!</button>
                            <button onClick={handleCancelRelease}>Stay with me.</button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <h3>Customize your pokemon!</h3>
                <CustomPokemonForm customPokemon={customPokemon} />
            </div>
        </div>
    )
};