import { useEffect, useRef } from "react";

export default ({ isOpen, setIsOpen, pokemon }) => {

    const dialogRef = useRef(); //Utilizzo useRef per far riferimento al dialog con la variabile dialogRef.

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen])

    return (
        <dialog ref={dialogRef}>
            <div className="close">
                <button onClick={() => { setIsOpen(null) }}>X</button>
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
                    <button>Run away!</button>
                </div>
            </section>
        </dialog>
    )
}


