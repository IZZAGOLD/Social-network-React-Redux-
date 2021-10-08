import { connect } from "react-redux";
import React from "react";
import * as axios from "axios"
import {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleFollowingProgress
} from "../../Redux/users-reducer";
import Users from "./Users"
import load from "./load.svg"
import s from "./Loader.module.css"
import {getUsers} from "../../api/api";


class UsersContainer extends React.Component {
    onPageChanged;
    componentDidMount() {

        if (this.props.users.length === 0) {
             this.props.toggleIsFetching(true);
             getUsers(this.props.currentPage, this.props.pageSize)//вызываем API
                .then(data => {
                    this.props.toggleIsFetching(false);
                    this.props.setUsers(data.items);
                    this.props.setTotalUsersCount((data.totalCount) / 100); /// !!!!!!!!!!!! ///
                })
        }
    }
    onPageChanged = (pageNumber) => {

        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true);
        getUsers(pageNumber, this.props.pageSize)
            .then(data => {//перенесли response в api.js
               this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
            })

    }
    render() {
        return <>
            {this.props.isFetching ? <div className={s.loader}><img  src={load} /> </div>:
                <Users toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       totalUsersCount={this.props.totalUsersCount}
                       onPageChanged={this.onPageChanged}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       setUsers={this.props.setUsers}
                       users={this.props.users}
                       setCurrentPage={this.props.setCurrentPage}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       isFetching={this.props.isFetching}/>}
            </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default connect(mapStateToProps,
    {toggleFollowingProgress, follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(UsersContainer);
//коннектит к стору и прокидывает пропсы в классовую компоненту UsersContainer