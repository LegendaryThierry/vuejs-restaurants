<template>
    <div>
        <gmap-map :center="center" :zoom="16" style="width:100%;  height: 500px;">
        <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
        ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>

export default {
    name: "RestaurantsMap",
    data () {
        return {
            center: {},
            markers: [],
            places: [],
            currentPlace: null
        }
    },
    props: [
        "latitude",
        "longitude",
        "name",
        "address"
    ],
    methods: {
        setPlace(place) {
            this.currentPlace = place;
        },
        addMarker() {
            if (this.currentPlace) {
                const marker = {
                lat: this.currentPlace.geometry.location.lat(),
                lng: this.currentPlace.geometry.location.lng()
                };
                this.markers.push({ position: marker });
                this.places.push(this.currentPlace);
                this.center = marker;
                this.currentPlace = null;
            }
        },
        geolocate: function() {
            navigator.geolocation.getCurrentPosition(position => {
                this.center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
                };
            });
        },
        set_restaurant_position(){
            var coord = {
                lat: this.latitude,
                lng: this.longitude
            }
            this.center = coord;

            var current_marker = {
                name: this.name,
                position: coord
            }

            this.markers.push(current_marker);
        }
    },
    created(){
        this.set_restaurant_position();
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