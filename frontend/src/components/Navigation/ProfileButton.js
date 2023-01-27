import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import "./Navigation.css"

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    if (!showMenu) return;
    const closeMenu = () => {
      setShowMenu(false);
    };
    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="logged-in-nav">
			<NavLink to="/become-a-host" className="host">
				Become a host
			</NavLink>
			<button onClick={openMenu} className="button">
        <img
						src="https://www.pngrepo.com/png/358458/180/bars.png"
						alt="self logo123"
						style={{ height: '20px', width: '20px' , padding: '.03em'}}
					/>
					<img
						src="https://www.pngrepo.com/png/24707/180/avatar.png"
						alt="self logo213"
						style={{ height: '20px', width: '20px' , padding: '.03em'}}
					/>
				{showMenu && (
					<ul className="drop-down">
						<li className="logged-in test-nav">
							<span>Welcome ‎ {' '}{' '}{' '} </span> {' '} {user.firstName}!
						</li>
						<li className="log-out" onClick={logout}>
							Log Out
						</li>
					</ul>
				)}
			</button>
		</div>
  );
}

export default ProfileButton;
