import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Spot.css";

export default function Spot({ spot }) {
	const names = spot.name.split(' ');
	let name = '';

	for (let i = 0; i < names.length; i++) {
		name += names[i] + ' ';
		if (i === 2) break;
	};

	return (
		<NavLink style={{ textDecoration: 'none' }} to={`/spots/${spot.id}`}>
			<div className="spot-wrapper">
				<img
					className="prev-image"
					alt={spot.name}
					src={spot.previewImage}
					onError={(e) => {
						e.target.onerror = null;
						e.target.src =
						"https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg";
					}}
				/>

				<div className="spot-r1 spot-row not-wrap">
					<span>
						{spot.city}, {spot.state}{' '}
					</span>
					<span>
						{spot.avgRating}{' '}
						{spot.avgRating === "Not yet rated" || spot.avgRating === 0 ? (
							<img
							src="https://www.pngrepo.com/png/6396/180/star.png"
							alt="message logo"
							style={{ height: '12px', width: '12px' }}
						/>
							) : (
							<img
								src="https://www.pngrepo.com/png/6977/180/star.png"
								alt="message logo"
								style={{ height: '12px', width: '12px' }}
							/>
							)}
					</span>
				</div>
				<div className="spot-r2 spot-row">{name}</div>
				<div className="spot-row4 spot-row">
					<span>${spot.price}</span> / night
				</div>
			</div>
		</NavLink>
	);
}
