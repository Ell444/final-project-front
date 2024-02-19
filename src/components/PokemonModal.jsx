import { useEffect, useRef } from "react";

export default ({ isOpen, setIsOpen, name, id, type, description, image }) => {

    const dialogRef = useRef(); //Utilizzo useRef per far riferimento al dialog con la variabile dialogRef.

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen])

    const backgroundColor = () => {
        if (type) {
            const pokemonType = Array.isArray(type) ? type[0].toLowerCase() : type.toLowerCase();
            return `${pokemonType}-background`;
        }
        return "";
    }

    return (
        <dialog ref={dialogRef} className={backgroundColor()}>
            <div className="close">
                <button onClick={() => { setIsOpen(null) }}>X</button>
            </div>
            <section className="poke-container">
                <figure className="img-container">
                    <img src={image} alt="" />
                </figure>
                <p>{id} {name}</p>
                {type && (
                    <div>
                        <p>Type: {Array.isArray(type) ? type.join(', ') : type}</p>
                    </div>
                )}
                <p>{description}</p>
            </section>
        </dialog >
    )
}