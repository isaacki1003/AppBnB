import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getSpotDetails } from '../../store/spot';
import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spot';
import './AddSpot.css';

export default function AddSpot1() {
	const dispatch = useDispatch();
	const history = useHistory();

	const [previewImage, setPreviewImage] = useState(null);
	const [otherImgs, setOtherImgs] = useState(new Array(4).fill(null));
	const [submittedImg, setSubmittedImg] = useState(false);
	const [imgErrors, setImgErrors] = useState({});

	const [address, setAddress] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState('');
	const [errors, setErrors] = useState([]);
	const [spotId, setSpotId] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const [spotForm, setSpotForm] = useState(true);
	const [imageForm, setImageForm] = useState(false);

	const imageFill = (idx) => (e) => {
		let newArray = [...otherImgs];
		newArray[idx] = e.target.value;

		setOtherImgs(newArray);
	};

	let newSpot;
	const onSubmit = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setErrors([]);
		const spotInfo = {
			address,
			city,
			state,
			country,
			lat: 1,
			lng: 1,
			name,
			description,
			price
		};

		newSpot = await dispatch(spotsActions.AddSpot(spotInfo)).catch(
			async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			}
		);

		if (newSpot) {
			setSpotId(newSpot.id);
			setSpotForm(false);
			setImageForm(true);
		}
	};

	const onSubImg = async (e) => {
		e.preventDefault();
		setSubmittedImg(true);
		setImgErrors({});

		const prevImgInfo = { url: previewImage, preview: true };
		let succesful = await dispatch(
			spotsActions.AddImage(prevImgInfo, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setImgErrors(data.errors);
			}
		});

		let redir = false;
		if (succesful) {
			otherImgs.forEach(async (image) => {
				if (image) {
					const imgInfo = { url: image, preview: false };
					await dispatch(spotsActions.AddImage(imgInfo, spotId)).catch(
						async (res) => {
							const data = await res.json();
							if (data && data.errors) {
								setImgErrors(data.errors);
							}
						}
					);
				}
			});
			redir = true;
		}

		if (redir) {
			dispatch(getSpotDetails(spotId));
			history.push(`/spots/${spotId}`);
		}
	};


	return (
		<div className="add-spot-wrapper">
			{spotForm && (
				<div id="add-spot-title">
					Appbnb it. <br />
					Share your spot to the world.
				</div>
			)}
			{imageForm && (
				<div id="add-spot-title">
					Upload a preview image. <br />
					Please provide the URL.
				</div>
			)}
			<div className="add-spot-form-wrapper">
				{spotForm && (
					<>
						<form id="create-form" onSubmit={onSubmit}>
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
								placeholder="Please describe your spot..."
							/>
							<input
								type="number"
								value={price}
								className="add-spot-form-input"
								onChange={(e) => setPrice(e.target.value)}
								placeholder="Price per night"
								min="1"
								max="5"
							/>
							<button className="submit-button">
								Now, let's add a couple photos!
							</button>
						</form>
					</>
				)}

				{imageForm && (
					<>
						<form id="create-form" onSubmit={onSubImg}>
							<ul className="update-error">
								{errors.map((error, idx) => <li key={idx}>{error}</li>)}
							</ul>
							<input
								className="add-spot-form-input"
								type="text"
								value={previewImage}
								onChange={(e) => setPreviewImage(e.target.value)}
								placeholder="Preview Image"
							/>
							{otherImgs.map((item, i) => {
								return (
									<input
										type="url"
										key={i}
										value={item}
										className="add-spot-form-input"
										onChange={imageFill(i)}
										placeholder="Extra Images (not required)"
									/>
								);
							})}
							<button className="submit-button">Host</button>
						</form>
					</>
				)}
			</div>
		</div>
	);
}
