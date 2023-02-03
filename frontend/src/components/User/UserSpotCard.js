import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


const UserSpotCard = ({ spot }) => {
    const history = useHistory();
	const dispatch = useDispatch();

    const editButton = async (e) => {
        e.preventDefault();
        history.push(`/spots/${spot.id}/update`);
    };

    return (
        <div className="user-spot-card">
            <div className="account-review-title">
                {spot.name}
            </div>

        </div>
    );
}

export default UserSpotCard;
