import axios from "axios";

export const signup = (body) => { //export provides accessibility
    // return axios.post('/api/1.0/users', body, { headers: { 'accept-language': 'tr' } });
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
<<<<<<< HEAD
    return axios.post('/api/1.0/auth', {}, {auth: creds});
}

export const changeLanguage = language =>{
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = () => {
    return axios.get('/api/1.0/users');
=======
    return axios.post('/api/1.0/auth', {}, { auth: creds });
}

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = (page = 0, size = 3) => {
    return axios.get(`/api/1.0/users?page=${page}&size=${size}`);
}

export const setAuthorizationHeader = ({ username, password, isLoggedIn }) => {
    if (isLoggedIn) {
        const authorizationHeaderValue = `Basic ${btoa(username + ':' + password)}`;
        axios.defaults.headers['Authorization'] = authorizationHeaderValue;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = (username) => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`, body);
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
}