import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from "../../context/Modal";
import useModalVariableContext from '../../context/ModalVariable';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';
import logo from "../../assets/appbnb_logo.png"

function Navigation({ isLoaded }){
  const { spotId } = useParams();
	const sessionUser = useSelector((state) => state.session.user);
	const [showMenu, setShowMenu] = useState(false);
  const {
		showLoginModal,
		setShowLoginModal,
		showSignupModal,
		setShowSignupModal
	} = useModalVariableContext();
	let sessionLinks;

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div className="nav-bar-loggedIn">
				<button onClick={openMenu} className="navbar-button">
					<i class="fa-solid fa-bars"></i>
					<i class="fa-solid fa-circle-user"></i>
					{showMenu && (
						<ul className="nav-dropped-down">
							<li
								className="nav-dropped-down-li"
								onClick={() => setShowLoginModal(true)}
							>
								Log In
							</li>
							<li
								className="nav-dropped-down-li"
								onClick={() => setShowSignupModal(true)}
							>
								Sign Up
							</li>
						</ul>
					)}
				</button>
				{showLoginModal && (
					<Modal onClose={() => setShowLoginModal(false)}>
						<LoginFormModal />
					</Modal>
				)}
				{showSignupModal && (
					<Modal onClose={() => setShowSignupModal(false)}>
						<SignupFormPage />
					</Modal>
				)}
			</div>
		);
	}

	return (
		<div>
			<div>
				<NavLink exact to="/">
					<img
						src={logo}
						style={{
							height: '45px',
							width: '100px',
							display: 'flex',
							alignItems: 'center',
							marginTop: '10px'
						}}
					/>
				</NavLink>
				{isLoaded && sessionLinks}
			</div>
		</div>
	);
}

export default Navigation;
