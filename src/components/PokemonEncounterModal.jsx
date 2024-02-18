import { useEffect, useRef, useState } from "react";

export default ({ isOpen, setIsOpen, pokemon }) => {

    const dialogRef = useRef(); //Utilizzo useRef per far riferimento al dialog con la variabile dialogRef.
    const [escape, setEscape] = useState(false);

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen])


    const handleCloseModal = () => {
        console.log("Closing modal...");
        setIsOpen(false);
    };

    const handleRunAway = () => {
        console.log("Running away...");
        setIsOpen(false);
        setEscape(true);
    }

    const handleEscapePopup = () => {
        setEscape(false);
    }

    return (
        <>
            <dialog ref={dialogRef}>
                <div className="close">
                    <button onClick={handleCloseModal}>X</button>
                </div>
                <section className="poke-container">
                    <h2>Oh! A wild pokemon appeard!</h2>
                    <figure>
                        <img src={pokemon.image} alt="" />
                    </figure>
                    <p>{pokemon.id} {pokemon.name}</p>
                    {pokemon.type && (
                        <div>
                            <p>Type: {Array.isArray(pokemon.type) ? pokemon.type.join(', ') : pokemon.type}</p>
                        </div>
                    )}
                    <div>
                        <button>Throw Pokeball!</button>
                        <button onClick={handleRunAway}>Run away!</button>
                    </div>
                </section>
            </dialog>

            {escape && (
                <div className="escape-popup" onClick={handleEscapePopup}>
                    <p>You escaped successfully! If you wanna find another wild pokemon, go to the tall grass again!</p>
                </div>
            )}
        </>



    )
}


