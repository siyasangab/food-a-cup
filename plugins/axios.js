import axios from 'axios';

axios.interceptors.request.use((config) => {
    return config;
}, (err)=> {
    return Promise.reject(err)
});

axios.interceptors.response.use(function (response) {
    return response;
}, function(err) {
    if(!err.response) {
        console.error('Server is down!');
        return;
    }
    if(err.response.status === 401) {
        
    }
    return Promise.reject(err);
});

export {
    axios
}