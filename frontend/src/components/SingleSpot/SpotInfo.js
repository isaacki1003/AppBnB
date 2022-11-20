import React from 'react';

export default function SpotInfo({ spot, name }) {
	const fee = parseInt((spot.price * 5 * 0.145).toFixed(0));
	const weeklyPrice = parseInt(spot.price * 5);
	const total = fee + weeklyPrice + 300;
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
									alt="message logo"
									style={{ height: '15px', width: '15px' }}
								/>
							) : (
								<img
									src="https://www.pngrepo.com/png/6396/180/star.png"
									alt="message logo"
									style={{ height: '15px', width: '15px' }}
								/>
							)}{' '}
							{spot.avgStarRating ? spot.avgStarRating : 0}
						</div>
					</div>
					<div className="wrapper-fee">
						<div>${spot.price} x 5 nights</div>
						<div>${weeklyPrice}</div>
					</div>
					<div className="wrapper-fee">
						<div>Cleaning fee</div>
						<div>$300</div>
					</div>
					<div className="wrapper-fee serviceFee">
						<div>Service fee</div>
						<div>${fee}</div>
					</div>

					<div>
						<div className="title-tot">Total: </div>
						<div className="tot">${total}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
