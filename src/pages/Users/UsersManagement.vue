<template>
  <div class="content">
    <md-card id="users_selectedCompany">

      <md-card-header data-background-color="green">
        <h4 class="title"><b>Companies</b></h4>
        <p class="category"><b>Select User Company</b></p>
      </md-card-header>

      <md-card-content>
        <select id="users_comboCompanies" @change="onSelectedCompany()">
          <option :value="company.Id" 
                  v-for="company in companyList" 
                  :key="company.Id">{{company.Name}}</option>
        </select>
      </md-card-content>

    </md-card>

    <TableManagement id="Users"
      :title="titles()"
      :category="categories()"
      textButtonItemAdd="New User"

      :fields="fields()"
      :datasource="datasource"
      
      :onShowEdit="onShowUserEdit">
    </TableManagement>

  </div>
</template>

<script>
import {
  setTagPropertyEnabled
} from "@/lib/utility/UtilityTag.js"

import {
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
  addCompany,
  deleteCompany,
  updateCompany,
  getCompanyList,
  } from "@/api/Accounts/AccountController.js"

import TableManagement from "@/lib/components/Tables/TableManagement.vue";
import {
  Datasource,
  TableField,
  TableFields,
  } from "@/lib/components/Tables/TableUtility.js"

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
  },
  data: function() {
    return {
      companyList: null,
      idSelectedCompany: -1,
      showUserEdit: false,
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

      var __addUser__ = function(success,error) {
        addUser(success,error);
      };

      var __getUserList__ = function(success,error) {
        var sortUserList = function(list) {
          let sortedList = list;

          if (list) {
            if (list.length > 0) {
              sortedList = list.sort(compareUser);
            }
          }
        }
        getUserList(sortUserList,error);
      };

      if (that.idSelectedCompany > 0) {
        let idCompany = that.idSelectedCompany;

        __addUser__ = function(success,error) {
          addUserByIdCompany(idCompany,success,error);
        }

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
            __addUser__,
            deleteUser,
            __getUserList__);
        })
    },
  },
  methods: {
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
        table: ["UserName","Email"],
        edit: new TableFields(
            new TableField("UserName","User Name"),
            new TableField("Email"),
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

    }
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
</style>
