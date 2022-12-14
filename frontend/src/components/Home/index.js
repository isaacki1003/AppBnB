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
		<div className='home-wrapper'>
			{spots?.map(spot => (
				<Spot spot={spot} key={spot.id} />
			))}
		</div>
	);
};

export default Home;
