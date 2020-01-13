import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import RestaurantsListe from "./components/RestaurantsListe";
import RestaurantsDetails from "./components/RestaurantsDetails";
import RestaurantsMenu from "./components/RestaurantsMenu";
import RestaurantsAdminCarte from "./components/RestaurantsAdmin";
import RestaurantsAdminMenu from "./components/RestaurantsAdminMenu";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCIf_62CeiUFcWYIPT78me_CLwuRSJDSKg",
    libraries: "places" // necessary for places input
  },
  installComponents: true
});


const router = new VueRouter({
  routes: [
    {path: "/", name: 'home', component: RestaurantsListe},
    {path: "/details/:id", name: 'details', component: RestaurantsDetails},
    {path: "/menu/:id/:name", name:"menu", component: RestaurantsMenu},
    {path: "/admin_carte", name:"admin", component: RestaurantsAdminCarte},
    {path: "/admin_menu", name:"admin_menu", component: RestaurantsAdminMenu}
  ],
  mode: "history"
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
