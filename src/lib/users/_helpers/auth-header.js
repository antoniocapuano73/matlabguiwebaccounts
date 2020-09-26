import { 
    __API_HEADER__ 
} from '../../api/api.js';

export function __API_HEADER_AUTHORIZED__() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.Token) {
        return { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + user.Token
        };
    } else {
        return { 
            'Content-Type': 'application/json', 
        };
    }
}

export function __API_HEADER_TOKEN__() {
    return { 'Content-Type': 'application/json' };
}

export function __API_PARAMS_AUTHORIZED__(objParams) {
    let loginOptions = {
        method: 'POST',
        headers: __API_HEADER_AUTHORIZED__(),
        body: JSON.stringify(objParams)
    };

    return loginOptions;
}

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

export function __API_PARAMS_LOGIN__(username, password) {
    let loginOptions = {
        method: 'POST',
        headers: __API_HEADER__(),
        body: JSON.stringify(new LoginModel(username, password))
    };

    return loginOptions;
}

export function __API_PARAMS_LOGOUT__() {
    let logoutOptions = {
        method:  'POST',
        headers: __API_HEADER_AUTHORIZED__(),
        body:    null
    };

    return logoutOptions;
}

export function __API_PARAMS_TOKEN__(username, password) {
    let tokenOptions = {
        method: 'POST',
        headers: __API_HEADER_TOKEN__(),
        body: "userName="  + encodeURIComponent(username) +
              "&password=" + encodeURIComponent(password) +
              "&grant_type=password"
    };

    return tokenOptions;
}