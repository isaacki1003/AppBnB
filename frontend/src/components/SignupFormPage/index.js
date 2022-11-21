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


  if (sessionUser) return <Redirect to="/" />;

  const switchToLogin = () => {
		setShowLoginModal(true);
		setShowSignupModal(false);
	};

  const handleSubmit = (e) => {
    e.preventDefault();
		if (password !== confirmPassword) {
			return setErrors([ 'Passwords do not match!' ]);
		}

		setErrors([]);
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
    <div className="signup-form-wrapper">
      <form onSubmit={handleSubmit}>
        <ul className="error">
          {errors((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <div className="input3">
          <label>
            First Name
            <input
              type="text"
              value={firstName}
              className="input2"
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
              className="input2"
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
              className="input2"
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
              className="input2"
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
              className="input2"
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
              className="input2"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button className="signup-submit" type="submit">Sign Up</button>
        </div>
      </form>
      <p className="login-toggle">
				Already have an account?{' '}
				<span
					style={{
						fontSize: '14px',
            cursor: 'pointer',
            textDecoration: 'underline'
					}}
					onClick={switchToLogin}
				>
					{'  '}
					Log In Here!
				</span>
			</p>
    </div>
  );
}

export default SignupFormPage;
