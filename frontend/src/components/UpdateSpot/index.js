// import React, { useEffect, useState } from 'react';
// import { NavLink, useHistory, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getSpotDetails } from '../../store/spot';
// import * as spotsActions from '../../store/spot';

// export default function UpdateSpot() {
// 	const { spotId } = useParams();
// 	const dispatch = useDispatch();
// 	const history = useHistory();
// 	const spot = useSelector((state) => state.spots.SingleSpot);

// 	// create spot controlled form state
// 	const [address, setAddress] = useState('');
// 	const [city, setCity] = useState('');
// 	const [state, setState] = useState('');
// 	const [country, setCountry] = useState('');
// 	const [name, setName] = useState('');
// 	const [description, setDescription] = useState('');
// 	const [price, setPrice] = useState('');
// 	// const [errors, setErrors] = useState({});
// 	// const [hasSubmit, setHasSubmit] = useState(false);

// 	useEffect(() => {
// 		dispatch(getSpotDetails(spotId));
// 	}, [dispatch]);

// 	useEffect(() => {
// 		setAddress(spot.address);
// 		setCity(spot.city);
// 		setState(spot.state);
// 		setCountry(spot.country);
// 		setName(spot.name);
// 		setDescription(spot.description);
// 		setPrice(spot.price);
// 	}, [spot]);

// 	const hanldeUpdateSpot = async (e) => {
// 		e.preventDefault();
// 		// setHasSubmit(true);

// 		// setErrors({});
// 		const SpotUpdateInfo = {
// 			address,
// 			city,
// 			state,
// 			country,
// 			name,
// 			description,
// 			price
// 		};
// 		const updatedSpot = await dispatch(
// 			spotsActions.UpdateSpot(SpotUpdateInfo, spotId)
// 		).catch(async (res) => {
// 			const data = await res.json();
// 			// if (data && data.errors) {
// 			// 	setErrors(data.errors);
// 			// }
// 		});

// 		//REDIRECT TO NEW SPOT IF EVERYTHING GO WELL!
// 		if (updatedSpot) history.push(`/spots/${spotId}`);
// 	};

// 	const HandleDeleteSpot = async () => {
// 		if (window.confirm('Please confirm you want to delete this listing!'))
// 			await dispatch(spotsActions.DeleteSpot(spotId));

// 		history.push('/');
// 	};
// 	if (!Object.values(spot).length) return null;
// 	return (
// 		<div>
// 			<div>
// 				<NavLink to="/">
// 					<img
// 						src="https://mybnb-lucyluo.herokuapp.com/assets/logo-34e8587533b17eeb904517e28f490075173a3380205cde3cd6581bcae66d9c46.png"
// 						alt="home log"
// 						style={{ heigh: '50x', width: '50px' }}
// 					/>
// 				</NavLink>
// 			</div>
// 			<div>
// 				Need to make some changes? to <br /> {spot.name}
// 			</div>
// 			<div>
// 				<button onClick={HandleDeleteSpot}>
// 					Remove spot from listing
// 				</button>
// 				<form id="create-form" onSubmit={hanldeUpdateSpot}>
// 					<input
// 						type="text"
// 						value={name}
// 						onChange={(e) => setName(e.target.value)}
// 						placeholder="Name of your place"
// 					/>
// 					<input
// 						type="text"
// 						value={address}
// 						onChange={(e) => setAddress(e.target.value)}
// 						placeholder="Address"
// 					/>
// 					<input
// 						type="text"
// 						value={city}
// 						onChange={(e) => setCity(e.target.value)}
// 						placeholder="City"
// 					/>
// 					<input
// 						type="text"
// 						value={state}
// 						onChange={(e) => setState(e.target.value)}
// 						placeholder="State"
// 					/>
// 					<input
// 						type="text"
// 						value={country}
// 						onChange={(e) => setCountry(e.target.value)}
// 						placeholder="Country"
// 					/>
// 					<textarea
// 						type="text"
// 						value={description}
// 						onChange={(e) => setDescription(e.target.value)}
// 						placeholder="Tell everyone about your amazing place..."
// 					/>
// 					<input
// 						type="number"
// 						value={price}
// 						onChange={(e) => setPrice(e.target.value)}
// 						placeholder="Price per night"
// 					/>
// 					<button>Update</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
