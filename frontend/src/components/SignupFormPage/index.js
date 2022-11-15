import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useModalVariableContext from "../../context/ModalVariable";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { setShowLoginModal, setShowSignupModal } = useModalVariableContext();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmit, setHasSubmit] = useState(false);

  if (sessionUser) return <Redirect to="/" />;

  const switchToLogin = () => {
		setShowLoginModal(true);
		setShowSignupModal(false);
	};

  const handleSubmit = (e) => {
    e.preventDefault();
		setHasSubmit(true);
		if (password !== confirmPassword) {
			return setErrors({ confirmPassword: 'Passwords do not match!' });
		}

		setErrors({});
		const signupInfo = {
			firstName,
			lastName,
			email,
			username,
			password
		};

		return dispatch(sessionActions.signup(signupInfo))
			.then(() => setShowSignupModal(false))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      <p>
				Already have an account?{' '}
				<span
					style={{
						fontSize: '16px',
            cursor: 'pointer',
            textDecoration: 'underline'
					}}
					onClick={switchToLogin}
				>
					{'  '}
					Login
				</span>
			</p>
    </div>
  );
}

export default SignupFormPage;
