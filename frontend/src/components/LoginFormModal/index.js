import React, { useState } from 'react';
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import useModalVariableContext from '../../context/ModalVariable';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { setShowLoginModal, setShowSignupModal } = useModalVariableContext();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmited, setHasSubmited] = useState(false);

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
			sessionActions.login({ credential: 'hoonki', password: 'winteR1003' })
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
    <div>
			{/* <p onClick={() => setShowLoginModal(false)}>
				x
			</p> */}
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            placeholder="Username or Email"
            onChange={(e) => setCredential(e.target.value)}
            required
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
          />
        </label>
        <button type="submit">Log In</button>
        <button onClick={demoUser}>
            Demo-User
        </button>
      </form>
      <p>
          Don't have an account?{' '}
          <span
            style={{
              cursor: 'pointer',
              fontSize: '14px',
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
