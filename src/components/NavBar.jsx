import { Link, NavLink } from "react-router-dom"

export default () => {

    return (
        <nav className="navbar">
            <figure>
                <Link to="/">
                    <img src="/pokeball-logo.webp" alt="Logo" />
                </Link>
            </figure>
            <menu>
                <li>
                    <NavLink to="/signup">Sign Up</NavLink>
                </li>
                <li>
                    <NavLink to="/login">Log In</NavLink>
                </li>
            </menu>
        </nav>
    )
}