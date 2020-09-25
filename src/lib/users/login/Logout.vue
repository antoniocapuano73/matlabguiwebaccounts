<!--
    props:
        title
        category
        onLogoutSuccess
        onLogoutFailure

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
                <div class="md-layout">
                    <div class="md-layout-item md-size-100 text-right">
                        <md-button :class="themeButtonColor()" @click="DoLogout()">Logout</md-button>
                    </div> 
                
                </div>
            </md-card-content>

        </md-card>
        
    </div>
</template>

<script>
import {  mapState, mapActions } from 'vuex'

export default {
    name: "Logout",
    data () {
        return {
            debug: false,
        }
    },
    props: {
        theme: {
            type: String,
            default: process.env.VUE_APP_THEME,
        },
        title: {
            type: String,
            default: "Logout"
        },
        category: {
            type: String,
            default: "Press button to confirm logout"
        },
        onLogoutSuccess: {
            type: Function,
            default: null,
        },
        onLogoutFailure: {
            type: Function,
            default: null,
        },

    },
    computed: {
        ...mapState('account', ['status'])
    },
    created () {
        // reset login status
        // this.logout();
    },
    methods: {
        ...mapActions('account', ['login', 'logout']),
        /*
            LOGOUT SECTION
        */
        DoLogout: function() {
            let that = this;

            let success = function () {
                that.raise_onLogoutSuccess();
            };

             let failure = function (error) {
                that.raise_onLogoutFailure(error);
            };

            that.logout({success, failure});
        },
        /*
            COMPONENT EVENTS SECTION
        */
        raise_onLogoutSuccess: function() {
            let that = this;

            try {
                if (that.onLogoutSuccess) {
                    if (typeof that.onLogoutSuccess === 'function')
                        that.onLogoutSuccess();
                }
            }
            catch(e) {

            }
        },
        raise_onLogoutFailure: function(error) {
            let that = this;

            try {
                if (that.onLogoutFailure) {
                    if (typeof that.onLogoutFailure === 'function')
                        that.onLogoutFailure(error);
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