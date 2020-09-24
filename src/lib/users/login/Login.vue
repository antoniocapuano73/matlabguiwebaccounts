<!--
    props:
        title
        category
        onLoginSuccess
        onLoginFailure

    Source code:
        https://github.com/cornflourblue/vue-vuex-registration-login-example
-->
<template>
    <div class="content">
        
        <md-card>
            <md-card-header :data-background-color="theme">
                <h4 class="title"><b>{{title}}</b></h4>
                <p class="category"><b>{{category}}</b></p>
            </md-card-header>

            <md-card-content>
                <form @submit.prevent="handleSubmit">

                    <div class="md-layout">
                        <div class="md-layout-item md-size-100 text-left">
                            <md-field>
                                <label for="username">Email</label>
                                <md-input type="text" v-model="username" name="username" :class="{ 'is-invalid': submitted && !username }" />
                                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                            </md-field>

                            <md-field>
                                <label htmlFor="password">Password</label>
                                <md-input type="password" v-model="password" name="password" :class="{ 'is-invalid': submitted && !password }" />
                                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-size-100 text-right">
                            <div class="form-group">
                                <md-button :class="themeButtonColor()" @click="handleSubmit()" :disabled="status.loggingIn">Login</md-button>

                                <!--
                                <button :disabled="status.loggingIn">Login</button>
                                <img v-show="status.loggingIn" />
                                <router-link to="/register" class="btn btn-link">Register</router-link>
                                -->
                            </div>
                        </div>
                    
                    </div>
                </form>
            </md-card-content>
        </md-card>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },
    props: {
        theme: {
            type: String,
            default: process.env.VUE_APP_THEME,
        },
        title: {
            type: String,
            default: "Login"
        },
        category: {
            type: String,
            default: "Authentication form"
        },
        onLoginSuccess: {
            type: Function,
            default: null,
        },
        onLoginFailure: {
            type: Function,
            default: null,
        },

    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        /*
            LOGIN SECTION
        */
        handleSubmit (e) {
            let that = this;

            that.submitted = true;
            const { username, password } = that;

            let success = function (user) {
                that.raise_onLoginSuccess(user);
            };

             let failure = function (error) {
                that.raise_onLoginFailure(error);
            };

            if (username && password) {
                this.login({username, password, success, failure})
            }
        },
        /*
            COMPONENT EVENTS SECTION
        */
        raise_onLoginSuccess: function(user) {
            let that = this;

            try {
                if (that.onLoginSuccess) {
                    if (typeof that.onLoginSuccess === 'function')
                        that.onLoginSuccess(user);
                }
            }
            catch(e) {

            }
        },
        raise_onLoginFailure: function(error) {
            let that = this;

            try {
                if (that.onLoginFailure) {
                    if (typeof that.onLoginFailure === 'function')
                        that.onLoginFailure(error);
                }
            }
            catch(e) {

            }
        },
        /*
            THEME SECTION
        */
        themeButtonColor: function() {
        /*
                [data-background-color="purple"],
                .md-tabs.md-primary .md-tabs-navigation{
                    background: linear-gradient(60deg, $purple-400, $purple-600);
                    @include shadow-big-color($brand-primary);
                }

                [data-background-color="blue"],
                .md-tabs.md-info .md-tabs-navigation{
                    background: linear-gradient(60deg, $blue-400, $blue-600);
                    @include shadow-big-color($brand-info);
                }

                [data-background-color="green"],
                .md-tabs.md-success .md-tabs-navigation{
                    background: linear-gradient(60deg, $green-400, $green-600);
                    @include shadow-big-color($brand-success);
                }

                [data-background-color="orange"],
                .md-tabs.md-warning .md-tabs-navigation{
                    background: linear-gradient(60deg, $orange-400, $orange-600);
                    @include shadow-big-color($brand-warning);
                }

                [data-background-color="red"],
                .md-tabs.md-danger .md-tabs-navigation{
                    background: linear-gradient(60deg, $red-400, $red-600);
                    @include shadow-big-color($brand-danger);
                }

                ...

                &.md-default{
                    @include btn-styles($gray-light);
                }

                &.md-primary{
                @include btn-styles($brand-primary);
                }
                &.md-info{
                @include btn-styles($brand-info);
                }
                &.md-success{
                @include btn-styles($brand-success);
                }
                &.md-warning{
                @include btn-styles($brand-warning);
                }
                &.md-danger{
                @include btn-styles($brand-danger);
                }          
        */

        let that = this;

        let ret = "md-default";

        switch(that.theme) {
            case "purple":
            ret = "md-primary";
            break;
            case "blue":
            ret = "md-info";
            break;
            case "green":
            ret = "md-success";
            break;
            case "orange":
            ret = "md-warning";
            break;
            case "red":
            ret = "md-danger";
            break;
        }

        return ret;

        },
    }
};
</script>