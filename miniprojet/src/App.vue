<template>
  <v-app id="app">
    <restaurants-liste></restaurants-liste>
  </v-app>
</template>

<script>
import RestaurantsListe from './components/RestaurantsListe';

export default {
  name: 'App',

  components: {
    RestaurantsListe,
  },

  data: () => ({
    //
  }),
};
</script>
