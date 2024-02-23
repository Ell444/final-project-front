import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { axiosHeaders } from "../../lib/utilities";
import { Link } from "react-router-dom";
const { VITE_API_URL } = import.meta.env;



export default ({ isOpen, setIsOpen, pokemon }) => {
    console.log(pokemon)

    const dialogRef = useRef(); //Utilizzo useRef per far riferimento al dialog con la variabile dialogRef.
    const [escape, setEscape] = useState(false);
    const [capture, setCapture] = useState(false);
    const { token, user, updateUser } = useUser();

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen])

    //Funzione per chiudere la modale al click
    const handleCloseModal = () => {
        console.log("Closing modal...");
        setIsOpen(false);
    };

    //Funzione per gestire la fuga da un pokemon al click
    const handleRunAway = () => {
        console.log("Running away...");
        setIsOpen(false);
        setEscape(true);
    };

    //Funzione che gestisce la chiusura del pop-up dopo la fuga (Basta cliccarci sopra e lei scompare.)
    const handleEscapePopup = () => {
        setEscape(false);
    };

    //Chiamata per aggiungere PokemonCustom al Team.
    const addToTeam = async (pokemon) => {
        try {
            await axios.post(`${VITE_API_URL}/pokemonencounter/capture/${user._id}`, pokemon, axiosHeaders(token));
            const response = await axios.get(`${VITE_API_URL}/user/${user._id}`, axiosHeaders(token));
            setIsOpen(false);
            setCapture(true);
            updateUser();

        } catch (error) {
            console.error('Error adding Pokemon to team', error);
        }
    };

    //Funzione che gestisce il pulsante "throw pokeball" 
    const handleThrowPokeball = () => {
        addToTeam(pokemon);
    };

    const handleCapturePopup = () => {
        setCapture(false)
    }
    return (
        <>
            <dialog ref={dialogRef}>
                <div className="close">
                    <button onClick={handleCloseModal}>X</button>
                </div>
                <section className="poke-container">
                    <h2>Oh! A wild pokemon appeared!</h2>
                    <figure className="img-container">
                        <img src={pokemon.image} alt="" />
                    </figure>
                    <p>{pokemon.id} {pokemon.name}</p>
                    {pokemon.type && (
                        <div>
                            <p><strong>Type:</strong> {Array.isArray(pokemon.type) ? pokemon.type.join(', ') : pokemon.type}</p>
                        </div>
                    )}
                    <div className="btn-container">
                        <button onClick={handleThrowPokeball}>Throw Pokeball!</button>
                        <button onClick={handleRunAway}>Run away!</button>
                    </div>
                </section>
            </dialog>

            {escape && (
                <div className="escape-popup" onClick={handleEscapePopup}>
                    <p>You escaped successfully! If you wanna find another wild pokemon, go to the tall grass again!</p>
                </div>
            )}

            {capture && (
                <div className="capture-popup" onClick={handleCapturePopup}>
                    <figure>
                        <img src="/pokeball-gif.gif" alt="Pokeball animation" />
                    </figure>
                    <p>Congratulation! You caught {pokemon.name}!</p>
                    <p>Click <Link to={'/myteam'}>here</Link> to go to your team!</p>
                </div>
            )}
        </>

    )
}


