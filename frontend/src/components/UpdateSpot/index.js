import React, { useEffect, useState } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotDetails } from '../../store/spot';
import * as spotsActions from '../../store/spot';
import './UpdateSpot.css';

export default function UpdateSpot() {
	const dispatch = useDispatch();
	const { spotId } = useParams();
	const history = useHistory();

	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');

	const spot = useSelector((state) => state.spots.SingleSpot);

	const [errors, setErrors] = useState([]);
	// const [hasSubmit, setHasSubmit] = useState(false);

	useEffect(() => {
		setAddress(spot.address);
		setCity(spot.city);
		setState(spot.state);
		setCountry(spot.country);
		setLat(spot.lat);
		setLng(spot.lng);
		setName(spot.name);
		setDescription(spot.description);
		setPrice(spot.price);
	}, [spot]);

	useEffect(() => {
		dispatch(getSpotDetails(spotId));
	}, [dispatch, spotId]);


	const UpdateSpot2 = async (e) => {
		e.preventDefault();
		// setHasSubmit(true);

		setErrors([]);
		const newInfo = {
			address,
			city,
			state,
			country,
			lat,
			lng,
			name,
			description,
			price
		};
		const newSpot = await dispatch(
			spotsActions.UpdateSpot(newInfo, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});

		if (newSpot) history.push(`/spots/${spotId}`);
	};

	const DeleteSpot2 = async () => {
		if (window.confirm('Please confirm. This action cannot be undone.'))
			await dispatch(spotsActions.DeleteSpot(spotId));

		history.push('/');
	};

	if (!Object.values(spot).length) return null;

	return (
		<div className="add-spot-wrapper">
			<div className="update-spot-form">
				Need to implement changes to <br /> {spot.name}?
			</div>
			<div className="add-spot-form-wrapper">
				<button onClick={DeleteSpot2} className="delete-button">
					Remove Spot!
				</button>
				<form id="create-form" onSubmit={UpdateSpot2}>
					<ul className="update-error">
						{errors.map((error, idx) => <li key={idx}>{error}</li>)}
					</ul>
					<input
						type="text"
						value={name}
						className="add-spot-form-input"
						onChange={(e) => setName(e.target.value)}
						placeholder="Name of your place"
					/>
					<input
						type="text"
						value={address}
						className="add-spot-form-input"
						onChange={(e) => setAddress(e.target.value)}
						placeholder="Address"
					/>
					<input
						type="text"
						value={city}
						className="add-spot-form-input"
						onChange={(e) => setCity(e.target.value)}
						placeholder="City"
					/>
					<input
						type="text"
						value={state}
						className="add-spot-form-input"
						onChange={(e) => setState(e.target.value)}
						placeholder="State"
					/>
					<input
						type="text"
						value={country}
						className="add-spot-form-input"
						onChange={(e) => setCountry(e.target.value)}
						placeholder="Country"
					/>
					<textarea
						type="text"
						value={description}
						className="add-spot-text-area"
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Please describe your place..."
					/>
					<input
						type="number"
						value={price}
						className="add-spot-form-input"
						onChange={(e) => setPrice(e.target.value)}
						placeholder="Price / night"
					/>
					<button className="submit-button">Update</button>
				</form>
			</div>
		</div>
	);
}
