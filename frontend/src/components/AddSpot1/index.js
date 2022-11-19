import React, { useState } from 'react';
import { useHistory, NavLink } from "react-router-dom";
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
	const [errors, setErrors] = useState({});
	const [spotId, setSpotId] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const [spotForm, setSpotForm] = useState(true);
	const [imageForm, setImageForm] = useState(false);

	const fillWithImages = (idx) => (e) => {
		let newArray = [...otherImgs];
		newArray[idx] = e.target.value;

		setOtherImgs(newArray);
	};

	let newSpot;
	const handleFormInfo = async (e) => {
		e.preventDefault();
		setSubmitted(true);
		setErrors({});
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
			{/* NAVLINK img to redirect user back home */}
			<div className="add-spot-navlink">
				<NavLink to="/">
					<img
						src="https://mybnb-lucyluo.herokuapp.com/assets/logo-34e8587533b17eeb904517e28f490075173a3380205cde3cd6581bcae66d9c46.png"
						alt="home log"
						style={{ heigh: '50x', width: '50px' }}
					/>
				</NavLink>
			</div>
			{spotForm && (
				<div id="add-spot-title">
					Appbnb it. <br />
					Make your spot available to the world.
				</div>
			)}
			{imageForm && (
				<div id="add-spot-title">Let add some images to your place!</div>
			)}
			<div className="add-spot-form-wrapper">
				{spotForm && (
					<>
						<form id="create-form" onSubmit={handleFormInfo}>
							<input
								type="text"
								value={name}
								className="add-spot-form-input"
								onChange={(e) => setName(e.target.value)}
								placeholder="Name of your place"
							/>
							<div className="spot-error1 error">
								{submitted && (
									<span>{errors.name ? errors.name : <div></div>}</span>
								)}
							</div>
							<input
								type="text"
								value={address}
								className="add-spot-form-input"
								onChange={(e) => setAddress(e.target.value)}
								placeholder="Address"
							/>
							<div className="spot-error2 error">
								{submitted && (
									<span>{errors.address ? errors.address : null}</span>
								)}
							</div>
							<input
								type="text"
								value={city}
								className="add-spot-form-input"
								onChange={(e) => setCity(e.target.value)}
								placeholder="City"
							/>
							<div className="spot-error3 error">
								{submitted && <span>{errors.city ? errors.city : null}</span>}
							</div>
							<input
								type="text"
								value={state}
								className="add-spot-form-input"
								onChange={(e) => setState(e.target.value)}
								placeholder="State"
							/>
							<div className="spot-error4 error">
								{submitted && <span>{errors.state ? errors.state : null}</span>}
							</div>
							<input
								type="text"
								value={country}
								className="add-spot-form-input"
								onChange={(e) => setCountry(e.target.value)}
								placeholder="Country"
							/>
							<div className="spot-error5 error">
								{submitted && (
									<span>{errors.country ? errors.country : null}</span>
								)}
							</div>
							{/* <input
								type="number"
								value={lat}
								className="add-spot-form-input"
								onChange={(e) => setLat(e.target.value)}
								placeholder="Latitude"
							/>
							<div className="spot-error6 error">
								{submitted && <span>{errors.lat ? errors.lat : null}</span>}
							</div>
							<input
								type="number"
								value={lng}
								className="add-spot-form-input"
								onChange={(e) => setLng(e.target.value)}
								placeholder="Longitude"
							/>
							<div className="spot-error7 error">
								{submitted && <span>{errors.lng ? errors.lng : null}</span>}
							</div> */}
							<textarea
								type="text"
								value={description}
								className="add-spot-text-area"
								onChange={(e) => setDescription(e.target.value)}
								placeholder="Please describe your spot..."
							/>
							<div className="spot-error6 error">
								{submitted && (
									<span>{errors.description ? errors.description : null}</span>
								)}
							</div>
							<input
								type="number"
								value={price}
								className="add-spot-form-input"
								onChange={(e) => setPrice(e.target.value)}
								placeholder="Price per night"
								min="1"
								max="5"
							/>
							<div className="spot-error7 error">
								{submitted && <span>{errors.price ? errors.price : null}</span>}
							</div>
							<button className="submit-button">
								Now, let's add a couple photos!
							</button>
						</form>
					</>
				)}

				{imageForm && (
					<>
						<form id="create-form" onSubmit={onSubImg}>
							<input
								className="spot-form-input"
								type="text"
								value={previewImage}
								onChange={(e) => setPreviewImage(e.target.value)}
								placeholder="Preview Image"
							/>
							<div className="spot-error7 error">
								{submittedImg && (
									<span>{imgErrors.url ? imgErrors.url : null}</span>
								)}
							</div>
							{otherImgs.map((item, i) => {
								return (
									<input
										type="url"
										key={i}
										value={item}
										className="spot-form-input image-form-input"
										onChange={fillWithImages(i)}
										placeholder="Additional Images (not required)"
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
