import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '96bc0260-631f-4c80-985c-1e2e7256335d'
    }
})
export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {})
            .then(response => response.data)
    },
    loadProfileMe(myId) {
        return instance.get(`profile/${myId}`)
    },
    loadProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    unfollowUser(id) {
        return instance.delete(`follow/${id}`)// del принимает withCredentials вторым параметром
    },
    followUser(id) {
        return instance.post(`follow/${id}`, null)// post withCredentials третьим
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    }
}

// Авторизация
export const getAuth = () => {
    return (
        instance.get(`auth/me`)
            .then(response => response.data)
    )
}


