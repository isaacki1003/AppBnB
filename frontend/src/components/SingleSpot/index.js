import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cleanSpot, getSpotDetails } from '../../store/spot';

export default function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.SingleSpot);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));

        return () => dispatch(cleanSpot());
    }, [dispatch]);

    if (!Object.keys(spot).length) return null;


    return (
		<div>

		</div>
	);
};
