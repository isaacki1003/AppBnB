import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

const UserPastCard = ({ booking }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const allSpots = useSelector((state) => state.spots.AllSpots);
	const thisSpot = allSpots[booking.Spot.id];

	const startDate = new Date(booking.startDate.replace('-', '/'));
	console.log('startDate -------------------------------->', startDate)
	const tripYear = startDate.toDateString().slice(11, 15);
	const startMonth = startDate.toDateString().slice(4, 7);
	const startDay = startDate.toDateString().slice(8, 10);
	const endDate = new Date(booking.endDate.replace('-', '/'));
	const endMonth = endDate.toDateString().slice(4, 7);
	const endDay = endDate.toDateString().slice(8, 10);

	// edit booking state
	return (
		<div className="account-pass-booking-card-wrapper">
			<div
				className="account-pass-booking-card-image"
				onClick={() => history.push(`/spots/${thisSpot.id}`)}
			>
				<img src={thisSpot.previewImage} alt={thisSpot.name} />
			</div>
			<div className="account-pass-booking-card-info">
				<div className="account-pass-booking-card-address">
					{thisSpot.city}, {thisSpot.state}
				</div>
				<div className="account-pass-booking-card-host">
					Hosted by User #{thisSpot.ownerId}
				</div>
				<div className="account-pass-booking-card-date">
					{startMonth == endMonth && (
						<div id="pass-booking-date">{startMonth}</div>
					)}
					<div id="pass-booking-date">
						{startMonth == endMonth
							? `${startDay} - ${endDay}`
							: `${startDate.toDateString().slice(4, 10)} - ${endDate
									.toDateString()
									.slice(4, 10)}`}
						, {tripYear}
					</div>
					{/* <div id="pass-booking-date">{tripYear}</div> */}
				</div>
			</div>
		</div>
	);
};

export default UserPastCard;
