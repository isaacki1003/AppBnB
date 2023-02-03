import './PortfolioButton.css';
import me from '../../assets/me.jpg';

const PortfolioButton = () => {
    return (
        <div>
            <a href="https://www.isaacki.com" target="_blank">
                <img class="sticky" src={me} alt="sticky image"></img>
            </a>
        </div>
    );
};

export default PortfolioButton;
