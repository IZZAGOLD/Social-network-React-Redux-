import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '96bc0260-631f-4c80-985c-1e2e7256335d',

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
    },
    updateStatus(status) {
        return instance.put('profile/status', {status:status})
    },
    savePhoto(photo) {
        const formData = new FormData();
        formData.append("image", photo);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profileData) {
        return instance.put('/profile', profileData)
    },
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    }
}

export const authAPI = {
    getAuth() {
        return instance.get(`auth/me`)
    },
    getLogin(email, password, rememberMe = false, captcha = null) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get('security/get-captcha-url')
    }
}
