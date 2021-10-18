import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {getLogOutCreator} from "../../Redux/auth-reducer";

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                { props.isAuth
                    ? <div>{props.login}
                        <button onClick={props.getLogOutCreator}>Log out</button> </div>:
                    <NavLink className={s.loginBlock} to={'/login'}>Login</NavLink>}
            </div>
        </header>)
}

export default Header;