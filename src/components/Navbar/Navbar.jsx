import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';


//let s = {
//'nav': 'Navbar_nav__2p3dp ',
//'item': 'Navbar_item__17CVX '
//}

//let classes = {`${c1} ${c2}`};//

const Navbar = () => {
  return <nav className = {s.nav}>
    <div className = {s.item}>
      <NavLink to="/profile" activeClassName={s.activeLink}>Profile</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to="/dialogs" activeClassName={s.activeLink}>Messages</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to="/news" activeClassName={s.activeLink}>News</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to="/music" activeClassName={s.activeLink}>Music</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to="/users" activeClassName={s.activeLink}>Users</NavLink>
    </div>
    <div className = {s.item}>
      <NavLink to="/settings" activeClassName={s.activeLink}>Settings</NavLink>
    </div>
  </nav>
}

export default Navbar;