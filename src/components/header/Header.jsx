import { useNavigate } from 'react-router-dom';
import './Header.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../global-state/cartItems';
import logo from '../../assets/logo.svg';

export const navElements = [
  // { label: <logo />, route: '', style: { marginRight: 'auto' } },
  { label: 'Model S', route: 'model_s' },
  { label: 'Model X', route: 'model_x' },
  { label: 'Cybertruck', route: 'cybertruck' },
  { label: 'Shop', route: 'shop' },
  { label: <ShoppingCartIcon />, route: 'cart', style: { marginLeft: 'auto' } },
  { label: 'Menu', route: null },
];

export default function Header({ setShowSidebar }) {
  const navigate = useNavigate();
  const cartItems = useRecoilValue(cartState);

  return (
    <>
      <nav>
        <ul className="headerList">
          <img
            src={logo}
            style={{
              marginRight: 'auto',
              height: '20px',
              width: '120px',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/');
            }}
          />
          {navElements.map(({ label, route, style = {} }) => {
            if (route === 'cart') {
              return (
                <li
                  onClick={() => {
                    navigate(`/${route}`);
                  }}
                  key={route}
                  style={style}
                >
                  <span className="cart-items-count">{cartItems.length}</span>
                  {label}
                </li>
              );
            }
            return (
              <li
                style={style}
                key={label}
                onClick={() => {
                  if (label === 'Menu') {
                    setShowSidebar(true);
                  } else {
                    navigate(`/${route}`);
                  }
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
