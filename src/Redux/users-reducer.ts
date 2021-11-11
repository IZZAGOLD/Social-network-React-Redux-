import {usersAPI} from "../api/api";

const FOLLOW: string = 'FOLLOW';
const UNFOLLOW: string = 'UNFOLLOW';
const SET_USERS: string = 'SET_USERS';
const SET_CURRENT_PAGE: string = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT: string = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING: string = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS: string = 'TOGGLE_IS_FOLLOWING_PROGRESS';


type UserType = {
    id: number
    name: string
    status: string
    photos: ProfilePhotosType
}

type ProfilePhotosType = {
    small: string | null
    large: string | null
}
type FollowingInProgress = {
    userId: number
    isFetching: boolean
}
let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<FollowingInProgress>
}
export type InitialStateType = typeof initialState
const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching ?
                    [...state.followingInProgress, action.userId]
                    : [...state.followingInProgress.filter(id => id != action.userId)]
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS
    users: UserType
}
type FollowType = {
    type: typeof FOLLOW
    userId: number
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    count: number
}
type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const unfollow = (userId: number): UnfollowType => ({type: UNFOLLOW, userId})
export const setUsers = (users: UserType): SetUsersType => ({type: SET_USERS, users})
export const follow = (userId: number): FollowType => ({type: FOLLOW, userId})
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage})
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType => ({
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
})
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching})
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

export const getUsersThunkCreator = (page: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(page));
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(page, pageSize)//вызываем API
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount((data.totalCount)));

}


const flowFollowUnfollow = async (dispatch: any, id: number, apiMethod: Function, AC: Function) => {
    dispatch(toggleFollowingProgress(true, id))
    const response = await apiMethod(id)
    if (response.data.resultCode == 0) {
        dispatch(AC(id))
        dispatch(toggleFollowingProgress(false, id))
    }
}

export const unfollowUsersCreator = (id: number) => (dispatch: any) => {
    flowFollowUnfollow(dispatch, id, usersAPI.unfollowUser.bind(usersAPI), unfollow)
}

export const followUsersCreator = (id: number) => (dispatch: any) => {
    flowFollowUnfollow(dispatch, id, usersAPI.followUser.bind(usersAPI), follow)
}


export default usersReducer;