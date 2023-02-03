import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';


export default function SpotTitle({ spot }) {
    const { spotId } = useParams();
	const sessionUser = useSelector(state => state.session.user);

    let edit;
	if (sessionUser) {
        edit = (sessionUser.id === spot.ownerId);
    };

	return (
		<div className="single-spot-wrapper">
			<div className="single-spot-title">
				<h1 className="single-spot-title2">{spot.name}</h1>
				{edit && (
					<NavLink to={`/spots/${spotId}/update`} className="edit-listing">
						Edit this listing
					</NavLink>
				)}
			</div>
			<div className="single-spot-title3">
				<span>
					{spot.avgStarRating ? (
						<img
						src="https://www.pngrepo.com/png/6977/180/star.png"
						alt="message logo"
						style={{ height: '15px', width: '15px' }}
						/>
					) : (
						<img
						src="https://www.pngrepo.com/png/6396/180/star.png"
						alt="message logo"
						style={{ height: '15px', width: '15px' }}
						/>
					)}{' '}
					{spot.avgStarRating
						? spot.avgStarRating
						: 'Leave the first rating!'}
				</span>{' '}
				-
				<span className="spot-details-tile-reviews">
					{' '}
					<a href="#all-spot-reviews101" style={{ textDecoration: 'none', color: 'black' }}>
							{spot.numReviews} Review(s)
						</a>
				</span>{' '}
				-{' '}
				<span className="single-spot-tile-location">
					{spot.city}, {spot.state}, {spot.country}
				</span>
			</div>
		</div>
	);
}
