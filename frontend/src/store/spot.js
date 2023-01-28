import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = '/spots/LOAD_SPOTS';
const LOAD_SPOT = '/spots/LOAD_SPOT';
const CREATE_SPOT = 'spots/createSpot';
const CLEAN_SPOT = 'spots/CLEAN_SPOT';

const normalize = (temp) => {
	const newObj = {};

	temp.forEach((item) => (newObj[item.id] = item));

	return newObj;
};

const loadAllSpots = (allSpots) => {
    return {
        type: LOAD_ALL_SPOTS,
        allSpots
    };
};

const loadSingleSpot = (spot) => {
	return {
		type: LOAD_SPOT,
		spot
	};
};

const createSpot = (spot) => {
	return {
	  type: CREATE_SPOT,
	  spot
	}
};


export const DeleteSpot = (spotId) => async () => {
	return await csrfFetch(`/api/spots/${spotId}`, {
		method: 'DELETE'
	});
};

export const UpdateSpot = (spotInfo, spotId) => async dispatch => {
	const res = await csrfFetch(`/api/spots/${spotId}`, {
		method: 'PUT',
		body: JSON.stringify(spotInfo)
	});

	if (res.ok) {
		const newSpot = await res.json();
		dispatch(createSpot(newSpot));
		return newSpot;
	}
};

export const getSpotDetails = (spotId) => async (dispatch) => {
	const res = await fetch(`/api/spots/${spotId}`);

	if (res.ok) {
		const spotData = await res.json();
		dispatch(loadSingleSpot(spotData));
	}
};

export const cleanSpot = () => {
	return {
		type: CLEAN_SPOT
	};
};

export const AddSpot = (spot) => async dispatch => {
	const res = await csrfFetch('/api/spots', {
		method: 'POST',
		body: JSON.stringify(spot)
	});

	if (res.ok) {
		const newSpot = await res.json();
		return newSpot;
	}
};

export const AddImage = (imageInfo, spotId) => async (dispatch) => {
	const { url, preview } = imageInfo;
	const formData = new FormData();
	formData.append('image', url);
	formData.append('preview', preview);
	const res = await csrfFetch(`/api/spots/${spotId}/images`, {
		method: 'POST',
		headers: {
			'Content-Type': 'multipart/form-data'
		},
		body: formData
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	}
};

export const getAllSpots = () => async (dispatch) => {
	const res = await fetch('/api/spots');

	if (res.ok) {
		const spots = await res.json();
		const newSpots = normalize(spots.Spots);
		dispatch(loadAllSpots(newSpots));
	}
};

const initialState = {
	AllSpots: {},
	SingleSpot: {}
};

export const spotsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL_SPOTS:
			newState.AllSpots = action.allSpots;
			return newState;
		case LOAD_SPOT:
			newState.SingleSpot = action.spot;
			return newState;
		case CLEAN_SPOT:
			newState.SingleSpot = {};
			return newState;
        default: {
            return state;
        }
    }
};
