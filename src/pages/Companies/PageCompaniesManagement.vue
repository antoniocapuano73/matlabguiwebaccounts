<template>

    <TableManagement
      :theme="theme"
      :title="titles()"
      :category="categories()"
      textButtonItemAdd="New Company"

      :fields="fields()"
      :datasource="createDatasource">
    </TableManagement>

</template>

<script>

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

  name: "PageCompaniesManagement",
  components: {
    TableManagement,
  },
  data: function() {
    return {
      debug: false,
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
    fields: function() {
      /*
        Public Class Company
            Public Property Id As Integer
            Public Property Name As String
            Public Property Address As String
            Public Property City As String
            Public Property Country As String
            Public Property PostalCode As String
            Public Property Image As String
            Public Property PhoneNumber As String
            Public Property FaxNumber As String
            Public Property ReferencePerson As String
        End Class
      */
      return {
        table: ["Name","Country","City"],
        edit: new TableFields(
            new TableField("Name"),
            new TableField("Country"),
            new TableField("City"),
            new TableField("PostalCode"),
            new TableField("Address"),
            new TableField("PhoneNumber"),
            new TableField("FaxNumber"),
            new TableField("ReferencePerson"),
          ),
        };
    },
    titles: function() {
      return {
        table: "Companies",
        edit: "Edit Company",
        };
    },
    categories: function() {
      return {
        table: "Modify/Delete/Add Company",
        edit: "Complete/Modify Company",
        };
    },
    /*
      DATABASE SECTION
    */
    createDatasource: function() {
      return new Datasource(
        CompanyModel,IsCompanyModel,
        updateCompany,
        addCompany,
        deleteCompany,
        getCompanyList);
    },
  },
}

</script>

<style scoped>

</style>
