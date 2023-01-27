import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cleanSpot, getSpotDetails } from '../../store/spot';
import SpotInfo from './SpotInfo';
import Images from './Images';
import SpotTitle from './SpotTitle';
import SpotReviews from '../ReviewsSpot';
import SingleMap from './SingleMap';
import "./SingleSpot.css";

export default function SingleSpot() {
    const { spotId } = useParams();
	const dispatch = useDispatch();
    const spot = useSelector(state => state.spots.SingleSpot);

    useEffect(() => {
        dispatch(getSpotDetails(spotId));

        return () => dispatch(cleanSpot());
    }, [dispatch, spotId]);

    if (!Object.keys(spot).length) return null;

	const previewImage = spot.SpotImages?.find(image => image.preview === true);
	let otherImgs = new Array(4).fill(null);
	const otherImages = spot.SpotImages?.filter(
		img => img.preview === false
	);
	otherImages?.forEach((image, i) => {
		otherImgs[i] = image;
	});

	const spotNames = spot.name?.split(' ');
	let name = '';
	for (let i = 0; i < spotNames?.length; i++) {
		name += spotNames[i] + ' ';
		if (i === 2) break;
	}

	return (
		<div>
			<div className='title-help'>
				<SpotTitle spot={spot} />
			</div>
			<div className="single-spot-wrapper">
				<Images otherImgs={otherImgs} previewImage={previewImage} />
				<SpotInfo name={name} spot={spot} />
				<SingleMap spot={spot} />
				<SpotReviews spot={spot} />
			</div>
		</div>
	);
};
