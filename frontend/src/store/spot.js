import { csrfFetch } from "./csrf";

const LOAD_ALL_SPOTS = '/spots/LOAD_SPOTS';
const LOAD_SINGLE_SPOT = '/spots/LOAD_SINGLE_SPOT';

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
		type: LOAD_SINGLE_SPOT,
		spot
	};
};

export const getAllSpots = () => async (dispatch) => {
	const res = await fetch('/api/spots');

	if (res.ok) {
		const spotsData = await res.json();
		const normalizedSpots = normalize(spotsData.Spots);
		dispatch(loadAllSpots(normalizedSpots));
	}
};

const initialState = {
	AllSpots: {},
	SingleSpots: {}
};

export const spotsReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_ALL_SPOTS:
			newState.AllSpots = action.allSpots;
			return newState;
		case LOAD_SINGLE_SPOT:
			newState.SingleSpots = action.spot;
			return newState;
        default: {
            return state
        }
    }
};
