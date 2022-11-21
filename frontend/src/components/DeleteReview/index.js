import React from 'react';
import { useDispatch } from 'react-redux';
import * as reviewsActions from '../../store/review';
import * as spotsActions from '../../store/spot';
import "./DeleteReview.css"

export default function DeleteReview({ reviewId, spotId }) {
	const dispatch = useDispatch();

	const deleteRev = async () => {
		await dispatch(reviewsActions.deleteReview(reviewId));
		await dispatch(reviewsActions.getReviewsBySpotId(spotId));
		await dispatch(spotsActions.getSpotDetails(spotId));
	};
	return (
		<button
			type="button"
			onClick={deleteRev}
			className="review-del"
		>
			Delete Your Review
		</button>
	);
}
