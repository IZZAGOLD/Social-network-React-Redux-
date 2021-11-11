import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const SET_USER_DATA: string = 'SET_USER_DATA';
const SET_CAPTCHA: string = 'SET_CAPTCHA';

const initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as string | null
}
export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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
type SetAuthUserDataActionPayloadType = {
    userId: number | null, email: string | null, login: string | null, isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: {userId, email, login, isAuth}
})
type SetCaptchaActionPayloadType = {
    captcha: string
}
type SetCaptchaActionType = {
    type: typeof SET_USER_DATA
    payload: SetCaptchaActionPayloadType
}

export const setCaptcha = (captcha: string): SetCaptchaActionType => ({
    type: SET_USER_DATA, payload: {captcha}
})

export const getAuthCreator = () => async (dispatch: any) => {
    const response = await authAPI.getAuth()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

type ValuesOfLoginFormType = {
    login: string, password: string, rememberMe: boolean, captcha: null
}

export const getLoginCreator = (valuesOfLoginForm: ValuesOfLoginFormType) => async (dispatch: any) => {
    const {login, password, rememberMe, captcha} = valuesOfLoginForm
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

export const getLogOutCreator = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptcha()
    const captchaUrl = response.data.url
    dispatch(setCaptcha(captchaUrl))
}

export default authReducer;