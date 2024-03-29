import React, { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, OverlayView } from '@react-google-maps/api';
//This is of course not the raw key but either from getting it from the backend and storing it in redux or in your frontend .env
import Geocode from 'react-geocode';
import { useDispatch, useSelector } from 'react-redux';
import "./SingleSpot.css";

const SingleMap = ({ spot }) => {
	const [currentPosition, setCurrentPosition] = useState([]);
	Geocode.setApiKey(process.env.REACT_APP_MAPS_KEY);
	// set response language. Defaults to english.
	Geocode.setLanguage('en');

	Geocode.setLocationType('ROOFTOP');

	// Enable or disable logs. Its optional.
	Geocode.enableDebug();
	useEffect(() => {
		// Get latitude & longitude from address
		const makeMap = () => {
			Geocode.fromAddress(`${spot.address}, ${spot.city}`).then(
				(response) => {
					const { lat, lng } = response.results[0].geometry.location;
					setCurrentPosition({ lat, lng });
				},
				(error) => {
					console.error(error);
				}
			);
		};

		makeMap();
	}, []);

	//This sets the center of the map. This must be set BEFORE the map loads

	// This is the equivalent to a script tag
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_MAPS_KEY
	});

	const containerStyle = {
		width: '100%',
		height: '500px',
		zIndex: '0'
	};

	const [map, setMap] = useState(null);

	const onUnmount = useCallback(function callback(map) {
		setMap(null);
	}, []);

	return (
		// Important! Always set the container height explicitly

		<div className="map-single-wrapper">
			{isLoaded && (
				<GoogleMap
					mapContainerStyle={containerStyle}
					zoom={13}
					center={currentPosition}
					onUnmount={onUnmount}
				>
					<OverlayView
						position={currentPosition}
						mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
					>
						<div className="single-house-map">
							<div className="marker-circle"></div>
							<div className="marker-circle-content">
								<i class="fa-solid fa-house-chimney"></i>
							</div>
						</div>
					</OverlayView>
				</GoogleMap>
			)}
		</div>
	);
};

export default SingleMap;
