import { axios } from '~/plugins/axios';
import { baseURL, ACCESS_TOKEN_NAME } from '~/config';
import { cookies } from 'js-cookie';
import { setAuthToken, resetAuthToken } from '~/utils/auth';

axios.defaults.baseURL = baseURL;

const token = cookies.get(ACCESS_TOKEN_NAME);

if(token) setAuthToken(token);
else resetAuthToken();
