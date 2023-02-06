import React, { useState } from 'react';
import "./SingleSpot.css";

export default function Images({ previewImage, otherImgs }) {
	return (
		<div className="single-spot-wrapper-image">
			<div className="single-spot-prev-img">
				<img
					src={
						previewImage
							? previewImage.url
							: 'https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
					}
					className="single-spot-prev"
					alt="prev img"
				/>
			</div>
			<div className="single-spot-misc-imgs">
				{otherImgs?.map((image, i) => (
					<img
						alt={`Images`}
						key={i}
						className={`single-spot-other-img-2`}
						src={
							image
								? image.url
								: 'https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
						}
					/>
				))}
			</div>
		</div>
	);
}
