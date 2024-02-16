import { useEffect, useRef } from "react";

export default ({ isOpen, setIsOpen, name, id, types, description, image }) => {

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
                    <img src={image} alt="" />
                </figure>
                <p>{id} {name}</p>
                <p>{types}</p>
                <p>{description}</p>
            </section>
        </dialog>
    )
}