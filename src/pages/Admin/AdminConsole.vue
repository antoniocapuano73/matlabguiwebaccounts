<!--
    props:
        theme
        title
        category
-->
<template>
  <div class="content">
    <md-card>
      <md-card-header :data-background-color="theme">
        <h4 class="title"><b>{{title}}</b></h4>
        <p class="category"><b>{{category}}</b></p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout-item md-size-100 text-left">
          <md-button :class="themeButtonColor()" @click="buttonCommandDatabaseDefaultUsers()">{{textCommandDatabaseDefaultUsers}}</md-button>
        </div>

        <div class="md-layout" v-show="showCommandDatabaseDefaultUsers">

            <div class="md-layout-item md-size-50 text-left">
                <md-field>
                    <label>Developer Email</label>
                    <md-input v-model="m_item.DeveloperEmail"></md-input>
                </md-field>

                <md-field>
                    <label>Developer Password</label>
                    <md-input v-model="m_item.DeveloperPassword"></md-input>
                </md-field>

            </div>

            <div class="md-layout-item md-size-50 text-left">
                <md-field>
                    <label>Customer Email</label>
                    <md-input v-model="m_item.CustomerEmail"></md-input>
                </md-field>

                <md-field>
                    <label>Customer Password</label>
                    <md-input v-model="m_item.CustomerPassword"></md-input>
                </md-field>

            </div>

            <div class="md-layout-item md-size-100 text-right">
                <md-button :class="themeButtonColor()" @click="doCommandDatabaseDefaultUsers()">Do Command</md-button>
            </div>
        </div>

      </md-card-content>
    </md-card>

    <!-- Modal confirm -->
      <DialogMessage v-show="showDialogError"
        :title="title"
        :prompt="textDialogError"
        :actionOk="hideDialogError">

      </DialogMessage>

  </div>
</template>

<script>

import {
  ConsoleParametersCommandDatabaseDefaultUsersModel,
  commandDatabaseDefaultUsers,
} from "@/api/Accounts/AccountController.js"

import DialogMessage from "@/lib/components/Dialogs/DialogMessage.vue"

export default {
  name: "AdminConsole",
  components: {
    DialogMessage,
  },
  data: function() {
    return {
        m_item : null,
        showCommandDatabaseDefaultUsers: false,
        textCommandDatabaseDefaultUsers: 'CREATE DEFAULT DATABASE USERS',
        showDialogError: false,
        textDialogError: "Error: Default Database Users Not Created!"
    };
  },
  props: {
    theme: {
      type: String,
      default: process.env.VUE_APP_THEME,
    },
    title: {
      type: String,
      default: "Admin Console"
    },
    category: {
      type: String,
      default: ""
    },

  },
  mounted: function() {
        let that = this;

        that.m_item = 
            new ConsoleParametersCommandDatabaseDefaultUsersModel(
                'developer@hotmail.com',
                'Developer$12345',
                'customer@hotmail.com',
                'Customer$12345');
  },
  methods: {
    /*
      THEME SECTION
    */
    themeButtonColor: function() {
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
        BUTTON SECTION
    */
    buttonReset: function() {
        let that = this;

        that.category = '';
        that.showCommandDatabaseDefaultUsers = false;
    },
    buttonCommandDatabaseDefaultUsers: function() {
        let that = this;

        that.buttonReset();

        that.category = that.textCommandDatabaseDefaultUsers;
        that.showCommandDatabaseDefaultUsers = true;
    },
    doCommandDatabaseDefaultUsers: function() {
        let that = this;

        commandDatabaseDefaultUsers(that.m_item, function(isSucceeded) {
            if (isSucceeded) {
                that.buttonReset();
            } else {
                that.showDialogError = true;
            }
        });

    },
    hideDialogError: function() {
        let that = this;

        that.showDialogError = false;        
    },
  },

}

</script>