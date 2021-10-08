import React from "react";
import Profile from "./Profile"
import * as axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {loadProfile, loadProfileMe} from "../../api/api";


class ProfileContainer extends React.Component {
    componentDidMount() {
        let userIdMe = this.props.meUserId
        let userId = this.props.match.params.userId
        // свой профиль
        if (!userId) {
            loadProfileMe(userIdMe)
                .then(data => {
                    this.props.setUserProfile(data);
                })
        }
        //чужие профили
        loadProfile(userId)
            .then(data => {
                this.props.setUserProfile(data);
            })
    }
    render () {
        return (
            <Profile {...this.props} profile={this.props.profile} />
        )
    }
}

/// круглые скобки, потому что возвращает объект, а не тело функции
let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    meUserId: state.auth.userId
})
const WithUrlDataContainerComponent = withRouter(ProfileContainer)
export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent);