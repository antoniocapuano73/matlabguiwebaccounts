<!--
    props:
        tableHeaderColor
        tableTitle
        tableCategory
        askConfirmToDelete

        onChange(filterParamsModel,index)
-->
<template>
  <div class="content">
    <md-card>
      <md-card-header data-background-color="green">
        <h4 class="title">{{tableTitle}}</h4>
        <p class="category">{{tableCategory}}</p>
      </md-card-header>
      <md-card-content>
        <md-table v-model="adminRoleList" :table-header-color="tableHeaderColor">
          <md-table-row slot="md-table-row" slot-scope="{ item }" @click="selectAdminRoleModel(item)">
            <md-table-cell md-label="ID"  >{{ item.Id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.Name }}</md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="frmEditRole(item);">
                <md-icon>create</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="frmDeleteRole(item);">
                <md-icon>clear</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="button md-raised md-success" @click="frmAddNewRole()"><md-icon>add_box</md-icon>New Role</md-button>
        </div>
      </md-card-content>
    </md-card>
  
    <!-- Modal confirm -->
    <div class="modal-mask" role="document" v-show="showConfirmDeleteModal">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-body">
                  {{textConfirmDeleteModal}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="frmConfirmDeleteRole(selectedAdminRoleModel);">Ok</button>
                    <button type="button" class="btn btn-default" @click="showConfirmDeleteModal=false;">Cancel</button>
                </div>
            </div>
        </div>
    </div>

  </div>
</template>

<script>

import {
  getAdminRoleList,
  addAdminNewRole,
  deleteAdminRole,
  IsAdminRoleModel,
  } from "@/api/Accounts/AccountController.js"

export default {
  name: "AdminRolesTable",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    tableTitle: {
      type: String,
      default: "Admin Roles"
    },
    tableCategory: {
      type: String,
      default: "Modify/Delete/Add Role"
    },
    askConfirmToDelete: {
      type: Boolean,
      default: true
    },
  },
  data: function() {
    return {
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
      frmAddNewRole: function() {
        let that = this;

        addAdminNewRole(function(adminRoleModel) {
          if (adminRoleModel) {
            that.selectAdminRoleModel(adminRoleModel);
            that.frmUpdateRoleList();
          }
          else {
            // ERR
          }
        })
      },
      frmEditRole: function(adminRoleModel) {
        let that = this;

      },
      frmDeleteRole: function(adminRoleModel) {
        let that = this;

        if (that.askConfirmToDelete) {
          if (IsAdminRoleModel(adminRoleModel)) {
            // the modal id="confirmDeleteModal"
            // manage the delete action
            that.textConfirmDeleteModal = 
              "Confirm to delete the role " + adminRoleModel.Name + " ?"
            that.showConfirmDeleteModal = true;
          }
        }
        else 
          that.frmConfirmDeleteRole(adminRoleModel);
      },
      frmConfirmDeleteRole: function (adminRoleModel) {
        let that = this;

        if (IsAdminRoleModel(adminRoleModel)) {
          deleteAdminRole(adminRoleModel,function(isDeletedRole) {
            if (isDeletedRole) {
              that.selectAdminRoleModel(null);
              that.frmUpdateRoleList();
            }
            else {
              // ERR
            }
          })
        }

        that.showConfirmDeleteModal = false;

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


/* modal */
.modal-mask {
	position: fixed;
	z-index: 9998;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: table;
	transition: opacity 0.3s ease;
}

.modal-wrapper {
	display: table-cell;
	vertical-align: middle;
}

.modal-container {
	width: 25rem;
	margin: 0px auto;

	background-color: #fff;

	border-radius: 4px;
	overflow: hidden;
	transition: all 0.3s ease;
	font-family: Helvetica, Arial, sans-serif;
}

.modal-header {
	background-color: #512da8;
	padding: 20px;
}

.modal-header h3 {
	margin: 0;
	color: white;
}

.modal-body {
	margin: 10px 0px;
	padding: 20px 20px;
}

.modal-footer {
	padding: 20px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);

	display: flex;
	align-items: center;
}

.modal-default-text {
  flex: 1;
}

.modal-default-button {
  cursor: pointer;

  background: #512da8;
  color: white;

  border: none;
  border-radius: 3px;

  padding: 8px 16px;
  transition: 0.3s;

}

          
</style>
