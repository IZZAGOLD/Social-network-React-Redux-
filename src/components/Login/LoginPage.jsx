import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {getLoginCreator, getLogOutCreator} from "../../Redux/auth-reducer";
import {Input} from "../common/FormsControl/FromsControl";
import {requiredField} from "../../utils/validatorss/validators";
import {Redirect} from "react-router-dom";


const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Login'} name={"login"} component={Input} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder={'password'} name={"password"} component={Input} validate={[requiredField]}
                       type={"password"}/>
            </div>
            <div>
                <Field type={'checkbox'} name={"rememberMe"} component={Input}/>
                <span>Remember me</span>
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
const LoginReduxForm = reduxForm({form: "login"})(LoginForm)


const LoginPage = (props) => {
    const getLogin = (values) => {
    props.getLoginCreator(values)
        debugger
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }


    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={getLogin}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {getLoginCreator})(LoginPage)

