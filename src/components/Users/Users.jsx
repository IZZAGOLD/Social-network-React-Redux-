import styles from "./users.module.css"
import {NavLink} from 'react-router-dom';
import React from "react";


const url = 'https://social-network.samuraijs.com/api/1.0/follow/'
const Users = (props) => {
    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return <div>
        <div>
            {pages.map((p) => {
                return <button
                    className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => {
                        props.onPageChanged(p)
                    }}>{p}</button>
            })}
        </div>
        {props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={/profile/ + u.id}>
                              <img
                                  src={u.photos.small != null ? u.photos.small : 'https://icdn.lenta.ru/images/2021/04/07/19/20210407195955109/square_320_64a1e3121f499e9952053769745d273b.jpg'}/>
                        </NavLink>
                        </div>
                    <div>
                        {u.followed ?
                            <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.unfollowUsersCreator(u.id)}}>
                                Unfollow</button> :
                            <button
                                disabled={props.followingInProgress.some(id => id === u.id)}
                                onClick={() => {
                                    props.followUsersCreator(u.id)}}>
                                Follow</button>}
                    </div>
                </span>
            <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{"u.location.country"}
                        </div>
                        <div>{"u.location.city"}
                        </div>
                    </span>
                </span>
        </div>)
        }
    </div>

}


export default Users;