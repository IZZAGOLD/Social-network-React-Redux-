import React from "react";
import Profile from "./Profile"

import {connect} from "react-redux";
import {loadMyProfileCreator, loadProfileCreator, setUserProfile} from "../../Redux/profile-reducer";
import {Redirect, withRouter} from "react-router-dom";


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
    }

    render() {
        if (this.props.isAuth == false) { return <Redirect to={"/login"} />}
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

/// круглые скобки, потому что возвращает объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    meUserId: state.auth.userId,
    isAuth: state.auth.isAuth
})
const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {
    setUserProfile,
    loadMyProfileCreator, loadProfileCreator
})(WithUrlDataContainerComponent);