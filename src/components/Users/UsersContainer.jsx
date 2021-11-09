import {connect} from "react-redux";
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
import Preloader from "../common/Preloader";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/users-selectors";
import {compose} from "redux";

class UsersContainer extends React.Component {
    componentDidMount() {
            this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null }
                <Users toggleFollowingProgress={this.props.toggleFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                       totalUsersCount={this.props.totalUsersCount}
                       onPageChanged={this.onPageChanged}
                       users={this.props.users}
                       setCurrentPage={this.props.setCurrentPage}
                       pageSize={this.props.pageSize}
                       currentPage={this.props.currentPage}
                       isFetching={this.props.isFetching}
                       followUsersCreator={this.props.followUsersCreator}
                       unfollowUsersCreator={this.props.unfollowUsersCreator}/>
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
connect(mapStateToProps,
    {
        toggleFollowingProgress, follow, unfollow, setCurrentPage,
        getUsersThunkCreator, followUsersCreator, unfollowUsersCreator
    }))(UsersContainer);
//коннектит к стору и прокидывает пропсы в классовую компоненту UsersContainer