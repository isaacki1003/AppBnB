import { useDispatch } from 'react-redux';


const UserSpotCard = ({ spot }) => {
	const dispatch = useDispatch();

    return (
        <div className="user-spot-card">
            <div className="account-review-title">
                <a href={`/spots/${spot.id}`}>{spot.name}</a>
            </div>

        </div>
    );
}

export default UserSpotCard;
