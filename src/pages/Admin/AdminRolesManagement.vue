<template>

    <TableManagement 
      title="Admin Roles"
      category="Modify/Delete/Add Role"
      textButtonItemAdd="New Admin Role"
      titleEdit="Edit Role"
      categoryEdit="Complete/Modify Role"
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
    createDatasource: function() {
      return new Datasource(AdminRoleModel,IsAdminRoleModel,updateAdminRole,addAdminRole,deleteAdminRole,getAdminRoleList);
    },
  }
};
</script>

<style scoped>

</style>
