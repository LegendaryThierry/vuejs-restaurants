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
          <v-btn text>
            <router-link to="/admin" tag="span" style="cursor: pointer">
              <v-icon left>mdi-face</v-icon>Administration
            </router-link>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    <router-view></router-view>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
