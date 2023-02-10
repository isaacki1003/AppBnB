import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { getSpotDetails } from '../../store/spot';
import { useDispatch } from "react-redux";
import * as spotsActions from '../../store/spot';
import './AddSpot.css';
import Preview from '../Preview';

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
	const [hasSubmit, setHasSubmit] = useState(false);

	const [spotForm, setSpotForm] = useState(true);
	const [imageForm, setImageForm] = useState(false);

	const [hasSubmitImg, setHasSubmitImg] = useState(false);
	const [imageErrors, setImageErrors] = useState(false);
	const [UploadedImages, setUploadedImages] = useState([]);
	const [showPreview, setShowPreview] = useState(false);


	const imageFill = (idx) => (e) => {
		let newArray = [...otherImgs];
		newArray[idx] = e.target.value;

		setOtherImgs(newArray);
	};

	let newSpot;
	const onSubmit = async (e) => {
		e.preventDefault();
		setHasSubmit(true);
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

	const handleAddPhotos = (e) => {
		setImageErrors(false);
		setShowPreview(true);
		setHasSubmitImg(false);
		const postImage = async (imagess) => {
			let imageArr = [];
			let allImages = Object.values(imagess);
			for (let i = 0; i < allImages.length; i++) {
				let image = allImages[i];
				let preview = i == 0 ? true : false;
				const imageData = { url: image, preview };
				const newImage = await dispatch(
					spotsActions.AddImage(imageData, spotId)
				).catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) {
						setImageErrors(data.errors);
					}
				});
				imageArr.push(newImage.url);
			}
			setUploadedImages(imageArr);
			setShowPreview(false);
			setHasSubmitImg(true);
		};
		const updateFiles = (e) => {
			const files = e.target.files;
			postImage(files);
		};

		updateFiles(e);
	};

	const onSubImg = async (e) => {
		e.preventDefault();

		dispatch(getSpotDetails(spotId));
		history.push(`/spots/${spotId}`);
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
								max="10000"
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
							<div className="uploaded-images-wrapper">
								{!showPreview &&
									UploadedImages.map((image) => (
										<img
											src={image}
											className="spot-uploaded-images"
											onError={({ currentTarget }) => {
												currentTarget.onerror = null;
												currentTarget.src =
													'https://nhutbnb.s3.us-west-1.amazonaws.com/error_image.png';
												setImageErrors(true);
											}}
										/>
									))}
								{showPreview && <Preview />}
							</div>
							{imageErrors && (
								<div className="upload-image-error">
									There was an issue with one or more of your images. Please try again.
								</div>
							)}
							<div className="choose-file-main-button-wrapper center">
								<label className="choose-file-main-button">
									Select Images
									<input
										type="file"
										multiple
										onChange={handleAddPhotos}
										className="choose-file-image-button"
									/>
								</label>
							</div>
							<div className="image-disclaimer">
								* You must reupload all images if you want to change them.
							</div>
							{hasSubmitImg && (
								<button className="submit-button">Host</button>
							)}
							{!hasSubmitImg && (
								<button className="form-submit-button">
									View listing without Photos
								</button>
							)}
						</form>
					</>
				)}
			</div>
		</div>
	);
}
