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
                <figure>
                    <img src={pokemon.image} alt="" />
                </figure>
                <p>{pokemon.id} {pokemon.name}</p>
                <p>{pokemon.types}</p>
            </section>
        </dialog>
    )
}

//Riga 25, TYPES. Ricordare che è un array e implementare la renderizzazione con un map.
