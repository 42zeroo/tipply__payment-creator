import homeIcon from '../../assets/icons/home.svg'
import userIcon from '../../assets/icons/user.svg'
import logo from '../../assets/logo.svg'
import { Button } from '../shared/Button';

export const Navbar = () => {
  return (
    <header className="navbar__container">
      <div className="navbar__wrapper">
        <a href="#" className="navbar__button--home">
          <img src={homeIcon} alt='home_icon' />
        </a>

        <div className="navbar__logo">
          <a href="https://tipply.pl">
            <img src={logo} alt='home_icon' />
          </a>
        </div>

        <a href="#" className="navbar__button">
          <img src={userIcon} alt='user_icon' />

          <Button type='button'>            
            Przejdź do panelu
          </Button>
        </a>
      </div>
    </header>
  );
};
