import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Modal } from "../../context/Modal";
import useModalVariableContext from '../../context/ModalVariable';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import './Navigation.css';
import logo from "../../assets/logo.png"

function Navigation({ isLoaded }){
	const sessionUser = useSelector((state) => state.session.user);
	const { spotId } = useParams();
	const [showMenu, setShowMenu] = useState(false);
	const {
		showSignupModal,
		setShowSignupModal,
		showLoginModal,
		setShowLoginModal
	} = useModalVariableContext();

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

	let sessionLinks;

	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div className="logged-in-nav">
				<button className="button" onClick={openMenu}>
					<img
						src="https://www.pngrepo.com/png/358458/180/bars.png"
						alt="self logo123"
						style={{ height: '20px', width: '20px', marginLeft: '7px'}}
					/>
					<img
						src="https://www.pngrepo.com/png/24707/180/avatar.png"
						alt="self logo213"
						style={{ height: '20px', width: '20px', marginRight: '8px'}}
					/>
					{showMenu && (
						<ul className="drop-down">
							<li
								onClick={() => setShowLoginModal(true)}
								className="log-out"
							>
								Log In
							</li>
							<li
								onClick={() => setShowSignupModal(true)}
								className="log-out"
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
		<div className={`nav-wrapper`}>
			<div className={`details ${spotId ? 'width' : ''}`}>
				<NavLink exact to="/">
					<img
						src={logo}
						alt="sahdf"
						style={{
							display: 'flex',
							alignItems: 'center',
							height: '50px',
							width: '150px',
							marginTop: '10px',
							marginLeft: '10px'
						}}
					/>
				</NavLink>
				{isLoaded && sessionLinks}
			</div>
		</div>
	);
}

export default Navigation;
