<!--
    props:
        title
        category
        item
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

            <div :class="class_mdLayoutItem" v-show="tableRoleList != null">
                <md-table v-model="tableRoleList" :table-header-color="theme">
                    <md-table-row slot="md-table-row" slot-scope="{ item }">

                        <md-table-cell md-label="">
                            <md-input type="checkbox" v-model="item.Active"> </md-input>
                        </md-table-cell>

                        <md-table-cell md-label="User Role List">{{ item.Name }}</md-table-cell>

                    </md-table-row>
                </md-table>
            </div>

            <div :class="class_mdLayoutItem">
                <md-field>
                  <md-input type="checkbox" v-model="m_item.HasTemporaryPassword" disabled></md-input>
                  <label>User has a temporary password</label>
                </md-field>

                <md-field>
                    <label>User name</label>
                    <md-input v-model="m_item.UserName"></md-input>
                </md-field>

                <md-field>
                    <label>Email</label>
                    <md-input v-model="m_item.Email"></md-input>
                </md-field>
            </div>

        </div>

      </md-card-content>
    </md-card>
  </form>
</template>

<script>

import {
  getUserRoleList,
} from "@/api/Accounts/AccountController.js"

export default {
  name: "UserLoginInfo",
  data: function() {
    return {
      m_item: null,
      tableRoleList: null,
    };
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
      default: "Complete/Modify the login data"
    },
    item: {
      type: Object,
      default: null,
    },

  },
  mounted: function() {
      let that = this;

      // create an empty model (m_item)
      that.m_item = that.item;

      // api call
      that.updateRoleList();

  },
  computed: {
    class_mdLayoutItem: function() {
      let that = this;

      if (that.tableRoleList != null) {
        return "md-layout-item md-size-50 text-left";
      } else {
        return "md-layout-item md-size-100 text-left";
      }
    },
  },
  methods: {
      updateRoleList: function() {
            let that = this;

            if (that.m_item) {
                /*
                    ADMINROLEUSER SECTION

                    Public Class AdminRoleUserModel
                        Public Id As String
                        Public Name As String
                        Public Active As Boolean
                    End Class
                */

                getUserRoleList(that.m_item,function(list) {
                    that.tableRoleList = list;

                    // add runtime property
                    that.m_item.Roles = list;
                });   
            }       
      },
  },
  watch: { 
      item: function(nv) {
        let that = this;

        that.m_item = nv;

        //api call
        that.updateRoleList();
      },
  }



}

</script>