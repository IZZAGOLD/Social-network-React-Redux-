import {usersAPI} from "../api/api";

const ADD_POST = 'ADD_POST'; // добавляем пост в Профайле
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'; // обновляем стейт при наборе поста
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // обновляем стейт при наборе поста
const SET_STATUS = 'SET_STATUS';

let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 10 },
        { id: 2, message: 'first post', likesCount: 5 },
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.newPost,
                likesCount: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost]
            };

            case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };
            case SET_STATUS:
            return {
                ...state,
                status: action.status
            };
        default: return state;
    }
}

export const addPostCreateAction = (newPost) => ({ type: ADD_POST,  newPost})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })

export const loadMyProfileCreator = (myId) => {
    return (dispatch) => {
        usersAPI.loadProfileMe(myId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}
export const loadProfileCreator = (userId) => {
    return (dispatch) => {
        usersAPI.loadProfile(userId)
            .then(response => {
                dispatch(setUserProfile(response.data));
            })
    }
}
export const getUserStatusCreator = (userId) => {
    return (dispatch) => {
        usersAPI.getStatus(userId)
            .then(response => {
                dispatch(setStatus(response.data));
            })
    }
}
export const updateStatusCreator = (status) => {
    return (dispatch) => {
        usersAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0){
                dispatch(setStatus(status))};
            })
    }
}



export default profileReducer;