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

/*
function TokenModel(username, password) {
    this.grant_type = 'password';
    this.username   = iif(username, username, '');
    this.password   = iif(password, password, '');
}

function getToken(username,password,success,error) {

    axios
        .post(accountControllerURL +'/token', new TokenModel(username, password))
        .then(function (result) {
            if (typeof success === 'function') {
                try {
                    let data = result.data;
                    success(data);
                }
                catch (e){
                    console.log("user.service.js function getToken");
                    console.log(e);
                }
            }
        })
        .catch(function (e) {
            if (typeof error === 'function')
                try {
                    error(e);
                }
                catch (e) {
                }
        })

}
*/

function login(username,password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(new LoginModel(username, password))
    };

    return fetch(AccountControllerURL+'/login', requestOptions)
        .then(handleResponse)
        .then(user => {

            // login successful if there's a jwt token in the response
            if (user.Token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}