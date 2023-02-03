import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as spotActions from '../../store/spot';
import * as reviewActions from '../../store/review';
import * as bookingActions from '../../store/booking';
import './User.css';
import UserSpotCard from './UserSpotCard';
import UserReviewCard from './UserReviewCard';

export default function User() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    // const userSpots = useSelector((state) => Object.values(state.spots.user));
	const userReviews = useSelector((state) => Object.values(state.reviews.user));
    const userBookings = useSelector((state) => state.bookings.userBookings);

    const [showSpots, setShowSpots] = useState(true);
    const [showReviews, setShowReviews] = useState(false);
	const [showBookings, setShowBookings] = useState(false);

    const [futureReservations, setFutureReservations] = useState([]);
	const [passReservations, setPassReservations] = useState([]);

    useEffect(() => {
        const todayDate = new Date().toJSON().slice(0, 10);
		const getData = async () => {
			await dispatch(reviewActions.getCurrentUserReviews());
			await dispatch(spotActions.getAllSpots());
            await dispatch(spotActions.getUserSpots());
			const allBookings = await dispatch(bookingActions.getUserBookings());
			let futureBooking = [];
			let passBookings = [];
			allBookings?.forEach((booking) => {
				const isFutureBooking =
					booking.startDate > todayDate && booking.endDate > todayDate;
				if (isFutureBooking) futureBooking.push(booking);
				else passBookings.push(booking);
			});
			setFutureReservations(futureBooking.reverse());
			setPassReservations(passBookings);
		};

		if (sessionUser && !Object.values(userBookings).length) getData();
	}, [sessionUser, userBookings]);

    const handleShowSpots = () => {
        setShowSpots(true);
        setShowReviews(false);
        setShowBookings(false);
    };

    const handleShowReviews = () => {
		setShowReviews(true);
        setShowSpots(false);
		setShowBookings(false);
	};

	const handleShowBookings = () => {
        setShowBookings(true);
        setShowSpots(false);
		setShowReviews(false);
	};

    return (
        <div className="account-page-wrapper">
            {sessionUser && (
				<div className="account-info">
					<span id="first-last-name">
						{sessionUser?.firstName} {sessionUser?.lastName}
					</span>
					‎  <span id="email">{sessionUser?.email}</span>
				</div>
			)}
            <div className="account-options">
                <div
					className={`account-reviews ${showSpots ? 'show' : ''}`}
					onClick={handleShowSpots}
				>
					Manage Spots
				</div>
				<div
					className={`account-reviews ${showReviews ? 'show' : ''}`}
					onClick={handleShowReviews}
				>
					Manage Reviews
				</div>
				<div
					className={`account-spots ${showBookings ? 'show' : ''}`}
					onClick={handleShowBookings}
				>
					Manage Bookings
				</div>
			</div>

            <div className="account-display-wrapper">
                {sessionUser && showSpots && (
					<>
						<div className="account-booking-title">
							<div className='center'>Spots</div>
                        </div>
						{/* {userSpots?.map((spot, i) => (
							<UserSpotCard spot={spot} key={i} />
						))} */}
					</>
				)}
				{sessionUser && showReviews && (
					<>
                        <div className="account-booking-title">
							<div className='center'>Reviews</div>
						    <div id="upcoming-reservation" className='center'>
							    You can edit your reviews directly on the card! Simply click
							on the text or stars to start.
						    </div>
                        </div>
						{userReviews?.map((review, i) => (
							<UserReviewCard review={review} key={i} />
						))}
					</>
				)}
				{sessionUser && showBookings && (
					<>
						<div className="account-booking-title">
							<div className='center'>Bookings</div>
							<div id="upcoming-reservation">Upcoming reservations</div>
						</div>
						{/* {futureReservation?.map((booking, i) => (
							<AccountBookingCard booking={booking} key={i} />
						))} */}
						<div className="account-booking-title">
							<div id="upcoming-reservation">Places you've stayed</div>
						</div>
						<div className="account-display-pass-bookings">
							{/* {passReservation?.map((booking, i) => (
								<AccountPassBookingcard booking={booking} key={i} />
							))} */}
						</div>
					</>
				)}
			</div>
        </div>
    );
};
