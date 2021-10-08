import React from "react";
import Header from "./Header";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../Redux/auth-reducer";
import {getAuth} from "../../api/api";



class HeaderContainer extends React.Component{
componentDidMount() {
    getAuth()
        .then(data => {
           if (data.resultCode === 0) {
               let {id, email, login} = data.data
               this.props.setAuthUserData(id, email, login)
           }
        })
}


    render () {
    return <Header {...this.props}/>
}
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
userId: state.auth.userId

})

export default connect(mapStateToProps, {setAuthUserData}) (HeaderContainer);