import React from "react";
import {Field, reduxForm} from 'redux-form';
import {connect} from "react-redux";
import {getLoginCreator, getLogOutCreator} from "../../Redux/auth-reducer";
import {createField, Input} from "../common/FormsControl/FromsControl";
import {requiredField} from "../../utils/validatorss/validators";
import {Redirect} from "react-router-dom";
import styles from '../common/FormsControl/FormsControl.module.css'

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
            { props.error &&
                <div className={styles.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>

            { props.captchaUrl && <img src={props.captchaUrl} /> }
            { props.captchaUrl &&  createField("Symbols from image", "captcha", [requiredField], Input, {}) }

        </form>
    )
}
const LoginReduxForm = reduxForm({form: "login"})(LoginForm)

const LoginPage = (props) => {
    const getLogin = (values) => {
    props.getLoginCreator(values)
    }

    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={getLogin} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captcha
})

export default connect(mapStateToProps, {getLoginCreator})(LoginPage)

