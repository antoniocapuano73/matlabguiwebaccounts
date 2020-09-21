import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import AdminConsole from "@/pages/Admin/AdminConsole.vue";
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
        path: "accounts/console",
        name: "Admin Console",
        component: AdminConsole
      },
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
