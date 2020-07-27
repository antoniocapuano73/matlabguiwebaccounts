<template>
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

    <AdminRoleEdit 
      :adminRoleModel="selectedAdminRoleModel"
      :onSaved="confirmEditAdminRole"
      :onCancel="ignoreEditAdminRole"
      v-show="showAdminRoleEdit"> 
    </AdminRoleEdit>
  
    <!-- Modal confirm -->
    <DialogConfirm 
      :show="showConfirmDeleteModal"
      title="Admin Roles"
      :prompt="textConfirmDeleteModal"
      :actionOk="dialogConfirmDeleteRole"
      :actionCancel="dialogIgnoreDeleteRole">

    </DialogConfirm>

  </div>
</template>

<script>

import {
  getAdminRoleList,
  addAdminRole,
  deleteAdminRole,
  IsAdminRoleModel,
  } from "@/api/Accounts/AccountController.js"

import AdminRoleEdit from "@/pages/Admin/AdminRoleEdit.vue"; 
import DialogConfirm from "@/components/Dialogs/DialogConfirm.vue"

export default {
  name: "AdminRolesManagement",
  components: {
    DialogConfirm,
    AdminRoleEdit,
  },
  data: function() {
    return {
      askConfirmToDelete: true,
      showAdminRoleEdit: false,
      selectedAdminRoleModel: null,
      adminRoleList: [],
      showConfirmDeleteModal: false,
      textConfirmDeleteModal: "",
    };
  },
  mounted: function() {
      let that = this;

      // successFunction
      that.frmUpdateRoleList();

  },
  methods: {
      /*
        Public Class AdminRoleModel
            Public Id As String
            Public Name As String
        End Class
      */
    frmUpdateRoleList: function() {
      let that = this;

      getAdminRoleList(function(list) {
        that.adminRoleList = list;
      });
    },
    selectAdminRoleModel: function(adminRoleModel) {
      let that = this;

      if (adminRoleModel) {
        that.selectedAdminRoleModel = adminRoleModel;
        // console.log("selectAdminRoleModel");
      }
      else {
        that.selectedAdminRoleModel = null;
      }
    },
    tableAddAdminRole: function() {
      let that = this;

      addAdminRole(function(adminRoleModel) {
        if (adminRoleModel) {
          that.selectAdminRoleModel(adminRoleModel);

          // Edit on
          that.showAdminRoleEdit = true;
        }
        else {
          // ERR
        }
      })
    },
    tableEditRole: function(adminRoleModel) {
      let that = this;

      // Edit on
      that.showAdminRoleEdit = true;
    },
    tableDeleteRole: function(adminRoleModel) {
      let that = this;

      if (that.askConfirmToDelete) {
        if (IsAdminRoleModel(adminRoleModel)) {
          // the modal id="confirmDeleteModal"
          // manage the delete action
          that.textConfirmDeleteModal = 
            "Confirm to delete the role '" + adminRoleModel.Name + "' ?"
          that.showConfirmDeleteModal = true;
        }
      }
      else 
        that.confirmDeleteRole(adminRoleModel);
    },
    dialogConfirmDeleteRole: function () {
      let that = this;

      that.confirmDeleteRole(that.selectedAdminRoleModel);
    },
    dialogIgnoreDeleteRole: function () {
      let that = this;

      that.showConfirmDeleteModal = false;
    },
    confirmDeleteRole: function (adminRoleModel) {
      let that = this;

      if (IsAdminRoleModel(adminRoleModel)) {
        deleteAdminRole(adminRoleModel,function(isDeletedRole) {
          if (isDeletedRole) {
            that.selectAdminRoleModel(null);

            // api -> lasciare come ultima funzione
            that.frmUpdateRoleList();
          }
          else {
            // ERR
          }
        })
      }

      that.showConfirmDeleteModal = false;

    },
    confirmEditAdminRole: function() {
      let that = this;

      // Edit off
      that.showAdminRoleEdit = false;

      // api -> lasciare come ultima funzione
      that.frmUpdateRoleList();
    },
    ignoreEditAdminRole: function() {
      let that = this;

      // Edit off
      that.showAdminRoleEdit = false;

      // api -> lasciare come ultima funzione
      that.frmUpdateRoleList();
    },
  }
};
</script>

<style scoped>
  .button {
    width: 150px;
  }
  .icon {
    width: 25px;
  }

  .category {
    font-size: 125%;
  }
</style>
