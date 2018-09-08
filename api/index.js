import { baseURL } from '~/config';
import { axios } from '~/plugins/axios';
import queryString from 'query-string';

let LOGIN_CONFIG = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
};

export default {
    auth: {
        login: (data) => axios.post(`${baseURL}auth/token/`, queryString.stringify(data), LOGIN_CONFIG),
        register: (data) => axios.post(`${baseURL}auth/register/`, data),
        checkAuth: ()=> axios.get(`${baseURL}check-auth/`)
    },

    menu: {
        getOptions: (restaurant, menuItem) => axios.get(`${baseURL}restaurants/${restaurant}/menu/${menuItem}/`)
    },

    restaurants: {
        find: (query) => axios.get(`${baseURL}restaurants/search/?q=${query}`),
        getMenu: (slug) => axios.get(`${baseURL}restaurants/${slug}/menu/`),
        findWithinRadius: (lat, lng) => axios.get(`${baseURL}restaurants/location/?lat=${lat}&lng=${lng}`)
    }
}