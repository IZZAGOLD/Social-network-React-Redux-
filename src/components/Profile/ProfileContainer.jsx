import React from "react";
import Profile from "./Profile"
import {connect} from "react-redux";
import {
    getUserStatusCreator,
    loadMyProfileCreator,
    loadProfileCreator, savePhoto, saveProfile,
    setUserProfile,
    updateStatusCreator
} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";
import {withAuthRedirect} from "../HOC/WithAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {
     getProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.meUserId
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.loadProfileCreator(userId)
        this.props.getUserStatusCreator(userId)
    }

    componentDidMount() {
        this.getProfile()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
         if (this.props.match.params.userId != prevProps.match.params.userId){
        this.getProfile()}
        console.log(1)
    }

    render() {
        return (
            <Profile updateStatusCreator={this.props.updateStatusCreator}
                     status={this.props.status}
                     owner={!this.props.match.params.userId}
                     {...this.props}
                     savePhoto={this.props.savePhoto}
                     saveProfile={this.props.saveProfile}
                     profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    meUserId: state.auth.userId,
    status: state.profilePage.status
})

export default compose(connect(mapStateToProps, {
        setUserProfile,
        loadMyProfileCreator, loadProfileCreator,
        getUserStatusCreator, updateStatusCreator, savePhoto, saveProfile
    }), withRouter, withAuthRedirect
)(ProfileContainer)
