import { useDispatch } from 'react-redux';


const UserSpotCard = ({ spot }) => {
	const dispatch = useDispatch();

    return (
        <div className="account-display-reviews">
            <a href={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                <div id="spot-name">
                    <a href={`/spots/${spot.id}`} style={{ textDecoration: 'none', color: 'black' }}>{spot.name}</a>
                </div>
                <div className='positioning'>
                    {spot.city}, {spot.state}
                </div>
                <div className='positioning'>
                    {spot.avgRating ? spot.avgRating : 'No Reviews'}
                    {spot.avgRating ?
                        <img
                            src="https://www.pngrepo.com/png/6977/180/star.png"
                            alt="self logo123"
                            style={{ height: '13px', width: '13px', marginLeft: '0.2em'}}
                        /> :
                        <img
                        src="https://www.pngrepo.com/png/6396/180/star.png"
                        alt="self logo123"
                        style={{ height: '13px', width: '13px', marginLeft: '0.2em'}}
                    />
                    }
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
            </a>
        </div>
    );
}

export default UserSpotCard;
