import { Link } from "react-router-dom"

export default () => {
    return (
        <div className="home-page page">
            <h1 className="title">Welcome to the wonderful world of Pokemon! Are you ready to catch them all?</h1>
            <div className="content">
                <figure className="home-img">
                    <img src="/Professor_Oak.jpg" alt="Professor Oak with Mew" />
                </figure>
                <div className="text-container">
                    <p className="intro">Hi, my name is proffesor Oak. Looks like you want to be a Pokemon Trainer! If you're ready to begin your adventure, take a look at the pokedex, find your favourite pokemons, learn about them and most important, fetc... Ups, I meant, catch them all!</p>
                    <Link to='pokemons' className="explore-btn">Go to the Pokedex</Link>
                </div>
            </div>
        </div>
    )
}