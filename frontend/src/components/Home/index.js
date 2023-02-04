import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import * as spotsActions from '../../store/spot';
import Spot from "../Spot";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const destination = params.get('desc');
	const checkInDate = params.get('checkIn');
	const checkOutDate = params.get('checkOut');

	const [showMap, setShowMap] = useState(false);
	const [filterSpots, setFilterSpots] = useState([]);
	const [count, setCount] = useState(0);

	const spots = useSelector(state => Object.values(state.spots.AllSpots));

	useEffect(() => {
		dispatch(spotsActions.getAllSpots());
	}, [dispatch]);

	useEffect(() => {
		const fetchData = async () => {
			let spots = await dispatch(spotsActions.getAllSpots());
			let FilteredSpots = [];
			// Filter out by available dates;
			if (checkInDate) {
				spots = spots.filter((spot) => {
					let spotBookings = spot.Bookings;
					if (!spotBookings.length) return true;
					for (let i = 0; i < spotBookings.length; i++) {
						let booking = spotBookings[i];
						// conflicting start date
						if (
							(checkInDate >= booking.startDate &&
								checkInDate <= booking.endDate) ||
							checkInDate === booking.startDate ||
							checkInDate === booking.endDate
						)
							return false;
						// conflicting End date
						else if (
							(checkOutDate >= booking.startDate &&
								checkOutDate <= booking.endDate) ||
							checkOutDate === booking.startDate ||
							checkOutDate === booking.endDate
						)
							return false;
						else if (
							checkInDate <= booking.startDate &&
							booking.endDate <= checkOutDate
						)
							return false;
					}
					return true;
				});
				FilteredSpots = spots;
			}
			if (destination) {
				spots = spots.filter(
					(spot) =>
						destination.toLowerCase().includes(spot.city.toLowerCase()) ||
						destination.toLowerCase().includes(spot.state.toLowerCase())
				);
				FilteredSpots = spots;
			}

			setFilterSpots(FilteredSpots);
		};

		fetchData();

		return () => {
			dispatch(spotsActions.cleanUpAllSpots());
		};
	}, [dispatch, destination, checkInDate, checkOutDate]);

	useEffect(() => {
		let counter = count;
		const interval = setInterval(() => {
			if (counter >= spots.length) {
				clearInterval(interval);
			} else {
				setCount((count) => count + 1);
				counter++; // local variable that this closure will see
			}
		}, 35);

		return () => clearInterval(interval);
	}, [spots]);

	const spotsArrayList = spots.slice(0, count);
	if (!spots.length) return null;

	const display = (showMap) => {
		if (showMap)
			return (
				<div>
					Show list&nbsp;&nbsp;<i class="fa-solid fa-list-ul"></i>
				</div>
			);
		else
			return (
				<div>
					Show map&nbsp;&nbsp;<i class="fa-solid fa-map"></i>
				</div>
			);
	};

	return (
		<div>
			{filterSpots.length == 0 && (
				<button
					className="show-map-list-button"
					onClick={() => setShowMap(!showMap)}
				>
					{display(showMap)}
				</button>
			)}
			{!showMap && (
				<div className="allSpots-main-wrapper">
					{filterSpots.length == 0 && (
						<div className="allSpots-wrapper">
							{filterSpots.length == 0 &&
								spotsArrayList?.map((spot) => (
									<Spot spot={spot} key={spot.id} />
								))}
						</div>
					)}

					{filterSpots.length > 0 && (
						<div className="allSpots-result-wrapper">
							{filterSpots.map((spot) => (
								<Spot spot={spot} key={spot.id} />
							))}
						</div>
					)}
					{filterSpots.length > 0 && (
						<div className="allSpot-map-search-wrapper">
							{/* <GoogleMapAllSpots spots={filterSpots} zoom={13} /> */}
						</div>
					)}
				</div>
			)}
			{filterSpots.length == 0 && showMap && (
				<div className="allSpot-map-wrapper">
					{/* <GoogleMapAllSpots spots={allSpots} /> */}
				</div>
			)}

			<div className='center format-footer'>
				AirBnB Replica by Isaac Ki
			</div>
			<footer className='center format-footer1'>
				<a href="https://github.com/isaacki1003" target="_blank">GitHub</a> ‎ | ‎  <a href="https://www.linkedin.com/in/isaac-ki-973894111/" target="_blank">LinkedIn</a>
			</footer>
		</div>
	);
};

export default Home;
