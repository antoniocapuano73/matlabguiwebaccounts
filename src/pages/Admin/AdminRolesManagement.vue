<template>
  <div class="content">
      <AdminRolesTable table-header-color="green" v-show="showAdminRolesTable"></AdminRolesTable>
      <AdminRolesEdit data-background-color="green" v-show="showAdminRolesEdit"> </AdminRolesEdit>
  </div>
</template>

<script>
import AdminRolesTable from "@/pages/Admin/AdminRolesTable.vue"; 
import AdminRolesEdit from "@/pages/Admin/AdminRolesEdit.vue"; 

export default {
  name: "AdminRolesManagement",
  components: {
    AdminRolesTable,
    AdminRolesEdit,
  },
  data: function() {
    return {
      showAdminRolesEdit: false,
      showAdminRolesTable: true
    }
  },
};
</script>
