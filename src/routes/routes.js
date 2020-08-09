import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import AdminRolesManagement from "@/pages/Admin/AdminRolesManagement.vue";
import CompaniesManagement from "@/pages/Companies/CompaniesManagement.vue";
import UsersManagement    from "@/pages/Users/UsersManagement.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/accounts/users",
    children: [
      {
        path: "accounts/roles",
        name: "Admin Roles",
        component: AdminRolesManagement
      },
      {
        path: "accounts/companies",
        name: "Companies",
        component: CompaniesManagement
      },
      {
        path: "accounts/users",
        name: "User Profile",
        component: UsersManagement
      },
    ]
  }
];

export default routes;
