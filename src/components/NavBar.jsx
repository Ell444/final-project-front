import { Link, NavLink, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserContext"

export default () => {

    const navigate = useNavigate();

    const { user, logOut } = useUser();

    return (
        <nav className="navbar">
            <figure className="navbar-img">
                <Link to="/">
                    <img src="/pokeball-logo.webp" alt="Logo" />
                </Link>
                <span className="nav-email">{user && user.email}</span>
            </figure>
            <menu>
                {!user && <>
                    <li>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Log In</NavLink>
                    </li>
                </>}
                {user && <>
                    <li>
                        <NavLink to='/myTeam'>My Team</NavLink>
                    </li>
                    <li>
                        <NavLink to='/pokemons'>Pokedex</NavLink>
                    </li>
                    <li>
                        <a onClick={() => {
                            logOut();
                            navigate('/login');
                        }}>Logout</a>
                    </li>
                </>}
            </menu>
        </nav>
    )
}