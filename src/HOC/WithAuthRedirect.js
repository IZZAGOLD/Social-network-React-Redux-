import React from "react";
import {Redirect} from "react-router-dom";
import Dialogs from "../components/Dialogs/Dialogs";
import {connect} from "react-redux";

let mapStateToRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) return <Redirect to={'/login'} />
            return <Component {...this.props} />
        }

    }
//коннектит к стору, забирать isAuth и возвращает AuthRedirectComponent
    const ConnectedAuthRedirectComponent = connect(mapStateToRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
}