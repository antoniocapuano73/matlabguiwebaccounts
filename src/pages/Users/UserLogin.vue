<template>

    <Login
      title="Login"
      category="Authentication form"
      :onLoginSuccess="__onLoginSuccess__"
      :onLoginFailure="__onLoginFailure__">

    </Login>

</template>

<script>

import Login from "@/lib/users/login/Login.vue";

export default { 
  name: "UserLogin",
  components: {
    Login,
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
  methods: {
    /*
      COMPONENT EVENTS SECTION
    */
    __onLoginSuccess__: function (user) {
        let that = this;

        that.$router.push("/account/users");
    },

    __onLoginFailure__: function (error) {
        let that = this;

        /*
            da implementare
        */
  
    }

  },
}

</script>

<style scoped>

</style>
