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
							: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ZUORVckQZ9J4iLlpYuyf8g377n5uH-ENIXOPsko&s'
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
								: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1ZUORVckQZ9J4iLlpYuyf8g377n5uH-ENIXOPsko&s'
						}
					/>
				))}
			</div>
		</div>
	);
}
