import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthCreator, getLogOutCreator, setAuthUserData} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthCreator()
    }

    render() {
        return <Header {...this.props}/>
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId

})

export default connect(mapStateToProps, {setAuthUserData, getAuthCreator, getLogOutCreator})(HeaderContainer);