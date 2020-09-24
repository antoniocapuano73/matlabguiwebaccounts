import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import store from './store/index.js'

// router setup
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// Dialog
import vmodal from 'vue-js-modal'

// configure router
export const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});

/*
  LOGIN SECTION
*/

router.beforeEach(function(to, from, next) {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages  = ['/account/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn     = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/account/login');
  }

  next();
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(vmodal);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  store,
  data: {
    Chartist: Chartist
  }
});
