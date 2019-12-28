<template>
    <v-app id="app">
        <h1>Restaurants Map</h1>
    </v-app>
</template>

<script>
export default {
    name: "RestaurantsListe",
    data () {
        return {
        }
    },
    props: {
        latitude: Number,
        longitude: Number,
        restaurant_name: String,
        restaurant_address: String
    },
    methods: {
    },
    created(){
    },
    computed:{
    }
}
</script>

<style>
    #app{
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>