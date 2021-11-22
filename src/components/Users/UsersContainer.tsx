import {connect} from "react-redux";
import React from "react";
import {
    getUsersThunkCreator,
    followUsersCreator, unfollowUsersCreator, UserType
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
import {AppStateType} from "../../Redux/redux-store";

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}
type MapDispatchPropsType = {
    followUsersCreator: (id: number) => void
    unfollowUsersCreator: (id: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                followingInProgress={this.props.followingInProgress}
                totalUsersCount={this.props.totalUsersCount}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                // setCurrentPage={this.props.setCurrentPage} может использовать в пагинаторе?
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                followUsersCreator={this.props.followUsersCreator}
                unfollowUsersCreator={this.props.unfollowUsersCreator}/>
        </>
    }
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
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
    connect(
        mapStateToProps,
        {
            getUsersThunkCreator, followUsersCreator, unfollowUsersCreator
        }))(UsersContainer)
//коннектит к стору и прокидывает пропсы в классовую компоненту UsersContainer