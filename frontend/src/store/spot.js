import { csrfFetch } from "./csrf";

const ALL_SPOTS = '/spots/getAllSpots';

const loadAllSpots = (allSpots) => {
    return {
        type: ALL_SPOTS,
        spots: allSpots
    };
};

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('api/spots');

    const spotData = await response.json();

    dispatch(loadAllSpots(spotData));

    return spotData;
};

const initialState = {

};

const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_SPOTS: {


            }
        }
    }
}

export default spotReducer;
