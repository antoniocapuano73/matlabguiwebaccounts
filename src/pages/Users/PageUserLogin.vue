<!--
    /*
        APPLICATION LOGIN SECTION
    */

    IMPORTANTE:
        - Questo PageComponent
-->
<template>
  <div class="content">

    <Login v-show="isUserLoggedOut"
      :onLoginSuccess="__onLoginSuccess__"
      :onLoginFailure="__onLoginFailure__">
    </Login>

    <UserLoginInfo v-show="isUserLoggedIn"
      title="Profile User"
      category="User Info"
      :item="userInfo"
      :fields="fields()"
      :enabled="false">
    </UserLoginInfo>

    <Logout v-show="isUserLoggedIn"
      :onLogoutSuccess="__onLogoutSuccess__"
      :onLogoutFailure="__onLogoutFailure__">
    </Logout>

  </div>
</template>

<script>

import Login from  "@/lib/users/login/Login.vue"
import Logout from "@/lib/users/login/Logout.vue"
import UserLoginInfo from "@/pages/Users/PageUserLoginInfo.vue";

import {
  TableField,
  TableFields,
  } from "@/lib/components/Tables/TableUtility.js"

import { mapGetters } from 'vuex'

export default { 
  name: "PageUserLogin",
  components: {
    Login,
    Logout,
    UserLoginInfo,
  },
  data: function() {
    return {
      debug: false,
    };
  },
  props: {

  },
  mounted: function() {
    let that = this;

  },
  computed: {
    ...mapGetters('account', ['isUserLoggedIn','isUserLoggedOut','userInfo']),

  },
  methods: {
    /*
      HTML SECTION
    */
    fields: function() {
      let selectedFields = 
        new TableFields(
            new TableField("FirstName","First Name"),
            new TableField("LastName","Last Name"),
            new TableField("PhoneNumber","Phone Number"),
            new TableField("Note")
        );

      return selectedFields;
    },
    /*
      COMPONENT EVENTS SECTION
    */
    __onLoginSuccess__: function (user) {
        let that = this;

        that.$router.push("/account/users");
    },

    __onLoginFailure__: function (error) {
        let that = this;
  
    },

    __onLogoutSuccess__: function (user) {
        let that = this;

    },

    __onLogoutFailure__: function (error) {
        let that = this;
  
    }

  },
}

</script>

<style scoped>

</style>
