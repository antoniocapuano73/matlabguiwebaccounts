<!--
    props:
        title
        category
        CompanyId
        actionOk(m_item = New User)
        actionCancel
-->
<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="theme">
        <h4 class="title"><b>{{title}}</b></h4>
        <p class="category"><b>{{category}}</b></p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">

            <div class="md-layout-item md-size-100 text-left">
                <md-field>
                    <label>Email</label>
                    <md-input v-model="m_item.Email"></md-input>
                </md-field>

                <md-field>
                    <label>Password</label>
                    <md-input type="password" v-model="m_item.Password"></md-input>
                </md-field>

                <md-field>
                    <label>Confirm Password</label>
                    <md-input type="password" v-model="m_item.ConfirmPassword"></md-input>
                </md-field>

            </div>

            <div class="md-layout-item md-size-100 text-right">
                <md-button :class="themeButtonColor()" @click="__ActionOk__()">Ok</md-button>
                <md-button :class="themeButtonColor()" @click="__ActionCancel__()">Cancel</md-button>
            </div>

        </div>

      </md-card-content>


    </md-card>
  </form>
</template>

<script>

import {
  UserRegisterModel,
} from "@/api/Accounts/AccountController.js"

export default {
  name: "UserRegister",
  data: function() {
    return {
      m_item: new UserRegisterModel(),
    };
  },
  props: {
    theme: {
      type: String,
      default: process.env.VUE_APP_THEME,
    },
    title: {
      type: String,
      default: "Register a new user"
    },
    category: {
      type: String,
      default: "Insert the login data"
    },
    companyId: {
      type: Number,
      default: -1    
    },
    actionOk: {
        type: Function,
        default: null
    },
    actionCancel: {
        type: Function,
        default: null
    },
  },
  mounted: function() {
      let that = this;

  },
  computed: {

  },
  methods: {
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

    /*
        SECTION BUTTON
    */
    __ActionOk__: function () {
        //console.log("__ActionOk__");
        let that = this;

        try {
            //console.log(that.actionOk);
            //console.log(that.m_item);

            if (typeof that.actionOk === 'function')
                if (that.actionOk !== null)
                    that.actionOk(that.m_item);
        } 
        catch (e) {
            console.log('UserRegister.doActionOk');
            console.log(e);
        }
    },
    __ActionCancel__: function () {
        //console.log("__ActionCancel__");
        let that = this;

        try {
            //console.log(that.actionCancel);

            if (typeof that.actionCancel === 'function')
                if (that.actionCancel !== null) {
                    that.actionCancel();
                };
        } 
        catch (e) {
            console.log('UserRegister.doActionCancel');
            console.log(e);
        }
    },
  },
  watch: { 
        /*
            Public Class UserRegisterModel
                Public UserName As String
                Public Email As String

                ' **********************************
                ' IMPORTANTE
                '   Le proprietà:
                '       Password
                '       ConfirmPassowrd
                '
                ' sono definite solamente nella classe UserModel per gestire 
                ' (1) la registrazione di un nuovo utente
                ' (2) la password temporanea
                '
                ' Assolutamenta la classe ApplicationUser non deve contenere
                ' questa due proprità
                ' **********************************
                Public Property Password As String
                Public Property ConfirmPassword As String

                ' additional data
                Public CompanyId As Integer
            End Class
        */

      companyId: function(nv) {
        let that = this;

        that.m_item.CompanyId = nv;
      },
  }
}

</script>