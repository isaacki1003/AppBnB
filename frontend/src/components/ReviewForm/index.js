import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import useModalVariableContext from '../../context/ModalVariable';
import * as spotsActions from '../../store/spot';
import * as reviewsActions from '../../store/review';
import './ReviewForm.css';

export default function SpotReviewForm() {
	const { spotId } = useParams();
	const [review, setReview] = useState('');
	const [stars, setStars] = useState(null);
	const [hover, setHover] = useState(null);
	const [errors, setErrors] = useState([]);
	const [hasSubmit, setHasSubmit] = useState(false);
	const { setShowReviewModal } = useModalVariableContext();
	const dispatch = useDispatch();

	const handleReviewReloadData = async () => {
		setShowReviewModal(false);
		await dispatch(reviewsActions.getReviewsBySpotId(spotId));
		await dispatch(spotsActions.getSpotDetails(spotId));
	};

	const HandleSubmitReview = async (e) => {
		e.preventDefault();
		setHasSubmit(true);

		setErrors([]);

		const reviewInfoData = { review, stars };

		const newReview = await dispatch(
			reviewsActions.postReview(reviewInfoData, spotId)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});

		if (newReview) {
			handleReviewReloadData();
		}
	};
	return (
		<div className="rev-form-wrapper-3">
			<p className="login-close-1" onClick={() => setShowReviewModal(false)}>
				x
			</p>
			<ul className="error-review-form">
				{errors.map((error, idx) => <li key={idx}>{error}</li>)}
			</ul>
			<h4 className="login-title">Describe Your Experience</h4>
			<form className="login-form form-r" onSubmit={HandleSubmitReview}>

				<div className="text-rating">Rating</div>
				<div>
					{[...Array(5)].map((star, i) => {
						const valRating = i + 1;
						return (
							<label key={i}>
								<input
									className="inp-star"
									type="radio"
									name="rating"
									value={valRating}
									onClick={() => setStars(valRating)}
								/>
								<FaStar
									className="stars"
									class="fa-solid fa-star"
									color={
										valRating <= (hover || stars) ? '#ffc107' : '#e4e5e9'
									}
									size={25}
									onMouseEnter={() => setHover(valRating)}
									onMouseLeave={() => setHover(null)}
								/>
							</label>
						);
					})}
				</div>

				<div className="text-rev-wrapper">
					<div className="text-rev-title">Leave a detailed review!</div>

					<textarea
						className="text-rev"
						name="text-rev"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Let others know what it was like to stay at this spot..."
					/>
				</div>

				<button className="button-rev">Submit!</button>
			</form>
		</div>
	);
}
