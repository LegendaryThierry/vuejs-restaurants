<template>
    <v-app id="app">
        <v-dialog v-model="display_add_new_menu_dialog" persistent width="600">
            <v-card>
                <v-card-title>
                    <span class="headline">Ajouter un menu</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field name="name" v-model="menu_name" label="Nom" required></v-text-field>
                        <v-text-field name="prix" v-model="menu_price" label="Prix" type="number" required></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="display_add_new_menu_dialog = false">Annuler</v-btn>
                    <v-btn color="blue darken-1" text @click="add_new_menu">Confirmer</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="display_add_new_dish_dialog" persistent width="600">
            <v-card>
                <v-card-title>
                    <span class="headline">Ajouter un plat</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-select
                            v-model="selected_menu"
                            :items="menus_list"
                            item-text= "name"
                            item-value= "id"
                            label="Menu"
                        ></v-select>
                        <v-text-field name="name" v-model="name" label="Nom" required></v-text-field>
                        <v-select
                            v-model="type"
                            :items="types"
                            label="Type"
                        ></v-select>
                        <v-textarea v-model="description" label="Description">
                            <template v-slot:label>
                                <div>
                                    Description
                                </div>
                            </template>
                        </v-textarea>
                        <v-text-field name="photo" v-model="photo_url" label="URL de la photo" required></v-text-field>
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
            <h1 class="center">Nouveau Menu</h1>
            <v-row>
                <v-btn dark style="margin:20px;" color="green" class="col-sm-3" @click="display_add_new_menu_dialog = true">
                    <v-icon>mdi-plus</v-icon> Ajouter un menu
                </v-btn>

                <v-btn style="margin:20px;" color="primary" class="col-sm-3" @click="display_add_new_dish_dialog = true" :disabled="is_add_new_menu_disabled">
                    <v-icon>mdi-plus</v-icon> Ajouter un plat
                </v-btn>
            </v-row>

            <v-container fluid id="carte">
                <v-row>
                    <v-col v-for="(menu, index) in menus_list" :key="index" :cols="4" class="border">
                        <h1 class="center">{{ menu.name }} - {{ menu.price }} €</h1>

                        <v-btn style="margin-top:10px; margin-bottom:10px;" class="offset-sm-3 col-sm-6" color="error" dark @click="delete_menu(menu.id)">
                            <v-icon>mdi-trash</v-icon> Supprimer
                        </v-btn>

                        <div style="min-height: 100px;">
                            <h2 class="center">Entrée</h2>
                            <v-row>
                                <v-col
                                    v-for="starter in menu.starters"
                                    :key="starter.id"
                                    :cols="6"
                                >
                                    <v-card height="400px">
                                        <v-img
                                            :src="starter.photo_url"
                                            class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                            height="200px"
                                        >
                                            <v-card-title>{{ starter.name }}</v-card-title>
                                        </v-img>
                                        <p style="height:100px;" class="description">{{ starter.description }}</p>
                            
                                        <v-card-actions>
                                            <v-btn class="col-sm-12" color="error" dark @click="delete_dish(menu.id, starter.id, starter.type)">
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
                                    v-for="main_course in menu.main_courses"
                                    :key="main_course.id"
                                    :cols="6"
                                >
                                    <v-card height="400px">
                                        <v-img
                                            :src="main_course.photo_url"
                                            class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                            height="200px"
                                        >
                                            <v-card-title>{{ main_course.name }}</v-card-title>
                                        </v-img>
                                        <p style="height:100px;" class="description">{{ main_course.description }}</p>
                            
                                        <v-card-actions>
                                            <v-btn class="col-sm-12" color="error" dark @click="delete_dish(menu.id, main_course.id, main_course.type)">
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
                                    v-for="dessert in menu.desserts"
                                    :key="dessert.id"
                                    :cols="6"
                                >
                                    <v-card height="400px">
                                        <v-img
                                            :src="dessert.photo_url"
                                            class="white--text align-end"
                                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                            height="200px"
                                        >
                                            <v-card-title>{{ dessert.name }}</v-card-title>
                                        </v-img>
                                        <p style="height:100px;" class="description">{{ dessert.description }}</p>
                            
                                        <v-card-actions>
                                            <v-btn class="col-sm-12" color="error" dark @click="delete_dish(menu.id, dessert.id, dessert.type)">
                                                <v-icon>mdi-trash</v-icon> Supprimer
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </v-app>
</template>

<script>

export default {
    name: "RestaurantsAdmin",
    data () {
        return {
            selected_menu: "",
            menus_list: [],
            menu_name: "",
            menu_price: 0,
            display_add_new_menu_dialog: 0,
            current_menu_id: 0,
            current_dish_id: 0,
            name: "",
            type: "",
            description: "",
            types: ["Entrée", "Plat", "Dessert"],
            photo_url: "",
            display_add_new_dish_dialog: false,
        }
    },
    props: [

    ],
    methods: {
        add_new_menu(){
            var new_menu = {
                id: this.menu_id,
                name: this.menu_name,
                price: this.menu_price,
                starters: [],
                main_courses: [],
                desserts: []
            }

            this.menus_list.push(new_menu);
            this.display_add_new_menu_dialog = false;
            this.reset_form_fields();

            this.update_cookie();
        },
        add_new_dish(){
            var current_menu_index = 0;
            for(var i=0; i<this.menus_list.length; i++){
                if(this.menus_list[i].name === this.selected_menu){
                    current_menu_index = i;
                }
            }

            var current_dish = {
                id: this.dish_id,
                name: this.name,
                type: this.type,
                description: this.description,
                photo_url: this.photo_url
            };

            if(this.type === "Entrée"){
                this.menus_list[current_menu_index].starters.push(current_dish);
            }
            else if(this.type === "Plat"){
                this.menus_list[current_menu_index].main_courses.push(current_dish);
            }
            else if(this.type === "Dessert"){
                this.menus_list[current_menu_index].desserts.push(current_dish);
            }
            
            this.reset_form_fields();

            this.update_cookie();
        },
        reset_form_fields(){
            this.menu_name = "";
            this.menu_price = 0;
            this.selected_menu = "";
            this.name = "";
            this.type = "";
            this.description = "";
            this.photo_url = "";
            this.price = 0;
        },
        delete_dish(menu_id, dish_id, type){
            var menu_target_index = 0;
            while(this.menus_list[menu_target_index].id !== menu_id && menu_target_index < this.menus_list[menu_target_index].length){
                menu_target_index++;
            }

            var current_list;
            if(type === "Entrée"){
                current_list = this.menus_list[menu_target_index].starters;
            }
            else if(type === "Plat"){
                current_list = this.menus_list[menu_target_index].main_courses;
            }
            else if(type === "Dessert"){
                current_list = this.menus_list[menu_target_index].desserts;
            }

            var index_to_delete = 0;
            while(current_list[index_to_delete].id !== dish_id && index_to_delete < current_list.length){
                index_to_delete++;
            }
            current_list.splice(index_to_delete, 1);

            this.update_cookie();
        },
        delete_menu(menu_id){
            var menu_target_index = 0;
            while(this.menus_list[menu_target_index].id !== menu_id && menu_target_index < this.menus_list[menu_target_index].length){
                menu_target_index++;
            }

            this.menus_list.splice(menu_target_index, 1);
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
            this.setCookie("menus_list", JSON.stringify(this.menus_list), 1);
        }
    },
    created(){
        if(this.getCookie("menus_list") !== ""){
            this.menus_list = JSON.parse(this.getCookie("menus_list"));
            console.log(this.menus_list);
        }
    },
    computed:{
        menu_id(){
            return this.current_menu_id + 1;
        },
        dish_id(){
            return this.current_dish_id + 1;
        },
        is_add_new_menu_disabled(){
            if(this.menus_list.length > 0){
                return false;
            }
            else{
                return true;
            }
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
    .border{
        border: 1px solid black;
    }
</style>