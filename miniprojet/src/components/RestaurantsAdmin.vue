<template>
    <v-app id="app">
        <v-dialog v-model="display_add_new_dish_dialog" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Ajouter un plat</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field name="name" v-model="name" label="Nom" required></v-text-field>
                        <v-select
                            v-model="type"
                            :items="types"
                            label="Type"
                        ></v-select>
                        <v-textarea v-model="description">
                            <template v-slot:label>
                                <div>
                                    Description
                                </div>
                            </template>
                        </v-textarea>
                        <v-text-field name="photo" v-model="photo_url" label="URL de la photo" required></v-text-field>
                        <v-text-field name="prix" v-model="price" label="Prix" type="number" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="display_add_new_dish_dialog = false">Annuler</v-btn>
                    <v-btn color="blue darken-1" text @click="add_new_dish">Confirmer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <div class="col-sm-12">
            <h1 class="center">Nouvelle Carte</h1>

            <v-row class="offset-sm-4">
                <v-btn style="margin:20px;" color="primary" class="col-sm-5" @click="display_add_new_dish_dialog = true">
                    <v-icon>mdi-plus</v-icon> Ajouter un plat
                </v-btn>
            </v-row>

            <v-container fluid id="carte">
                <div style="min-height: 100px;">
                    <h2 class="center">Entrée</h2>
                    <v-row>
                        <v-col
                            v-for="starter in starters"
                            :key="starter.id"
                            :cols="3"
                        >
                            <v-card height="400px">
                                <v-img
                                    :src="starter.photo_url"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title>{{ starter.name }} - {{ starter.price }} €</v-card-title>
                                </v-img>
                                <p style="height:100px;" class="description">{{ starter.description }}</p>
                    
                                <v-card-actions>
                                    <v-btn class="col-sm-12" color="error" dark @click="delete_dish(starter.id, starter.type)">
                                        <v-icon>mdi-trash</v-icon> Supprimer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

                <div style="min-height: 100px;">
                    <h2 class="center">Plat</h2>
                    <v-row>
                        <v-col
                            v-for="main_course in main_courses"
                            :key="main_course.id"
                            :cols="3"
                        >
                            <v-card height="400px">
                                <v-img
                                    :src="main_course.photo_url"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title>{{ main_course.name }} - {{ main_course.price }} €</v-card-title>
                                </v-img>
                                <p style="height:100px;" class="description">{{ main_course.description }}</p>
                    
                                <v-card-actions>
                                    <v-btn class="col-sm-12" color="error" dark @click="delete_dish(main_course.id, main_course.type)">
                                        <v-icon>mdi-trash</v-icon> Supprimer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

                <div style="min-height: 100px;">
                    <h2 class="center">Dessert</h2>
                    <v-row>
                        <v-col
                            v-for="dessert in desserts"
                            :key="dessert.id"
                            :cols="3"
                        >
                            <v-card height="400px">
                                <v-img
                                    :src="dessert.photo_url"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title>{{ dessert.name }} - {{ dessert.price }} €</v-card-title>
                                </v-img>
                                <p style="height:100px;" class="description">{{ dessert.description }}</p>
                    
                                <v-card-actions>
                                    <v-btn class="col-sm-12" color="error" dark @click="delete_dish(dessert.id, dessert.type)">
                                        <v-icon>mdi-trash</v-icon> Supprimer
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </div>

            </v-container>
        </div>
    </v-app>
</template>

<script>

export default {
    name: "RestaurantsAdmin",
    data () {
        return {
            current_id: 0,
            name: "",
            type: "",
            description: "",
            types: ["Entrée", "Plat", "Dessert"],
            photo_url: "",
            price: 0,
            display_add_new_dish_dialog: false,
            menu_name: "",
            starters: [],
            main_courses: [],
            desserts: []
        }
    },
    props: [

    ],
    methods: {
        add_new_dish(){
            var current_list;
            var current_dish = {
                id: this.id,
                name: this.name,
                type: this.type,
                description: this.description,
                photo_url: this.photo_url,
                price: this.price
            };

            if(this.type === "Entrée"){
                current_list = this.starters;
            }
            else if(this.type === "Plat"){
                current_list = this.main_courses;
            }
            else if(this.type === "Dessert"){
                current_list = this.desserts;
            }
            
            current_list.push(current_dish);
            this.reset_form_fields();

            this.update_cookie();
        },
        reset_form_fields(){
            this.name = "";
            this.type = "";
            this.description = "";
            this.photo_url = "";
            this.price = 0;
        },
        delete_dish(id, type){
            var current_list;
            if(type === "Entrée"){
                current_list = this.starters;
            }
            else if(type === "Plat"){
                current_list = this.main_courses;
            }
            else if(type === "Dessert"){
                current_list = this.desserts;
            }

            var index_to_delete = 0;
            while(current_list[index_to_delete].id !== id && index_to_delete < current_list.length){
                index_to_delete++;
            }
            current_list.splice(index_to_delete, 1);

            this.update_cookie();
        },
        setCookie(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
            }
            return "";
        },
        update_cookie(){
            this.setCookie("starters", JSON.stringify(this.starters), 1);
            this.setCookie("main_courses", JSON.stringify(this.main_courses), 1);
            this.setCookie("desserts", JSON.stringify(this.desserts), 1);
        }
    },
    created(){
        if(this.getCookie("starters") !== ""){
            this.starters = JSON.parse(this.getCookie("starters"));
        }
        if(this.getCookie("main_courses") !== ""){
            this.main_courses = JSON.parse(this.getCookie("main_courses"));
        }
        if(this.getCookie("desserts") !== ""){
            this.desserts = JSON.parse(this.getCookie("desserts"));
        }
    },
    computed:{
        id(){
            return this.current_id + 1;
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
    .center{
        text-align: center;
    }
</style>