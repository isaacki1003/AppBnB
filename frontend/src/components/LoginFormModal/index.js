import React, { useState } from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import useModalVariableContext from '../../context/ModalVariable';
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const { setShowLoginModal, setShowSignupModal } = useModalVariableContext();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowLoginModal(false))
      .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = (e) => {
		e.preventDefault();

		return dispatch(
			sessionActions.login({ credential: 'Demo-lition', password: 'password' })
		)
			.then(() => setShowLoginModal(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

  const switchToSignup = () => {
		setShowLoginModal(false);
		setShowSignupModal(true);
	};

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <ul className='error'>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <div className='input4'>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              placeholder="Username or Email"
              onChange={(e) => setCredential(e.target.value)}
              required
              className="box-input-log"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              className="box-input-log"
            />
          </label>
          <button className="login-submit-button" type="submit">Log In</button>
          <button onClick={demoUser} className="login-submit-button">
              Demo-User
          </button>
          </div>
      </form>
      <p className="login-toggle">
          Don't have an account?{' '}
          <span
            style={{
              fontSize: '14px',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={switchToSignup}
          >
            {'  '}
            Sign Up Here!
          </span>
        </p>
      </div>
  );
}

export default LoginFormModal;
