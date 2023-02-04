import { useDispatch } from 'react-redux';


const UserSpotCard = ({ spot }) => {
	const dispatch = useDispatch();
    console.log('spot', spot)

    return (
        <div className="account-display-reviews">
            <div id="spot-name">
                <a href={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>{spot.name}</a>
            </div>
            <div className='positioning'>
                {spot.city}, {spot.state}
            </div>
            <div className='positioning'>
                {spot.avgRating ? spot.avgRating : 'No Reviews'}
            </div>
            <div className="center positioning">
                <a href={`/spots/${spot.id}`} style={{ textDecoration: 'none' }}>
                    <img
                        src={spot.previewImage}
                        style={{ width: '400px', height: '250px', borderRadius: '8%', marginTop: '1em' }}
                        onLoad={(event) => {
                            if (!event.target.complete) {
                            event.target.src = 'https://st.depositphotos.com/1987177/3470/v/450/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg';
                            }
                        }}
                        alt="No preview available"
                    />
                </a>
            </div>
        </div>
    );
}

export default UserSpotCard;
