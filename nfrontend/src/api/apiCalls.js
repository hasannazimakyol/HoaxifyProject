import axios from "axios";

export const signup = (body) => { //export provides accessibility
    // return axios.post('/api/1.0/users', body, { headers: { 'accept-language': 'tr' } });
    return axios.post('/api/1.0/users', body);
}

export const login = creds => {
    return axios.post('/api/1.0/auth', {}, {auth: creds});
}

export const changeLanguage = language =>{
    axios.defaults.headers['accept-language'] = language;
}

export const getUsers = () => {
    return axios.get('/api/1.0/users');
}