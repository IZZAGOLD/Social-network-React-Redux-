import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': '96bc0260-631f-4c80-985c-1e2e7256335d'
    }
})
// Получаем юзеров
export const getUsers = (currentPage, pageSize) => {
    return (
        instance.get(`users?page=${currentPage}&count=${pageSize}`, {})
            .then(response => response.data)
    )
}
// Авторизация
export const getAuth = () => {
    return (
        instance.get(`auth/me`)
            .then(response => response.data)
    )
}
// Загрузка своего профиля
export const loadProfileMe = (meUserId) => {
    return (
        instance.get(`profile/${meUserId}`)
            .then(response => response.data)
    )
}
// Загрузка профайла
export const loadProfile = (userId) => {
    return (
        instance.get(`profile/${userId}`)
            .then(response => response.data)
    )
}
