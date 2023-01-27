import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotsActions from '../../store/spot';
import Spot from "../Spot";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
	const spots = useSelector(state => Object.values(state.spots.AllSpots));

	useEffect(() => {
		dispatch(spotsActions.getAllSpots());
	}, [dispatch]);

	if (!spots.length) return null;

	return (
		<div>
			<div className='home-wrapper'>
				{spots?.map(spot => (
					<Spot spot={spot} key={spot.id} />
				))}
			</div>

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
