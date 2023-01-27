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
					src={
						spot.previewImage === 'No preview Image Yet'
							? "https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg"
							:  spot.previewImage
					}
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
