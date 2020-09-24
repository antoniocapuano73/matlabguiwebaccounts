import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Login                from "@/pages/Users/UserLogin.vue";
import AdminConsole         from "@/pages/Admin/AdminConsole.vue";
import AdminRolesManagement from "@/pages/Admin/AdminRolesManagement.vue";
import CompaniesManagement  from "@/pages/Companies/CompaniesManagement.vue";
import UsersManagement      from "@/pages/Users/UsersManagement.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/account/users",
    children: [
      {
        path: "account/login",
        name: "Login",
        component: Login
      },
      {
        path: "account/console",
        name: "Admin Console",
        component: AdminConsole
      },
      {
        path: "account/roles",
        name: "Admin Roles",
        component: AdminRolesManagement
      },
      {
        path: "account/companies",
        name: "Companies",
        component: CompaniesManagement
      },
      {
        path: "account/users",
        name: "User Profile",
        component: UsersManagement
      },

      // otherwise redirect to home
      { path: '*', redirect: '/account/login' }
    ]
  }
];

export default routes;