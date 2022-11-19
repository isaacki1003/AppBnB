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
	const [errors, setErrors] = useState({});
	const [hasSubmit, setHasSubmit] = useState(false);
	const { setShowReviewModal } = useModalVariableContext();
	const dispatch = useDispatch();

	const handleReviewReloadData = async () => {
		setShowReviewModal(false);
		dispatch(reviewsActions.getReviewsBySpotId(spotId));
		dispatch(spotsActions.getSpotDetails(spotId));
	};

	const submitRev = async (e) => {
		e.preventDefault();
		setHasSubmit(true);

		setErrors({});

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
		<div className="login-wrapper">
			<h4 className="login-title">How was your experience?</h4>
			<form className="login-form form-r" onSubmit={submitRev}>
				<div className="text-rating">Rating</div>
				<div>
					{[...Array(5)].map((star, i) => {
						const ratingValue = i + 1;
						return (
							<label key={i}>
								<input
									className="star-input"
									type="radio"
									name="rating"
									value={ratingValue}
									onClick={() => setStars(ratingValue)}
								/>
								<FaStar
									className="stars"
									class="fa-solid fa-star"
									color={
										ratingValue <= (hover || stars) ? '#ffc107' : '#e4e5e9'
									}
									size={25}
									onMouseEnter={() => setHover(ratingValue)}
									onMouseLeave={() => setHover(null)}
								/>
							</label>
						);
					})}
				</div>
				<div className=" error">
					{hasSubmit && <span>{errors.stars ? errors.stars : null}</span>}
				</div>
				<div className="text-rev-wrapper">
					<div className="text-rev-title">Write about your experience!</div>
					<div className="text-rev-subTitle">
						Let others know what it was like to stay at this spot.
					</div>
					<textarea
						className="text-rev"
						name="text-rev"
						value={review}
						onChange={(e) => setReview(e.target.value)}
						placeholder="Please describe your stay..."
					/>
				</div>
				<div className=" error">
					{hasSubmit && <span>{errors.review ? errors.review : null}</span>}
				</div>
				<button className="button-rev">Confirm</button>
			</form>
		</div>
	);
}
