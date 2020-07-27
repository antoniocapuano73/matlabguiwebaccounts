<template>
  <div class="content">
    <md-card v-show="!showItemEdit">
      <md-card-header data-background-color="green">
        <h4 class="title"><b>{{title}}</b></h4>
        <p class="category"><b>{{category}}</b></p>
      </md-card-header>
      <md-card-content>
        <md-table v-model="tableList" table-header-color="green">
          <md-table-row slot="md-table-row" slot-scope="{ item }" @click="selectItem(item)">
            <md-table-cell md-label="ID"  >{{ item.Id }}</md-table-cell>
            <md-table-cell md-label="Name">{{ item.Name }}</md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableItemEdit(item);">
                <md-icon>create</md-icon>
              </md-button>
            </md-table-cell>

            <md-table-cell md-label="">
              <md-button class="md-success" @click="tableItemDelete(item);">
                <md-icon>clear</md-icon>
              </md-button>
            </md-table-cell>
          </md-table-row>
        </md-table>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="button md-raised md-success" @click="tableItemNew()"><md-icon>add_box</md-icon>{{textButtonItemAdd}}</md-button>
        </div>
      </md-card-content>
    </md-card>

    <CompanyEdit 
      :item="selectedItem"
      :onSaved="editOk"
      :onCancel="editCancel"
      v-show="showItemEdit"> 
    </CompanyEdit>

    <!-- Modal confirm -->
    <DialogConfirm 
      :show="showDialogConfirmItemDelete"
      :title="title"
      :prompt="textDialogConfirmItemDelete"
      :actionOk="dialogOk"
      :actionCancel="dialogCancel">

    </DialogConfirm>

  </div>
</template>

<script>

import {
  getCompanyList,
  addCompany,
  deleteCompany,
  IsCompanyModel,
  } from "@/api/Accounts/AccountController.js"

import CompanyEdit from "@/pages/Companies/CompanyEdit.vue"; 
import DialogConfirm from "@/components/Dialogs/DialogConfirm.vue"

export default { 
  /*
    PUNTI DI PERSONALIZZAZIONE:
        methods:
            updateList
            isItem
            tableItemNew
            confirmItemDelete

  */

  name: "CompaniesManagement",
  components: {
    DialogConfirm,
    CompanyEdit,
  },
  data: function() {
    return {
      // const
      title    : "Companies",
      category : "Modify/Delete/Add Company",
      textButtonItemAdd : "New Company",

      // vars
      tableList: [],  
      selectedItem: null,
      askConfirmToDelete: true,
      showItemEdit: false,

      // dialog
      showDialogConfirmItemDelete: false,
      textDialogConfirmItemDelete: "",
    };
  },
  mounted: function() {
      let that = this;

      // successFunction
      that.updateList();

  },
  methods: {
      /*
        Public Class AdminRoleModel
            Public Id As String
            Public Name As String
        End Class
      */
    updateList: function() {
      let that = this;

      getCompanyList(function(list) {
        that.tableList = list;
      });
    },
    isItem: function (item) {
        return IsCompanyModel(item);
    },
    selectItem: function(item) {
      let that = this;

      if (item) {
        that.selectedItem = item;
        // console.log("selectAdminRoleModel");
      }
      else {
        that.selectedItem = null;
      }
    },
    tableItemNew: function() {
      let that = this;

      addCompany(function(item) {
        if (item) {
          that.selectItem(item);

          // Edit on
          that.showItemEdit = true;
        }
        else {
          // ERR
        }
      })
    },
    tableItemEdit: function(item) {
      let that = this;

      // Edit on
      that.showItemEdit = true;
    },
    tableItemDelete: function(item) {
      let that = this;

      if (that.askConfirmToDelete) {
        if (that.isItem(item)) {
          // the modal id="confirmDeleteModal"
          // manage the delete action
          that.textDialogConfirmItemDelete = 
            "Confirm to delete the item '" + item.Name + "' ?"
          that.showDialogConfirmItemDelete = true;
        }
      }
      else 
        that.confirmItemDelete(item);
    },
    dialogOk: function () {
      let that = this;

      that.confirmItemDelete(that.selectedItem);
    },
    dialogCancel: function () {
      let that = this;

      that.showDialogConfirmItemDelete = false;
    },
    confirmItemDelete: function (item) {
      let that = this;

      if (that.isItem(item)) {
        deleteCompany(item,function(isItemDeleted) {
          if (isItemDeleted) {
            that.selectItem(null);

            // api -> lasciare come ultima funzione
            that.updateList();
          }
          else {
            // ERR
          }
        })
      }

      that.showDialogConfirmItemDelete = false;

    },
    editOk: function() {
      let that = this;

      // Edit off
      that.showItemEdit = false;

      // api -> lasciare come ultima funzione
      that.updateList();
    },
    editCancel: function() {
      let that = this;

      // Edit off
      that.showItemEdit = false;

      // api -> lasciare come ultima funzione
      that.updateList();
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
