import api from '~/api';
import { CLIENT_ID, GRANT_TYPE, ACCESS_TOKEN_NAME } from '~/config';
import { setAuthToken, resetAuthToken } from '~/utils/auth';
import cookies from 'js-cookie';

export const state = () => ({
    user: null,
    isAuth: false
  })
  export const mutations = {
    set_auth_status (store, authStatus) {
        store.isAuth = authStatus && cookies.get(ACCESS_TOKEN_NAME);
    }
  }
  export const actions = {
    login ({commit}, data) {
        debugger;
      if(!data)
        return;

      data.client_id = CLIENT_ID;
      data.grant_type = GRANT_TYPE;

      return api.auth.login(data)
        .then(response => {
          setAuthToken(response.data.access_token);
          cookies.set(ACCESS_TOKEN_NAME, response.data.access_token, { expires: response.data.expires_in / 60 / 60 });
          commit('set_auth_status', true);
          return response
        }).catch((error) => {
          return Promise.reject(error); 
        })
    },
    register ({commit}, data) {
      if(!data)
        return;

      return api.auth.register(data)
        .then(response => {
          return response
        })
    },

    logout ({commit}) {
      commit('set_auth_status', false);
      resetAuthToken();
      cookies.remove(ACCESS_TOKEN_NAME);
      return Promise.resolve();
    }
}