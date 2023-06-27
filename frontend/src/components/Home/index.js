import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import * as spotsActions from '../../store/spot';
import Spot from "../Spot";
import Maps from "../Maps";
import "./Home.css";
import CategoryBar from '../CategoryBar';

const Home = () => {
    const dispatch = useDispatch();
	const location = useLocation();
	const params = new URLSearchParams(location.search);
	const category = params.get('categ');
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
			if (category) {
				const spotsArray = Object.values(spots);
				for (let i = 0; i < spotsArray.length; i++) {
				  const spot = spotsArray[i];
				  if (spot.decription?.toLowerCase().includes(category.toLowerCase())
				  || spot.name?.toLowerCase().includes(category.toLowerCase()))  {
					FilteredSpots.push(spot);
				  }
				}
			  }


			setFilterSpots(FilteredSpots);
		};
		fetchData();
	}, [dispatch, category]);

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
				let tempDest = destination.split(',');
				let tempDestCity = tempDest[0]?.toLowerCase();
				let tempDestState = tempDest[1]?.toLowerCase();
				const spotsArray = Object.values(spots);
				let filteredSpots = [];
				for (let i = 0; i < spotsArray.length; i++) {
				  const spot = spotsArray[i];
				  if (spot.city.toLowerCase().includes(destination.toLowerCase())
				  || spot.state.toLowerCase().includes(destination.toLowerCase())
				  || spot.city.toLowerCase().includes(tempDestCity)
				  || spot.state.toLowerCase().includes(tempDestState)) {
					filteredSpots.push(spot);
				  }
				}
				FilteredSpots = filteredSpots;
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
				<div className='centerShowMap'>
					Show list&nbsp;&nbsp;<img
						src="https://www.pngrepo.com/png/358458/180/bars.png"
						alt="self logo123"
						style={{ height: '20px', width: '20px', color: 'white'}}
					/>
				</div>
			);
		else
			return (
				<div className='centerShowMap'>
					Show map&nbsp;&nbsp;<img
						src="https://www.pngrepo.com/png/10112/180/map.png"
						alt="self logo123"
						style={{ height: '20px', width: '20px', color: 'white'}}
					/>
				</div>
			);
	};

	return (
		<div>
			<CategoryBar />
			{filterSpots.length == 0 && (
				<button
					className="show-map-list-button centerShowMap"
					onClick={() => setShowMap(!showMap)}
				>
					{display(showMap)}
				</button>
			)}
			{!showMap && (
				<div className="allSpots-main-wrapper">

					{!category && !destination && filterSpots.length == 0 && (
						<div className="allSpots-wrapper">
							{filterSpots.length == 0 &&
								spotsArrayList?.map((spot) => (
									<Spot spot={spot} key={spot.id} />
								))}
						</div>
					)}

					{!category && destination && filterSpots.length > 0 && (
						<div className="allSpots-wrapper">
							{filterSpots.map((spot) => (
							<Spot spot={spot} key={spot.id} />
							))}
						</div>
					)}

					{!category && destination && filterSpots.length == 0 && (
						<div className="allSpots-wrapper1">
							<h1 className='category-no-res-h1'>
								No results found for {destination}.
							</h1>
							<h2 className='category-no-res-h1'>
								We are working hard to add more spots! List your spot
								to help us grow!
							</h2>
						</div>
					)}

					{category && !destination && filterSpots.length == 0 && (
						<div className="allSpots-wrapper1">
							<h1 className='category-no-res-h1'>
								No results found for {category}.
							</h1>
							<h2 className='category-no-res-h1'>
								We are working hard to add more spots! List your spot
								to help us grow!
							</h2>
						</div>
					)}

					{category && !destination && filterSpots.length > 0 && (
						<div className="allSpots-wrapper">
							{filterSpots.map((spot) => (
								<Spot spot={spot} key={spot.id} />
							))}
						</div>
					)}

					{!category && !destination && filterSpots.length > 0 && (
						<div className="allSpots-result-wrapper">
							{filterSpots.map((spot) => (
								<Spot spot={spot} key={spot.id} />
							))}
						</div>
					)}
					{!category && !destination && filterSpots.length > 0 && (
						<div className="allSpot-map-search-wrapper">
							<Maps spots={filterSpots} zoom={13} />
						</div>
					)}
				</div>
			)}
			{filterSpots.length == 0 && showMap && (
				<div className="allSpot-map-wrapper">
					<Maps spots={spots} key={Math.random()}/>
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
