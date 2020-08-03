<template>
  <!--
  <div class="content">
    <md-card v-show="!showAdminRoleEdit">
      <md-card-header data-background-color="green">
        <h4 class="title"><b>Admin Roles</b></h4>
        <p class="category"><b>Modify/Delete/Add Role</b></p>
      </md-card-header>
      <md-card-content>
        <md-table v-model="adminRoleList" table-header-color="green">
          <md-table-row slot="md-table-row" slot-scope="{ item }" @click="selectAdminRoleModel(item)">
            <md-table-cell md-label="ID"  >{{ item.Id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.Name }}</md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableEditRole(item);">
                <md-icon>create</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableDeleteRole(item);">
                <md-icon>clear</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="button md-raised md-success" @click="tableAddAdminRole()"><md-icon>add_box</md-icon>New Role</md-button>
        </div>
      </md-card-content>
    </md-card>

    <TableEdit 
      title="Edit Role"
      category="Complete/Modify the role"
      :datasource="createDatasource"
      :item="selectedAdminRoleModel"
      :onConfirm="confirmEditAdminRole"
      :onCancel="ignoreEditAdminRole"
      v-show="showAdminRoleEdit"> 
    </TableEdit>
  
    <DialogConfirm 
      :show="showConfirmDeleteModal"
      title="Admin Roles"
      :prompt="textConfirmDeleteModal"
      :actionOk="dialogConfirmDeleteRole"
      :actionCancel="dialogIgnoreDeleteRole">

    </DialogConfirm>

  </div>
  -->

    <TableManagement 
      title="Admin Roles"
      category="Modify/Delete/Add Role"
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
