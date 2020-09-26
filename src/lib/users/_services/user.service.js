import { 
    __API_PARAMS_LOGIN__,
    __API_PARAMS_LOGOUT__,
    __API_PARAMS_TOKEN__,
} from '../_helpers';

import { 
    __API_RESPONSE__,
} from '../../api/api.js';

const AccountControllerURL = process.env.VUE_APP_ACCOUNT_CONTROLLER_URL;

export const userService = {
    login,
    logout,
};

function login(username,password) {

    return fetch(AccountControllerURL+'/login', __API_PARAMS_LOGIN__(username, password))
        .then(__API_RESPONSE__)
        .then(user => {

            return fetch(AccountControllerURL+'/token', __API_PARAMS_TOKEN__(username, password))
                .then(__API_RESPONSE__)
                .then(tokenInfo => {
        
                    // login successful if there's a jwt token in the response
                    if (tokenInfo.access_token) {

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        user.Token = tokenInfo.access_token;
                        localStorage.setItem('user', JSON.stringify(user));
        
                    } else {
                        // remove user from local storage to log user out
                        localStorage.removeItem('user');
                    }

                    return user;
                });
        });
}

function logout() {

    return fetch(AccountControllerURL+'/logout', __API_PARAMS_LOGOUT__())
        .then(__API_RESPONSE__)
        .then(data => {

            // remove user from local storage to log user out
            localStorage.removeItem('user');

            return data;
        });
}

/*
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api

                // remove user from local storage to log user out
                localStorage.removeItem('user');

                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
*/