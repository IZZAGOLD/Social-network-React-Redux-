import {usersAPI} from "../api/api";
import {stopSubmit} from 'redux-form'

const ADD_POST: string = 'ADD_POST'; // добавляем пост в Профайле
const SET_USER_PROFILE: string = 'SET_USER_PROFILE'; // обновляем стейт при наборе поста
const SET_STATUS: string = 'SET_STATUS';
const SET_PHOTO: string = 'SET_PHOTO'

type PostsType = {
    id: number
    message: string
    likesCount: number
}

type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
type ProfilePhotosType = {
    small: string | null
    large: string | null
}
type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ProfileContactsType
    photos: ProfilePhotosType
}

let initialState = {
    postData: [
        {id: 1, message: 'Hi, how are you?', likesCount: 10},
        {id: 2, message: 'first post', likesCount: 5},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
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
        case SET_PHOTO:
            debugger
            return {
                ...state,
                profile: {...state.profile, photos: action.photo} as ProfileType
            };
        default:
            return state;
    }
}
type AddPostCreateActionType = {
    type: typeof ADD_POST
    newPost: string
}
type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusType = {
    type: typeof SET_STATUS
    status: string
}
type SetPhotoType = {
    type: typeof SET_PHOTO
    photo: ProfilePhotosType
}
export const addPostCreateAction = (newPost: string): AddPostCreateActionType => ({type: ADD_POST, newPost})
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status})
export const setPhoto = (photo: ProfilePhotosType): SetPhotoType => ({type: SET_PHOTO, photo})

export const loadMyProfileCreator = (myId:number) => {
    return (dispatch: any) => {
        usersAPI.loadProfileMe(myId)
            .then((response: { data: ProfileType; }) => {
                dispatch(setUserProfile(response.data))
            })
    }
}
export const loadProfileCreator = (userId:number) => {
    return (dispatch: any) => {
        usersAPI.loadProfile(userId)
            .then((response: { data: ProfileType; }) => {
                dispatch(setUserProfile(response.data))
            })
    }
}
export const getUserStatusCreator = (userId:number) => {
    return (dispatch: any) => {
        usersAPI.getStatus(userId)
            .then((response: { data: string; }) => {
                dispatch(setStatus(response.data))
            })
    }
}
export const updateStatusCreator = (status:string) => {
    return (dispatch: any) => {
        usersAPI.updateStatus(status)
            .then((response: { data: { resultCode: number; }; }) => {
                if (response.data.resultCode === 0) {
                    dispatch(setStatus(status))
                }
            })
    }
}

export const savePhoto = (photo:ProfilePhotosType) => async (dispatch: any) => {
    const response = await usersAPI.savePhoto(photo)
    if (response.data.resultCode === 0) {
        dispatch(setPhoto(response.data.data.photos))
    }
}
export const saveProfile = (profileData:ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    const response = await usersAPI.saveProfile(profileData)
    if (response.data.resultCode === 0) {
        dispatch(loadProfileCreator(userId))
    } else {
        const messages = response.data.messages.length > 0 ?
            response.data.messages : 'Some error'
        dispatch(stopSubmit('edit-profile', {_error: messages}))
        return Promise.reject(messages);
    }
}

export default profileReducer;