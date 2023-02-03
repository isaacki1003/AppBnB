import { csrfFetch } from './csrf';

const LOAD_SPOT_REVIEW = 'spot/LOAD_SPOT_REVIEW';
const LOAD_USER_REVIEWS = 'user/LOAD_USER_REVIEWS';

const initialState = {
	spot: {},
	user: {}
};

const normalize = data => {
	const object = {};
	data.forEach(item => (object[item.id] = item));
	return object;
};


const userRevs = reviews => {
	return {
		type: LOAD_USER_REVIEWS,
		reviews
	};
};

const spotRevs = reviews => {
	return {
		type: LOAD_SPOT_REVIEW,
		reviews
	};
};


export const deleteReview = revId => async () => {
	const response = await csrfFetch(`/api/reviews/${revId}`, {
		method: 'DELETE'
	});

	const deleteRes = await response.json();
	return deleteRes;
};

export const getCurrentUserReviews = () => async dispatch => {
	const response = await csrfFetch('/api/reviews/current');

	if (response.ok) {
		const newInfo = await response.json();
		const userReviews = normalize(newInfo.Reviews);
		dispatch(userRevs(userReviews));
	}
};

export const postReview = (review, spotId) => async () => {
	const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
		method: 'POST',
		body: JSON.stringify(review)
	});

	const newReview = await res.json();
	return newReview;
};

export const updateReview = (reviewInfo, reviewId) => async () => {
	const res = await csrfFetch(`/api/reviews/${reviewId}`, {
		method: 'PUT',
		body: JSON.stringify(reviewInfo)
	});

	const updatedReview = await res.json();
	return updatedReview;
};

export const getReviewsBySpotId = spotId => async (dispatch) => {
	const response = await fetch(`/api/spots/${spotId}/reviews`);

	if (response.ok) {
		const spotReviews = await response.json();
		const normRevs = normalize(spotReviews.Reviews);
		dispatch(spotRevs(normRevs));
	}
};

const ReviewsReducer = (state = initialState, action) => {
	Object.freeze(state);
	const reviewsState = { ...state };
	switch (action.type) {
		case LOAD_USER_REVIEWS:
			reviewsState.user = action.reviews;
			return reviewsState;
		case LOAD_SPOT_REVIEW:
			reviewsState.spot = action.reviews;
			return reviewsState;
		default:
			return state;
	}
};

export default ReviewsReducer;
