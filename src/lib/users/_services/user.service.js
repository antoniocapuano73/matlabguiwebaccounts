import { authHeader } from '../_helpers';
import axios from "axios"

const AccountControllerURL = process.env.VUE_APP_ACCOUNT_CONTROLLER_URL;

export const userService = {
    login,
    logout,
};

/*
    Public Class LoginModel
        Public Email As String
        Public Password As String
    End Class
*/
function iif(condition,__true__,__false__) {
    if (condition)
        return __true__;
    else
        return __false__;
}

function LoginModel(username, password) {
    this.Email    = iif(username, username, '');
    this.Username = iif(username, username, '');
    this.Password = iif(password, password, '');
}

function login(username,password) {

    var loginOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new LoginModel(username, password))
    };

    return fetch(AccountControllerURL+'/login', loginOptions)
        .then(__RESPONSE__)
        .then(user => {

            var tokenOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: "userName="  + encodeURIComponent(username) +
                      "&password=" + encodeURIComponent(password) +
                      "&grant_type=password"
            };
        
            return fetch(AccountControllerURL+'/token', tokenOptions)
                .then(__RESPONSE__)
                .then(tokenInfo => {
        
                    // login successful if there's a jwt token in the response
                    if (tokenInfo.access_token) {

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        user.Token = tokenInfo.access_token;
                        localStorage.setItem('user', JSON.stringify(user));
        
                    }

                    return user;
                });
        });
}

function logout() {
    // implementare chiamata all'api
    const logoutOptions = {
        method:  'POST',
        headers: authHeader(),
        body:    null
    };

    return fetch(AccountControllerURL+'/logout', logoutOptions)
        .then(__RESPONSE__)
        .then(data => {

            // remove user from local storage to log user out
            localStorage.removeItem('user');

            return data;
        });
}

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

function __RESPONSE__(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api

            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}