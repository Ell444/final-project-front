import axios from "axios";
import { useEffect, useState } from "react";
import { axiosHeaders } from "../../lib/utilities";
import { useUser } from "../context/UserContext";
import PokemonModal from "../components/PokemonModal";
import PokemonEncounterModal from "../components/PokemonEncounterModal";
const { VITE_API_URL } = import.meta.env;


export default () => {

    const [pokemonsData, setPokemonsData] = useState();
    const [error, setError] = useState();
    const { token } = useUser();
    const [modalOpen, setModalOpen] = useState(null);
    const [encounteredPokemon, setEncounteredPokemon] = useState(null);
    const [isEncouterModalOpen, setIsEncounterModalOpen] = useState(null);

    useEffect(() => {
        axios.get(`${VITE_API_URL}/pokemons`, axiosHeaders(token))
            .then(res => setPokemonsData(res.data))
            .catch(error => {
                console.error(error);
                setError(true);
            })
    }, []);

    //Chiamata per ottenere un pokemon randomico. 
    const getRandomPokemon = async () => {
        try {
            const response = await axios.get(`${VITE_API_URL}/pokemonencounter/random`, axiosHeaders(token))
            return response.data;
        } catch (error) {
            console.error(`Could not get the random Pokemon. Please, try again`, error.message)
            throw error;
        }
    };

    //Funzione che mi gestisce l'apparizione randomica di un pokemon al click del pulsante.
    const handleEncounterPokemon = async () => {
        try {
            const randomPokemon = await getRandomPokemon();
            setEncounteredPokemon(randomPokemon);
            setIsEncounterModalOpen(true);
        } catch (error) {
            console.error('No random pokemon was found.', error);
            throw error;
        }
    }
    return (<>

        <div className="pokedex page">
            <div className="title-btn-container">
                <h1>Pokedex</h1>
                <button onClick={handleEncounterPokemon}>To the tall grass!</button>
            </div>
            {error && <div className="info error">There was an error.</div>}
            {!error && <>
                {!pokemonsData &&
                    <div className="loader">
                        <img src="/pokemon-loader.gif" alt="loader gif" />
                    </div>
                }
                {pokemonsData && <>
                    {pokemonsData.length === 0 && <div>No pokemon available.</div>}
                    {pokemonsData.length !== 0 &&
                        <ul className="pokemon-list">
                            {pokemonsData.map(p => {
                                const props = { ...p, isOpen: modalOpen, setIsOpen: setModalOpen }
                                return (
                                    <li key={p._id}
                                        className="pokemon-card"
                                    >
                                        {modalOpen === p._id &&
                                            <PokemonModal {...props} />}
                                        {p.id} {p.name}
                                        <figure
                                            onClick={() => { setModalOpen(p._id) }}
                                            className="poke-img">
                                            <img src={p.image} alt={`Picture of ${p.name}`} />
                                        </figure>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </>}
            </>}
        </div>


        {encounteredPokemon && (
            <PokemonEncounterModal
                isOpen={isEncouterModalOpen}
                setIsOpen={setIsEncounterModalOpen}
                pokemon={encounteredPokemon.pokemon}
            />
        )}
    </>)

}