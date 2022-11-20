import React, { useEffect } from 'react';
import { Modal } from '../../context/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsBySpotId } from '../../store/review';
import { useParams } from 'react-router-dom';
import useModalVariableContext from '../../context/ModalVariable';
import SpotReviewForm from '../ReviewForm';
import DeleteReview from '../DeleteReview';
import "./ReviewSpots.css";

export default function SpotReviews({ spot }) {
	const { spotId } = useParams();
	const dispatch = useDispatch();
	const spotReviews = useSelector((state) => Object.values(state.reviews.spot));
	const sessionUser = useSelector((state) => state.session.user);

	const { showReviewModal, setShowReviewModal } = useModalVariableContext();

	useEffect(() => {
		dispatch(getReviewsBySpotId(spotId));
	}, [dispatch, spotId]);

	if (!spotReviews) return null;

	let showRev = false;
	if (sessionUser && sessionUser.id !== spot.Owner.id) showRev = true;
	spotReviews.forEach((review) => {
		if (sessionUser?.id === review.userId) showRev = false;
	});

	return (
		<div className="spot-wrapper-revs" id="all-revs">
			<div className="rev-title">
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
				{spot.avgStarRating
					? spot.avgStarRating + ` - ` + spot.numReviews + ` reviews`
					: 'Be the first to drop a review!'}{' '}
			</div>
			{showRev && (
				<button
					type="button"
					className="rev-add-new"
					onClick={() => setShowReviewModal(true)}
				>
					{' '}
					Write a review
				</button>
			)}
			{showReviewModal && (
				<Modal onClose={() => setShowReviewModal(false)}>
					<SpotReviewForm />
				</Modal>
			)}
			<div className="wrapper-revs">
				{spotReviews?.map((review, i) => (
					<div className="wrapper-rev" key={i}>
						<div className="row-rev1">
							<div class="rever">
								<img
									src="https://www.pngrepo.com/png/168246/180/avatar.png"
									style={{ height: '50px', width: '50px' }}
									alt="temp1"
								/>
								<div className="date-name-rev">
									<div className="rever-name">{review.User.firstName}</div>
									<div className="review-date">
										{new Date(review.createdAt)
											.toDateString()
											.split(' ')
											.filter((el, j) => j % 2 !== 0)
											.join(' ')}
									</div>
								</div>
							</div>
							{sessionUser && sessionUser?.id === review.userId && (
								<DeleteReview reviewId={review.id} spotId={spotId} />
							)}
						</div>
						<div className="row-rev2">{review.review}</div>
					</div>
				))}
			</div>
		</div>
	);
}
