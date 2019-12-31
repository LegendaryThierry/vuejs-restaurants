<template>
    <v-app id="app">
        <v-alert dismissible transition="scale-transition" v-model="deleted_restaurant_success" type="success">Le restaurant a été supprimé avec succès !</v-alert>
        <v-alert dismissible transition="scale-transition" v-model="deleted_restaurant_error" type="error">La suppression a échoué !</v-alert>
        <v-alert dismissible transition="scale-transition" v-model="edit_restaurant_success" type="success">L'édition du restaurant a été réalisé avec succès !</v-alert>
        <v-alert dismissible transition="scale-transition" v-model="edit_restaurant_error" type="error">L'édition du restaurant a échoué !</v-alert>
        <v-alert dismissible transition="scale-transition" v-model="add_new_restaurant_success" type="success">Le nouveau restaurant a été ajouté avec succès ! 
            <v-btn>
                <router-link :to="new_restaurant_details_route" tag="span" style="cursor: pointer">
                    <v-icon left>mdi-face</v-icon>Voir détail
                </router-link>
            </v-btn>
        </v-alert>
        <v-alert dismissible transition="scale-transition" v-model="add_new_restaurant_error" type="error">L'ajout du nouveau restaurant a échoué !</v-alert>

        <v-dialog v-model="add_new_restaurant_dialog" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Ajouter un restaurant</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col :cols="6">
                                <v-text-field name="name" v-model="add_new_restaurant_values.name" label="Nom*" required></v-text-field>
                            </v-col>
                            <v-col :cols="6">
                                <v-text-field name="cuisine" v-model="add_new_restaurant_values.cuisine" label="Cuisine*" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="3">
                                <v-text-field class="col-sm-3" v-model="add_new_restaurant_values.address.building" name="building" label="Building Number*" required></v-text-field>
                            </v-col>
                            <v-col :cols="6">    
                                <v-text-field class="col-sm-6" v-model="add_new_restaurant_values.address.street" name="street" label="Street*" required></v-text-field>
                            </v-col>
                            <v-col :cols="3">     
                                <v-text-field class="col-sm-3" v-model="add_new_restaurant_values.address.zipcode" name="zipcode" label="Zipcode*" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*Champs Obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="add_new_restaurant_dialog = false">Annuler</v-btn>
                    <v-btn color="blue darken-1" text @click="add_new_restaurant_confirmed">Confirmer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="edit_restaurant_dialog" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Edition du restaurant</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="6">
                                <v-text-field v-model="edited_restaurant.name" name="name" label="Nom*" required></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field v-model="edited_restaurant.cuisine" name="cuisine" label="Cuisine*" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*Champs Obligatoires</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="edit_restaurant_dialog = false">Annuler</v-btn>
                    <v-btn color="blue darken-1" text @click="edit_restaurant_request">Confirmer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <h1>{{ restaurants_count }} restaurants disponibles</h1>
        <v-card>
            <v-card-title>
                    <v-col cols="2">
                        <v-btn color="primary" dark class="mb-2" @click="add_new_restaurant">Ajouter un restaurant</v-btn>
                    </v-col>
                    <v-col cols="6">
                        <v-subheader class="pl-0">Nombre de restaurants par page:</v-subheader>
                        <v-slider
                            v-model="items_per_page"
                            thumb-label="always"
                            @change="change_page_size"
                        ></v-slider>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            v-model="search_restaurant_name"
                            :append-outer-icon="'mdi-magnify'"
                            clear-icon="mdi-close-circle"
                            clearable
                            label="Rechercher par nom"
                            type="text"
                            @click:append-outer="search"
                            v-on:keyup.enter="search"
                        ></v-text-field>
                    </v-col>
            </v-card-title>
            <v-btn color="primary" dark class="col-md-2 offset-md-4 page_button" @click="previous"><v-icon>mdi-arrow-left-bold</v-icon> Précédent</v-btn>
            <v-btn color="primary" dark class="col-md-2 page_button" @click="next">Suivant <v-icon>mdi-arrow-right-bold</v-icon></v-btn>

            <v-data-table :headers="headers" :items="restaurants" :items-per-page="items_per_page" :loading="data_table_loading" hide-default-footer>
                <template v-slot:item.detail="{ item }">
                    <v-btn color="primary" dark class="mb-2" @click="voir_details(item)">Voir détails</v-btn>
                </template>

                <template v-slot:item.action="{ item }">
                    <v-icon id="edit_restaurant" @click="edit_restaurant(item)" class="mr-2">mdi-pencil</v-icon>
                    <v-icon id="delete_restaurant" @click="delete_restaurant(item)">mdi-trash-can</v-icon>
                </template>
            </v-data-table>
        </v-card>
    </v-app>
</template>

<script>
export default {
    name: "RestaurantsListe",
    data () {
        return {
            new_restaurant_details_route : { name: 'details', params: { id: "" }},
            items_per_page: 10,
            search_restaurant_name: "",
            add_new_restaurant_success: false,
            add_new_restaurant_error: false,
            edit_restaurant_success: false,
            edit_restaurant_error: false,
            data_table_loading: false,
            deleted_restaurant_success: false,
            deleted_restaurant_error: false,
            nb_page: 1,
            url: "http://localhost:8080/api/restaurants/",
            edit_restaurant_dialog: false,
            add_new_restaurant_dialog: false,
            restaurants_count: 0,
            headers: [
                { text: 'Nom', value: 'name', align: "center" },
                { text: 'Cuisine', value: 'cuisine', align: "center" },
                { text: 'Détail', value: 'detail', align: "center" },
                { text: 'Actions', value: 'action', align: "center" }
            ],
            restaurants: [],
            add_new_restaurant_values: {
                name: "",
                cuisine: "",
                address: {
                    building: "",
                    street: "",
                    zipcode: "",
                    latitude: 0,
                    longitude: 0
                }
            },
            edited_restaurant: {
                name: "",
                cuisine: ""
            }
        }
    },
    methods: {
        previous(){
            this.nb_page--;
            this.get_restaurants();
        },
        next(){
            this.nb_page++;
            this.get_restaurants();
        },
        change_page_size(){
            this.get_restaurants();
        },
        get_restaurants(){
            this.data_table_loading = true;
            var xmlhttp = new XMLHttpRequest();
            var self = this;

            let url = this.url + "?page=" + this.nb_page + "&pagesize=" + this.items_per_page + "&name=" + this.search_restaurant_name;

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var json = JSON.parse(this.responseText);
                    var current_restaurant = {};
                    self.restaurants_count = json["count"];
                    self.restaurants = [];
                    for(var i=0; i<json["data"].length; i++){
                        current_restaurant = {};
                        current_restaurant["name"] = json["data"][i]["name"];
                        current_restaurant["cuisine"] = json["data"][i]["cuisine"];
                        current_restaurant["_id"] = json["data"][i]["_id"];
                        self.restaurants.push(current_restaurant);
                    }
                    self.data_table_loading = false;
                }
            };
            xmlhttp.open("GET", url, true);
            xmlhttp.send();
        },
        edit_restaurant(item){
            this.edited_restaurant = Object.assign({}, item); //Fusionne des objets partageant des propriétés communes
            this.edit_restaurant_dialog = true; 
        },
        edit_restaurant_request(){
            this.edit_restaurant_dialog = false;
            var self = this;
            let url = this.url + this.edited_restaurant["_id"];
            var formData = new FormData();
            formData.append('_id', this.edited_restaurant["_id"]);
            formData.append('nom', this.edited_restaurant["name"]);
            formData.append('cuisine', this.edited_restaurant["cuisine"]);
            formData.append("address", this.edited_restaurant["address"]);

            fetch(url, {
                method: "PUT",
                body: formData
            })
            .then(function(responseJSON) {
                responseJSON.json()
                    .then(function(res) {
                        // Maintenant res est un vrai objet JavaScript
                        if(res["succes"] === true){
                            self.edit_restaurant_success = true;
                            self.get_restaurants();
                        }
                        else{
                            self.edit_restaurant_error = true;
                        }
                    });
                })
                .catch(function (err) {
                    console.log(err);
                    self.edit_restaurant_error = true;
            });
        },
        add_new_restaurant(){
            this.add_new_restaurant_dialog = true;
        },
        add_new_restaurant_confirmed(){
            this.get_city_info(this.add_new_restaurant_values.address.zipcode);
        },
        get_city_info(zipcode){
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
                    self.add_new_restaurant_values.address.longitude = res.data.places[0]["longitude"];
                    self.add_new_restaurant_values.address.latitude = res.data.places[0]["latitude"];
                    self.add_new_restaurant_request();
                });
            })
            .catch(err => {
                console.log(err);
            });
        },
        add_new_restaurant_request(){
            var self = this;
            this.add_new_restaurant_dialog = false;

            var formData = new FormData();
            formData.append('nom', this.add_new_restaurant_values["name"]);
            formData.append('cuisine', this.add_new_restaurant_values["cuisine"]);
            formData.append('address', JSON.stringify(this.add_new_restaurant_values["address"]));

            fetch(this.url, {
                method: "POST",
                body: formData
            })
            .then(function(responseJSON) {
                responseJSON.json()
                    .then(function(res) {
                        console.log(res);
                        // Maintenant res est un vrai objet JavaScript
                        if(res["succes"] === true){
                            self.new_restaurant_details_route.params.id = res.result;
                            self.add_new_restaurant_success = true;
                            self.get_restaurants();
                        }
                        else{
                            self.add_new_restaurant_error = true;
                        }
                    });
                })
                .catch(function (err) {
                    console.log(err);
                    self.add_new_restaurant_error = true;
            });
        },
        voir_details(item){
            this.$router.push("details/" + item["_id"]);
        },
        delete_restaurant(item){
            var self = this;
            let url = this.url + item["_id"];

            fetch(url, {
                method: "DELETE",
            })
            .then(function(responseJSON) {
                responseJSON.json()
                    .then(function(res) {
                        // Maintenant res est un vrai objet JavaScript
                        if(res["succes"] === true){
                            self.deleted_restaurant_success = true;
                        }
                        else{
                            self.deleted_restaurant_ = true;
                        }
                        self.get_restaurants();
                    });
                })
                .catch(function (err) {
                    console.log(err);
            });
        },
        search(){
            this.get_restaurants();
            this.search_restaurant_name = "";
        }
    },
    created(){
        this.get_restaurants();
    }
}
</script>

<style>
    #app{
        font-family: Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    #edit_restaurant:hover{
        color: green;
    }
    #delete_restaurant:hover{
        color: red;
    }
    .page_button{
        margin: 5px;
    }
</style>