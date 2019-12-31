<template>
    <v-app id="inspire">
        <v-card
        :loading="loading"
        class="mx-auto my-12"
        min-width="75%"
        >
            <v-img
                height="250"
                src="https://source.unsplash.com/random?restaurant"
            ></v-img>
        
            <v-card-title>{{ this.current_restaurant.name }}</v-card-title>
        
            <v-card-text>
                <v-row
                align="center"
                class="mx-0"
                >
                <v-rating
                    :value="mean"
                    color="amber"
                    half-increments
                    readonly
                    size="14"
                ></v-rating>
        
                <div class="grey--text ml-4">{{this.mean}} ({{this.nb_comments}} notes)</div>
                </v-row>
        
                <div class="my-4 subtitle-1 black--text">
                Cuisine • {{ this.current_restaurant.cuisine }}
                </div>
        
                <h3 class="margin_top_bottom"><v-icon>mdi-map-marker</v-icon>{{ address }}</h3>
                <RestaurantsMap v-bind:latitude="latitude" v-bind:longitude="longitude" v-bind:name="name" v-bind:address="address"></RestaurantsMap>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
            <v-btn class="col-sm-12 margin_top_bottom" dark color="green" @click="see_menus">
                <v-icon dark>mdi-eye</v-icon> Voir la carte du restaurant
            </v-btn>

            <v-divider class="mx-4"></v-divider>
            <RestaurantsEvaluation v-bind:evaluations="evaluations"></RestaurantsEvaluation>
        
            
    
        </v-card>
    </v-app>
</template>

<script>
// @ is an alias to /src (in a vue-cli generated project)
import RestaurantsMap from '@/components/RestaurantsMap'
import RestaurantsEvaluation from '@/components/RestaurantsEvaluation'

export default {
    components: {
        RestaurantsMap,
        RestaurantsEvaluation
    },
    name: "RestaurantsListe",
    data () {
        return {
            evaluations: [],
            loading: false,
            city: "",
            state: "",
            url_server: "http://localhost:8080/api/restaurants/",
            mean: 0,
            nb_comments: 0,
            current_restaurant: {}
        }
    },
    methods: {
        see_menus(){
            window.location = "http://localhost:8081/menu/" + this.current_restaurant._id + "/" + this.current_restaurant.name;
        },
        restaurant_details(id){
            var xmlhttp = new XMLHttpRequest();
            var self = this;

            let url = this.url_server + id;

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var json = JSON.parse(this.responseText);
                    console.log(json);
                    self.current_restaurant = json["restaurant"];
                    if(self.current_restaurant.grades != undefined){
                        self.evaluations = self.current_restaurant.grades;
                    }
                    self.get_city(self.current_restaurant.address.zipcode);
                    self.compute_grades();
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        compute_grades(){
            var grades = this.current_restaurant.grades;
            if(grades != undefined){
                var current_grade = "";
                var sum = 0;
                for(var i=0; i<grades.length; i++){
                    current_grade = grades[i].grade;
                    if(current_grade === "A"){
                        sum += 5;
                    }
                    else if(current_grade === "B"){
                        sum += 4
                    }
                    else if(current_grade === "c"){
                        sum += 3
                    }
                    else if(current_grade === "D"){
                        sum += 2
                    }
                    else if(current_grade === "E"){
                        sum += 1
                    }
                    else if(current_grade === "F"){
                        sum += 0
                    }
                }
                this.nb_comments = grades.length;
                this.mean = sum/grades.length;
            }
        },
        get_city(zipcode){
            var self = this;
            fetch("https://community-zippopotamus.p.rapidapi.com/us/" + zipcode, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "community-zippopotamus.p.rapidapi.com",
                    "x-rapidapi-key": "28b692c4b4msh294bae85fa3c804p172991jsn85f922200e47"
                }
            })
            .then(response => {
                response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    self.city = res.data.places[0]["place name"];
                    self.state = res.data.places[0]["state abbreviation"];
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.restaurant_details(this.$route.params.id);
    },
    computed:{
        address: function(){
            return this.current_restaurant.address.building + " " + this.current_restaurant.address.street +
            this.current_restaurant.address.zipcode + " " + this.city + " " + this.state;
        },
        latitude(){
            return this.current_restaurant.address.coord[1];
        },
        longitude(){
            return this.current_restaurant.address.coord[0];
        },
        name(){
            return this.current_restaurant.name;
        }
    }
}
</script>

<style>
    #app{
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .margin_top_bottom{
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>