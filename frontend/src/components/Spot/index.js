import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Spot({ spot }) {
	const names = spot.name.split(' ');
	let name = '';

	for (let i = 0; i < names.length; i++) {
		name += names[i] + ' ';
		if (i === 2) break;
	};

	return (
		<NavLink to={`/spots/${spot.id}`}>
			<div>
				<img
                    alt={spot.name}
					src={
						spot.previewImage === 'No preview Image Yet'
							? "https://www.nicepng.com/png/detail/244-2441173_not-available-png.png"
							: spot.previewImage
					}
				/>
				<div>
					<span>
						{spot.city}, {spot.state}
					</span>
					<span>
						{spot.avgRating ? spot.avgRating : ''}{' '}
						{spot.avgRating === 0 ? (
							<i class="fa-regular fa-star"></i>
						) : (
							<i class="fa-solid fa-star"></i>
						)}
					</span>
				</div>
				<div>{name}</div>
				<div>
					<span>${spot.price}</span> night
				</div>
			</div>
		</NavLink>
	);
}
