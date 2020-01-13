<template>
  <v-app id="app">
    <v-toolbar>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          Restaurant Explorer
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
          <v-menu open-on-hover offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                v-on="on"
              >
                <v-icon left>mdi-face</v-icon>Administration
              </v-btn>
            </template>
    
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
              >
                <router-link :to="item.to" tag="span" style="cursor: pointer">
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </router-link>
              </v-list-item>
            </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    items: [
      {
        title: "Carte",
        to: "/admin_carte"
      },
      {
        title: "Menu",
        to: "/admin_menu"
      }
    ]
  }),
};
</script>
