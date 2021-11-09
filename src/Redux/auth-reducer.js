import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA = 'SET_USER_DATA';
const SET_CAPTCHA = 'SET_CAPTCHA';

const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captcha: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case  SET_CAPTCHA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
})
export const setCaptcha = (captcha) => ({
    type: SET_USER_DATA, payload: {captcha}
})

export const getAuthCreator = () => async (dispatch) => {
    const response = await authAPI.getAuth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const getLoginCreator = (values) => async (dispatch) => {
    const {login, password, rememberMe, captcha} = values
    const response = await authAPI.getLogin(login, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
       dispatch(getAuthCreator())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let messages = response.data.messages.length > 0 ?
            response.data.messages[0] : 'Some error'
        dispatch(stopSubmit('login', {_error: messages}))
    }
}

export const getLogOutCreator = () => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(setCaptcha(captchaUrl))
}

export default authReducer;