import React from "react";
import Profile from "./Profile"

import {connect} from "react-redux";
import {
    getUserStatusCreator,
    loadMyProfileCreator,
    loadProfileCreator,
    setUserProfile,
    updateStatusCreator} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {compose} from "redux";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let myId = this.props.meUserId
        let userId = this.props.match.params.userId
        // свой профиль
        if (!userId) {
            this.props.loadMyProfileCreator(myId)
        }
        //чужие профили
        this.props.loadProfileCreator(userId)
        this.props.getUserStatusCreator(myId)// Как передать чужой ID?
    }

    render() {

        return (
            <Profile updateStatusCreator={this.props.updateStatusCreator}
                     status={this.props.status}
                     {...this.props} p
                     rofile={this.props.profile}/>
        )
    }
}


/// круглые скобки, потому что возвращает объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    meUserId: state.auth.userId,
    status: state.profilePage.status
})

export default compose(connect(mapStateToProps, {
        setUserProfile,
        loadMyProfileCreator, loadProfileCreator,
        getUserStatusCreator, updateStatusCreator
    }), withRouter, withAuthRedirect
)(ProfileContainer)
