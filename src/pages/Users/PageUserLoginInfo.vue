<!--
    props:
        title
        category
        item
        enabled
        fields
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
                            <md-input type="checkbox" v-model="item.Active" :disabled="!enabled"> </md-input>
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
                    <label>Email</label>
                    <md-input v-model="m_item.Email" :disabled="!enabled"></md-input>
                </md-field>
            </div>

          <div class="md-layout-item md-small-size-100 md-size-50" v-for="(item,index) in __FIELDS__" :key="index">
            <md-field>
              <label>{{fieldText(item)}}</label>
              <md-input :type="fieldType(item)" v-model="m_item[fieldKey(item)]" :disabled="!enabled"></md-input>
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

import {
  IsFunction,
  } from "@/lib/utility/Utility.js"

import {
  TableField,
  TableFields,
  getFieldKey,
  getFieldText,
  getFieldType,
  getSelectedFields,
  } from "@/lib/components/Tables/TableUtility.js"

export default {
  name: "PageUserLoginInfo",
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
    enabled: {
      type: Boolean,
      default: true
    },
    fields: {
      type: Object,
      default: function() {return new TableFields()},
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
    /*
      CSS SECTION
    */
    class_mdLayoutItem: function() {
      let that = this;

      if (that.tableRoleList != null) {
        return "md-layout-item md-size-50 text-left";
      } else {
        return "md-layout-item md-size-100 text-left";
      }
    },
    /*
      HTML TABLE SECTION
    */
    __FIELDS__: function() {
      let that = this;
      let selectedFields = getSelectedFields(that.m_item,that.fields);

      return selectedFields;
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
    /*
      HTML TABLE SECTION
    */
    fieldKey: function(field) {
      return getFieldKey(field);
    },
    fieldText: function(field) {
      return getFieldText(field);
    },
    fieldType: function(field) {
      return getFieldType(field);
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