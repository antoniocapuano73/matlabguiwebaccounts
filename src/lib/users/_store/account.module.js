import { userService } from '../_services';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };

const actions = {
    login({ dispatch, commit }, {username,password,success,failure}) {
        commit('loginRequest', { username });
    
        userService.login(username,password)
            .then(
                user => {
                    let isLoginSuccess = false;

                    if (user) {
                        if (user.Token) {
                            isLoginSuccess = true;
                        }
                    }

                    if (isLoginSuccess) {
                                        /*
                                            SUCCESS
                                        */
                                        commit('loginSuccess', user);

                                        if (typeof success === 'function') {
                                            try {
                                                success(user);
                                            }
                                            catch (e){
                                                console.log("user.service.js function login - success");
                                                console.log(e);
                                            }
                                        }
                    } else {
                                        /*
                                            ERROR
                                        */
                                        let error = '';

                                        if (user) {
                                            if (user.Message) {
                                                error = user.Message;
                                            }
                                        }

                                        commit('loginFailure', error);

                                        if (typeof failure === 'function') {
                                            try {
                                                failure(error);
                                            }
                                            catch (e){
                                                console.log("user.service.js function login - failure");
                                                console.log(e);
                                            }
                                        }
                    }

                },
                error => {
                    commit('loginFailure', error);

                    if (typeof failure === 'function') {
                        try {
                            failure(error);
                        }
                        catch (e){
                            console.log("user.service.js function login - failure");
                            console.log(e);
                        }
                    }
                }
            );
    },
    logout({ commit }) {
        userService.logout();
        commit('logout');
    },
};

const mutations = {
    loginRequest(state, user) {
        state.status = { loggingIn: true };
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = { loggedIn: true };
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        state.status = {};
        state.user = null;
    },
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations
};