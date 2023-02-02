import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Modal } from '../../context/Modal';
import useModalVariableContext from '../../context/ModalVariable';
import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle';
import * as bookingActions from '../../store/booking';


function currencyFormat(num) {
	return num.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD'
	});
};

export default function SpotInfo({ spot, name }) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const allBooking = useSelector((state) => state.bookings.singleSpotBookings);

	//all booking state
	const [bookingDates, setBookingDates] = useState('');
	const [selectedStartDate, setSelectedStartdate] = useState('');
	const [spotBookings, setSpotBookings] = useState([]);
	const [serviceFee, setServiceFee] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const [priceBeforeFee, setPriceBeforeFee] = useState(0);
	const [totalStay, setTotalStay] = useState(0);
	const [tax, setTax] = useState(0);
	const [grandTotal, setGrandTotal] = useState(0);
	const [bookingDetails, setBookingDetails] = useState(false);
	const [availabilityButton, setAvailabilityButton] = useState('');

	const [haveDateSelected, setHaveDateSelected] = useState(true);
	const [calendarOpened, setCalendarOpened] = useState(false);

	const [haveCalendarRendered, setHaveCalendarRendered] = useState(false);

	//Login and signup modal if user Not Login In
	const {
		showModalLogin,
		setShowModalLogin,
		showModalSignup,
		setShowModalSignup
	} = useModalVariableContext();

	//error state
	const [errors, setErrors] = useState({});

	//booked modal
	const [showBookedModal, setShowBookedModal] = useState(false);
	const [confirmedDate, setConfirmedDate] = useState('');

	useEffect(() => {
		const getBookings = async () => {
			let bookings = await dispatch(bookingActions.getSpotBookings(spot.id));
			bookings = bookings.map((booking) => [
				booking.startDate,
				booking.endDate
			]);
			setSpotBookings(bookings);
		};

		getBookings();

		return () => dispatch(bookingActions.clearSpotBookings());
	}, []);

	//add check-in and check-in label to booking input box
	useEffect(() => {
		const box = document.getElementsByClassName(
			'react-daterange-picker__inputGroup'
		);
		const checkIn = document.createElement('div');
		const checkOut = document.createElement('div');
		checkIn.classList.add('date-checkin-label');
		checkOut.classList.add('date-checkin-label');

		const contentCheckIn = document.createTextNode('CHECK-IN');
		const contentCheckOut = document.createTextNode('CHECK-OUT');
		checkIn.appendChild(contentCheckIn);
		checkOut.appendChild(contentCheckOut);
		box[0].prepend(checkIn);
		box[1].prepend(checkOut);
	}, []);

	//Set booking details once date have been selected
	useEffect(() => {
		if (bookingDates) {
			setBookingDetails(true);
			setHaveDateSelected(false);
			const totalStay = Math.floor(
				(new Date(bookingDates[1]) - new Date(bookingDates[0])) / 86400000
			);
			const priceBeforeFee = parseInt(spot.price * totalStay);
			const serviceFee = parseInt((spot.price * totalStay * 0.145).toFixed(0));
			const totalPrice = serviceFee + priceBeforeFee + 300;
			const taxes = totalPrice * 0.15;
			const grandTotal = totalPrice + taxes;
			setPriceBeforeFee(currencyFormat(priceBeforeFee));
			setServiceFee(currencyFormat(serviceFee));
			setTotalPrice(currencyFormat(totalPrice));
			setTotalStay(totalStay);
			setTax(currencyFormat(taxes));
			setGrandTotal(currencyFormat(grandTotal));
		} else {
			setBookingDetails(false);
			setHaveDateSelected(true);
		}
	}, [bookingDates]);

	// move the open calendar button into a different place.
	useEffect(() => {
		if (haveDateSelected) {
			let calendarButton = document.getElementById('show-calendar-button');
			const newLocationForButton = document.getElementById('show-calendar-div');
			if (!availabilityButton) setAvailabilityButton(calendarButton);
			calendarButton = availabilityButton ? availabilityButton : calendarButton;
			newLocationForButton.append(calendarButton);
		} else {
			const newLocationForButton = document.getElementById('show-calendar-div');
			while (newLocationForButton.lastElementChild) {
				newLocationForButton.removeChild(newLocationForButton.lastElementChild);
			}
		}
	}, [haveDateSelected]);

	useEffect(() => {
		const calendarDiv = document.getElementsByClassName('react-calendar');
		if (calendarOpened) {
			const clearDateButton = document.getElementById('clear-date-button');
			calendarDiv[0].append(clearDateButton);
		}
		if (!haveCalendarRendered) setHaveCalendarRendered(calendarDiv);
	}, [calendarOpened]);

	const formatDate = (date, key) => {
		const day = new Date(date).toDateString().toString();
		return day.split(' ')[0].split('').slice(0, 2).join('');
	};

	//Handle submit Booking
	const handleSubmitBooking = async (e) => {
		e.preventDefault();

		if (!user) {
			return setShowModalLogin(true);
		}
		if (user?.id == spot.ownerId) {
			setHaveDateSelected(true);
			setBookingDetails(false);
			setBookingDates('');
			return window.alert('You cannot book your own spot!');
		}
		setConfirmedDate(bookingDates);
		const startDate = new Date(bookingDates[0])
			.toJSON()
			.slice(0, 10)
			.toString();
		let endDate = new Date(bookingDates[1]);
		endDate.setHours(endDate.getHours() - 23);
		endDate = new Date(endDate).toJSON().slice(0, 10).toString();

		const bookingInfo = { startDate, endDate };

		const newBooking = await dispatch(
			bookingActions.createBooking(spot.id, bookingInfo)
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) {
				setErrors(data.errors);
			}
		});
		if (newBooking) {
			let bookings = await dispatch(bookingActions.getSpotBookings(spot.id));
			bookings = bookings.map((booking) => [
				booking.startDate,
				booking.endDate
			]);
			setSpotBookings(bookings);
			setErrors({});
			setHaveDateSelected(true);
			setBookingDetails(false);
			setShowBookedModal(true);
			setBookingDates('');
		}
	};

	useEffect(() => {
		if (errors.endDate || errors.startDate)
			window.alert(errors.endDate ? errors.endDate : errors.startDate);
	}, [errors]);

	return (
		<div className="single-spot-body">
			<div className="single-spot-body-left">
				<div className="single-spot-host">
					<div className="single-spot-host2">
						{name} hosted by {spot?.Owner.firstName}
					</div>
				</div>

				<div className="wrapper-information">
					<div className="information">
						<img
							src="https://www.pngrepo.com/png/25394/180/lock.png"
							alt="self logo"
							style={{ height: '29px', width: '29px' }}
						/>
						<div className="information-col1">
							<div className="information-r1">Self check-in</div>
							<div className="information-r2">
								Check yourself in with the keypad.
							</div>
						</div>
					</div>

					<div className="information">
						<img
							src="https://www.pngrepo.com/png/325875/180/communication.png"
							alt="message logo"
							style={{ height: '29px', width: '29px' }}
						/>
						<div className="information-col1">
							<div className="information-r1">Great communication</div>
							<div className="information-r2">
								69% of recent guests rated {spot.Owner.firstName} 5-star in
								communication.
							</div>
						</div>
					</div>

					<div className="information">
						<img
							src="https://www.pngrepo.com/png/27700/180/badge.png"
							alt="logo1"
							style={{ height: '29px', width: '29px' }}
						/>
						<div className="information-col1">
							<div className="information-r1">
								{spot.Owner.firstName} is a Superhost
							</div>
							<div className="information-r2">
								Superhosts are experienced, highly rated hosts who are committed
								to providing great stays for guests.
							</div>
						</div>
					</div>

					<div className="information">
						<img
							src="https://www.pngrepo.com/png/4336/180/calendar.png"
							alt="logo2"
							style={{ height: '29px', width: '30px' }}
						/>
						<div className="information-col2">
						 ‎‎ ‎ ‎   Free cancellation for 48 hours.
						</div>
					</div>
				</div>

				<div className="aircover">
					<img
						src="https://a0.muscache.com/im/pictures/54e427bb-9cb7-4a81-94cf-78f19156faad.jpg"
						style={{ height: '30px', width: '142px' }}
						alt="air"
					/>
					<div>
						Every booking includes free protection from Host cancellations,
						listing inaccuracies, and other issues like trouble checking in.
					</div>
				</div>
				<div className="wrapper-desc">
					<div>{spot.description}</div>
				</div>
			</div>
			<div className="single-spot-body-r">
				<div className="wrapper-book">
					<div className="review-price">
						<div>
							${spot.price} <span style={{ fontSize: '1rem' }}> night</span>
						</div>
						<div className="booking-reviews">
							{spot.avgStarRating ? (
								<img
								src="https://www.pngrepo.com/png/6977/180/star.png"
								alt="self logo1235"
								style={{ height: '13px', width: '13px'}}
							/>
							) : (
								<img
						src="https://www.pngrepo.com/png/6396/180/star.png"
						alt="self logo1236"
						style={{ height: '13px', width: '13px'}}
					/>
							)}{' '}
							{spot.avgStarRating ? spot.avgStarRating : 0} •{' '}
							<a href="#reviews" style={{ color: 'gray' }}>
								{spot.numReviews} reviews
							</a>
						</div>
					</div>
					<DateRangePicker
						onChange={setBookingDates}
						value={bookingDates}
						minDate={new Date()}
						onClickDay={(value, event) => {
							if (selectedStartDate) setSelectedStartdate('');
							else setSelectedStartdate(value.toJSON().slice(0, 10).toString());
						}}
						rangeDivider={false}
						showDoubleView={true}
						monthPlaceholder={'mm'}
						yearPlaceholder={'yyyy'}
						dayPlaceholder={'dd'}
						showNeighboringMonth={false}
						calendarIcon={
							<button id="show-calendar-button">Check availability</button>
						}
						clearIcon={
							calendarOpened ? (
								<button id="clear-date-button">Clear dates</button>
							) : null
						}
						goToRangeStartOnSelect={false}
						showFixedNumberOfWeeks={false}
						tileDisabled={({ activeStartDate, date, view }) => {
							let currDate = date.toJSON().slice(0, 10).toString();
							if (currDate <= new Date().toJSON().slice(0, 10)) return true;
							for (let i = 0; i < spotBookings.length; i++) {
								let bookingDate = spotBookings[i];
								if (bookingDate[0] <= currDate && bookingDate[1] >= currDate)
									return true;

								if (selectedStartDate) {
									if (selectedStartDate > currDate) return true;
									if (
										bookingDate[0] > selectedStartDate &&
										currDate > bookingDate[0]
									)
										return true;
								}
							}
						}}
						view={'month'}
						formatShortWeekday={(locale, date) => formatDate(date, 'dd')}
						onClick={() =>
							haveCalendarRendered.length ? setCalendarOpened(true) : null
						}
						// disabled={disabled}
						calendarClassName="booking-calendar"
					/>
					<div
						id="show-calendar-div"
						onClick={() => setCalendarOpened(true)}
					></div>
					{bookingDates ? (
						<button className="reserve-button" onClick={handleSubmitBooking}>
							Reserve
						</button>
					) : null}
					{bookingDetails && (
						<>
							<div className="wrapper-fee">
								<div>
									${spot.price} x {totalStay} nights
								</div>
								<div>{priceBeforeFee}</div>
							</div>
							<div className="wrapper-fee">
								<div>Cleaning fee</div>
								<div>$300</div>
							</div>
							<div className="wrapper-fee feeS">
								<div>Service fee</div>
								<div>{serviceFee}</div>
							</div>
							<div className="total-price-wrapper">
								<div className="title-tot">Total: </div>
								<div className="tot">{totalPrice}</div>
							</div>
						</>
					)}
				</div>
			</div>
			{showBookedModal && (
				<Modal
					onClose={() => {
						setShowBookedModal(false);
					}}
				>
					<div className="confirmed-booking-modal-wrapper">
						<div id="congrat-div">Congratulation, your trip is confirmed!</div>
						<div className="comfirmed-booking-modal-content-wrapper">
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">Dates</div>
								<div>
									{new Date(confirmedDate[0]).toDateString().slice(0, 10)} -{' '}
									{new Date(confirmedDate[1]).toDateString().slice(0, 10)},{' '}
									{new Date(confirmedDate[1]).toDateString().slice(-4)}
								</div>
							</div>
							<div className="comfirmed-booking-modal-content">
								<div className="confirmed-booking-modal-title">
									Price details
								</div>
								<div className="fees-wrapper">
									<div>
										${spot.price} x {totalStay} nights
									</div>
									<div>{priceBeforeFee}</div>
								</div>
								<div className="fees-wrapper">
									<div>Cleaning fee</div>
									<div>$300</div>
								</div>
								<div className="fees-wrapper">
									<div>Service fee</div>
									<div>{serviceFee}</div>
								</div>
								<div className="fees-wrapper serviceFee">
									<div>Taxes</div>
									<div>{tax}</div>
								</div>
								<div className="total-price-wrapper">
									<div className="total-title">Total (USD): </div>
									<div className="total">{grandTotal}</div>
								</div>
								<div>
									You can manage all your trips in the{' '}
									<NavLink to="/account">account</NavLink> page.
								</div>
								<div
									className="confirmed-trip-modal-done-button"
									onClick={() => setShowBookedModal(false)}
								>
									Done
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}
