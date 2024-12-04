
import { useState } from "react";
import { useCookies } from 'react-cookie';

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [error, setError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const viewSignIn = (status) => {
        setError(null);
        setIsLoggedIn(status);
    };

    const handleSubmit = async (e, endPoint) => {
        e.preventDefault();

        if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
            setError('Invalid email format');
            return;
        }

        if (!isLoggedIn && password !== confirmPassword) {
            setError('Make sure confirm passwords match');
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endPoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error('Server error. Please try again later.');
            }

            const data = await response.json();
            if (data.detail) {
                setError(data.detail);
            } else {
                setCookie('Email', data.email, { path: '/', secure: true, sameSite: 'strict' });
                setCookie('authToken', data.token, { path: '/', secure: true, sameSite: 'strict' });
                window.location.reload();
            }
        } catch (err) {
            console.error(err);
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{isLoggedIn ? 'Please log IN!' : 'Please Sign UP!'}</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    {!isLoggedIn && (
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}
                    <input
                        type="submit"
                        className="create"
                        onClick={(e) => handleSubmit(e, isLoggedIn ? 'signin' : 'signup')}
                    />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-options">
                    <button onClick={() => viewSignIn(false)}>Sign UP!</button>
                    <button onClick={() => viewSignIn(true)}>Sign IN!</button>
                </div>
            </div>
        </div>
    );
};

export default Auth;
