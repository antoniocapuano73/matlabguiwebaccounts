<template>

    <TableManagement 
      title="Companies"
      category="Modify/Delete/Add Company"
      titleEdit="Edit Company"
      categoryEdit="Complete/Modify Company"
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

  name: "CompaniesManagement",
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
      return new Datasource(CompanyModel,IsCompanyModel,updateCompany,addCompany,deleteCompany,getCompanyList);
    },
  },
}

</script>

<style scoped>

</style>
