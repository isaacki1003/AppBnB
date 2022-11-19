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
							: 'https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
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
								: 'https://st4.depositphotos.com/14953852/22772/v/1600/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg'
						}
					/>
				))}
			</div>
		</div>
	);
}
