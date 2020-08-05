<template>

    <TableManagement 
      :title="titles()"
      :category="categories()"
      textButtonItemAdd="New Admin Role"
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
  } from "@/lib/components/Tables/TableUtility.js"

export default {
  name: "AdminRolesManagement",
  components: {
    TableManagement,
  },
  data: function() {
    return {

    };
  },
  mounted: function() {
      let that = this;

  },
  methods: {
    /*
      HTML SECTION
    */
    titles: function() {
      return {
        table: "Admin Roles",
        edit: "Edit Role",
        };
    },
    categories: function() {
      return {
        table: "Modify/Delete/Add Role",
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
