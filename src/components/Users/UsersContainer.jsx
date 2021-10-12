import { connect } from "react-redux";
import React from "react";
import {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsersThunkCreator,
    getUsersThunkCreator2, followUsersCreator, unfollowUsersCreator
} from "../../Redux/users-reducer";
import Users from "./Users"
import load from "./load.svg"
import s from "./Loader.module.css"

class UsersContainer extends React.Component {
    onPageChanged;
    componentDidMount() {

        if (this.props.users.length === 0) {
           this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
        }
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator2(pageNumber, this.props.pageSize)
            }
    render() {
        return <>
            {this.props.isFetching ? <div className={s.loader}><img  src={load} /> </div>:
                <Users toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       totalUsersCount={this.props.totalUsersCount}
                       onPageChanged={this.onPageChanged}

                       setUsers={this.props.setUsers}
                       users={this.props.users}
                       setCurrentPage={this.props.setCurrentPage}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       isFetching={this.props.isFetching}
                       followUsersCreator={this.props.followUsersCreator}
                       unfollowUsersCreator={this.props.unfollowUsersCreator}/>}
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
    {
        toggleFollowingProgress, follow, unfollow, setCurrentPage,
        getUsersThunkCreator, getUsersThunkCreator2, followUsersCreator, unfollowUsersCreator
    })(UsersContainer);
//коннектит к стору и прокидывает пропсы в классовую компоненту UsersContainer