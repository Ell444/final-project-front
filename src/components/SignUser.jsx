import { useState } from "react"
import { useUser } from "../context/UserContext";

export default ({ type }) => {

    const title = type === 'login' ? "Log In" : 'Sign Up';

    const { signUp, logIn, error, loading } = useUser();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password2: ''
    });

    const changeData = (key, val) => setFormData(c => ({ ...c, [key]: val }));

    const [confirmPasswordError, setConfirmPasswordError] = useState(null);

    const signUser = (e) => {
        e.preventDefault();
        setConfirmPasswordError(null);
        const { email, password, password2 } = formData;
        if (type === 'login') {
            logIn(email, password)
        } else {
            if (password !== password2) {
                setConfirmPasswordError('Password do not match.');
                return;
            }
            signUp(email, password)
        }
    }

    return (
        <>
            <div className="signup-wrapper">
                <h1>{title}</h1>
                <figure className="pikachu-gif">
                    <img src="/login-pikachu.gif" alt="Running gif of pikachu" />
                </figure>
                <div className="signup page">
                    <form onSubmit={signUser}>
                        <section className="form-value">
                            <p>Email*</p>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => changeData('email', e.target.value)}
                            />
                        </section>
                        <section className="form-value">
                            <p>Password*</p>
                            <input
                                type="password"
                                required
                                value={formData.password}
                                onChange={(e) => changeData('password', e.target.value)}
                            />
                        </section>
                        {type === 'signup' &&
                            <section className="form-value">
                                <p>Confirm Password*</p>
                                <input
                                    type="password"
                                    required
                                    value={formData.password2}
                                    onChange={(e) => changeData('password2', e.target.value)}
                                />
                            </section>
                        }
                        <div className="buttons">
                            <button disabled={loading}>{title}</button>
                        </div>
                    </form>
                </div>

                {loading && <div className="loader">
                    <img src="/pokemon-loader.gif" alt="loader gif" />
                </div>}
                {error && <div className="info error">{error}</div>}
                {confirmPasswordError && <div className="info error">{confirmPasswordError}</div>}
            </div>
        </>

    )
}