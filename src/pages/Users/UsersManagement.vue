<template>
  <div class="content">
    <md-card id="users_selectedCompany">

      <md-card-header :data-background-color="theme">
        <h4 class="title"><b>Companies</b></h4>
        <p class="category"><b>Select User Company</b></p>
      </md-card-header>

      <md-card-content>
        <select id="users_comboCompanies" @change="onSelectedCompany()">
          <option v-for="company in companyList" 
                  :value="company.Id"
                  :key="company.Id">{{company.Name}}</option>
        </select>
      </md-card-content>

    </md-card>

    <UserLoginInfo id="UserLoginInfo" v-show="showUserEdit"
      :theme="theme"
      :item="m_item">
    </UserLoginInfo>

    <TableManagement ref="Users" v-show="!showUserRegister"
      :theme="theme"
      :title="titles()"
      :category="categories()"
      textButtonItemAdd="New User"

      :fields="fields()"
      :datasource="datasource"

      :onBeforeNewItem="onBeforeNewItem"
      :externalForms="externalForms()"
      
      :onShowEdit="onShowUserEdit"
      :onSelectedItem="onSelectedItem">
    </TableManagement>

    <UserRegister v-show="showUserRegister"
      :theme="theme"
      :companyId="idSelectedCompany"
      :actionOk="UserRegisterOk"
      :actionCancel="UserRegisterCancel">

    </UserRegister>

    <!-- Modal confirm -->
      <DialogMessage v-show="showDialogErrorUserRegister"
        title="Register User"
        :prompt="textDialogErrorUserRegister"
        :actionOk="hideDialogErrorUserRegister">

      </DialogMessage>

  </div>
</template>

<script>
import {
  setTagPropertyEnabled
} from "@/lib/utility/UtilityTag.js"

import {
  registerUser,
  UserModel,IsUserModel, 
  deleteUser,
  updateUser,

  /*
    FilterUser
  */
  addUser,
  addUserByIdCompany,

  getUserList,
  getUserListByIdCompany,
} from "@/api/Accounts/AccountController.js"

import {
  CompanyModel,IsCompanyModel,
  getCompanyList,
  } from "@/api/Accounts/AccountController.js"

import UserLoginInfo from "@/pages/Users/UserLoginInfo.vue";
import UserRegister from "@/pages/Users/UserRegister.vue";
import TableManagement from "@/lib/components/Tables/TableManagement.vue";
import {
  Datasource,
  TableField,
  TableFields,
  } from "@/lib/components/Tables/TableUtility.js"

import DialogMessage from "@/lib/components/Dialogs/DialogMessage.vue"

export default { 
  /*
    PUNTI DI PERSONALIZZAZIONE:
        methods:
            updateList
            isItem
            tableItemNew
            confirmItemDelete

  */

  name: "UsersManagement",
  components: {
    TableManagement,
    UserLoginInfo,
    UserRegister,
    DialogMessage,
  },
  props: {
    theme: {
      type: String,
      default: process.env.VUE_APP_THEME,
    },
  },
  data: function() {
    return {
      companyList: null,
      idSelectedCompany: -1,
      showUserEdit: false,
      showUserRegister: false,
      m_item: null,
      showDialogErrorUserRegister: false,
      textDialogErrorUserRegister: '',
    };
  },
  mounted: function() {
      let that = this;

      // success
      that.updateCompanyList();

  },
  computed: {
    datasource: function() {
      let that = this;

      // il componente è stato appena inizializzato
      if (that.idSelectedCompany === -1) {
        return null;
      }

      /*
        Filter: IdCompany
      */
      var compareUser = function(a, b) {
        try {
          var a1 = a.UserName.toLowerCase().trim();
          var b1 = b.UserName.toLowerCase().trim();

          if (a1 < b1)
            return -1;

          if (a1 > b1)
            return 1;

          } catch(e) {
        }

        return 0;
      }

      /*
      var __addUser__     = function(success,error) {};

      if (that.idSelectedCompany > 0) {
        let idCompany = that.idSelectedCompany;

        __addUser__ = function(success,error) {
          addUserByIdCompany(idCompany,success,error);
        }

      }

      */

      var __getUserList__ = function(success,error) {};

      if (that.idSelectedCompany > 0) {
        let idCompany = that.idSelectedCompany;

        __getUserList__ = function(success,error) {
          var sortUserList = function(list) {
            let sortedList = list;

            if (list) {
              if (list.length > 0) {
                sortedList = list.sort(compareUser);
              }
            }

            success(sortedList);
          }
          getUserListByIdCompany(idCompany,sortUserList,error);
        }

      }

      return (
        function() {
          return new Datasource(
            UserModel,IsUserModel,
            updateUser,
            null,                   // __addUser__
            deleteUser,
            __getUserList__);
        })
    },
  },
  methods: {
    /*
      EXTERNAL FORMS
    */
    externalForms: function() {
      return {
        newItem: true,
      }
    },
    onBeforeNewItem: function() {
      let that = this;

      that.showUserRegister = true;
    },
    hideDialogErrorUserRegister: function() {
      let that = this;

      that.showDialogErrorUserRegister = false;
    },
    UserRegisterOk: function(newUser) {
      let that = this;

      registerUser(newUser,function(userRegisterMessage) {
        /*
            Public Class UserRegisterResultModel
                Public Succeeded As Boolean
                Public Message As String
            End Class
        */

        let canUpdateList = false;

        if (userRegisterMessage) {
          if (userRegisterMessage.Succeeded) {
            canUpdateList = true;
          }
        }

        if (canUpdateList) {
          // aggiorna la lista degli utenti
          that.$refs.Users.updateList();

          // nascondi form aggiunta nuovo utente
          that.showUserRegister = false;
        } else {
          
          // get Error Message
          if (userRegisterMessage) {
            that.textDialogErrorUserRegister = userRegisterMessage.Message;
          }

          // show Error Message
          that.showDialogErrorUserRegister = true;
        }
      });

    },
    UserRegisterCancel: function() {
      let that = this;

      that.showUserRegister = false;
    },
    /*
      DATABASE SECTION
    */
    updateCompanyList: function() {
      let that = this;

      getCompanyList(function(list) {
        /*
        // aggiunge la PSEUDO COMPANY ALL
        let COMPANY_ALL = new CompanyModel(0,"All Companies");

        if (list) {
          list.unshift(COMPANY_ALL);
        } else {
          list = [COMPANY_ALL];
        }
        */

        // ordina lista
        var compareCompany = function(a, b) {
          try {
            var a1 = a.Name.toLowerCase().trim();
            var b1 = b.Name.toLowerCase().trim();

            if (a1 < b1)
              return -1;

            if (a1 > b1)
              return 1;

            } catch(e) {
          }

          return 0;
        }

        let sortedList = list;

        if (list) {
          if (list.length > 0) {
            sortedList = list.sort(compareCompany);
          }
        }

        // aggiorna lista
        that.companyList = sortedList

        // simulate event
        if (sortedList) {
          if (sortedList.length > 0) {
            that.onSelectedCompany(sortedList[0].Id);
          }
        }

      });
    },
    /*
      HTML SECTION
    */
    fields: function() {
      return {
        table: ["Email"],
        edit: new TableFields(
            new TableField("FirstName","First Name"),
            new TableField("LastName","Last Name"),
            new TableField("PhoneNumber","Phone Number"),
            new TableField("Note"),
          ),
        };
    },
    titles: function() {
      return {
        table: "Users",
        edit: "Edit User",
        };
    },
    categories: function() {
      return {
        table: "Modify/Delete/Add User",
        edit: "Complete/Modify User",
        };
    },
    /*
      EVENT SECTION
    */
    onShowUserEdit: function(status) {
      let that = this;

      that.showUserEdit = status;

      /*
        Nella modalita edit si disabilita
        la possibilita di cambiare la compania
      */
      setTagPropertyEnabled("users_selectedCompany",!status);
    },
    onSelectedCompany: function(idSelectedCompany) {
      let that = this;

      /*
        EVENT FROM TABLE
        Il parametro idSelectedCompany è undefined
      */
      if (idSelectedCompany === undefined) {

        let selectBox     = document.getElementById("users_comboCompanies");
        let selectedValue = selectBox.options[selectBox.selectedIndex].value;

        idSelectedCompany = selectedValue;
      }

      // idSelectedCompany
      that.idSelectedCompany = idSelectedCompany;

    },
    onSelectedItem: function(item) {
      let that = this;

      that.m_item = item;
    },
  },
}

</script>

<style scoped>
  .category {
    font-size: 125%;
  }

  select {
    font-size: 115%;
  }

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
	background-color:burlywood;
	padding: 20px;
}

.modal-header h3 {
	margin: 0;
	color: white;
}

.modal-body {
	margin: 10px 0px;
	padding: 20px 20px;
  font-size: 150%;
}

.modal-footer {
	padding: 20px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);

	display: flex;
	justify-content: flex-end;
}

.modal-default-text {
  flex: 1;
}

.modal-default-button {
  cursor: pointer;

  background: green;
  color: white;

  border: none;
  border-radius: 3px;

  padding: 8px 16px;
  transition: 0.3s;

  width: 100px;
  margin-right: 5px;
}

.md-button {
    width: 70px;
}
</style>
