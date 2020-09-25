<template>

    <TableManagement 
      :theme="theme"
      :display="display()"
      :title="titles()"
      :category="categories()"
      textButtonItemAdd="New Admin Role"
      :fields="fields()"
      :datasource="createDatasource">
    </TableManagement>

</template>

<script>

import {
  AdminRoleModel,IsAdminRoleModel,
  addAdminRole,
  deleteAdminRole,
  updateAdminRole,
  getAdminRoleList,

  } from "@/api/Accounts/AccountController.js"

import TableManagement from "@/lib/components/Tables/TableManagement.vue";
import {
  Datasource,
  TableField,
  TableFields,
  } from "@/lib/components/Tables/TableUtility.js"

export default {
  name: "PageAdminRolesManagement",
  components: {
    TableManagement,
  },
  data: function() {
    return {

    };
  },
  props: {
    theme: {
      type: String,
      default: process.env.VUE_APP_THEME,
    },
  },
  mounted: function() {
      let that = this;

  },
  methods: {
    /*
      HTML SECTION
    */
    display: function() {
      return {
        buttonEdit:   false,
        buttonDelete: false,
        buttonNew:    false
      };
    },
    fields: function() {
      return {
        table: ["Id","Name"],
        edit: new TableFields(
                new TableField("Id"),
                new TableField("Name"),
          ),
        };
    },
    titles: function() {
      return {
        table: "Admin Roles",
        edit: "Edit Role",
        };
    },
    categories: function() {
      return {
        table: "",
        edit: "Complete/Modify Role",
        };
    },
    /*
      DATABASE SECTION
    */
    createDatasource: function() {
      return new Datasource(AdminRoleModel,IsAdminRoleModel,updateAdminRole,addAdminRole,deleteAdminRole,getAdminRoleList);
    },
  }
};
</script>

<style scoped>

</style>
