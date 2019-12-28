import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import RestaurantsListe from "./components/RestaurantsListe";
import RestaurantsDetails from "./components/RestaurantsDetails";

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {path: "/", name: 'home', component: RestaurantsListe},
    {path: "/details/:id", name: 'details', component: RestaurantsDetails}
  ],
  mode: "history"
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
