import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
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


export const getAuthCreator = () => {
    return (dispatch) => {
        authAPI.getAuth()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data
                    dispatch(setAuthUserData(id, email, login, true))
                }
            })
    }
}

export const getLoginCreator = (values) => {
    return (dispatch) => {
        authAPI.getLogin(values.login, values.password, values.rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(getAuthCreator())
                }
            })
    }
}
export const getLogOutCreator = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            })
    }
}

export default authReducer;