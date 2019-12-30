<template>
    <v-app style="width:100%;">
        <h1 class="center_header" style="font-size:50px;">{{ restaurant_name }}</h1>
        <v-card class="mx-auto">
            <div class="col-sm-12" style="min-width:1200px;">
                <v-row>
                    <v-col :cols="3">
                        <v-btn class="col-sm-12 vertical-align:center;" dark color="green" @click="see_menus()">
                            <v-icon dark>mdi-plus</v-icon> Voir les menus
                        </v-btn>
                    </v-col>
                    <v-col :cols="6">
                        <v-row class="col-sm-12" style="border: 1px solid #000;">
                            <v-col :cols="12">
                                <h3>Vos Menus :</h3>
                                <ul class="offset-sm-1">
                                    <li style="font-size:18px;" v-for="menu in command_menu" :key="menu">{{ menu.name }} : {{ menu.price }}€ x{{ menu.nb }}</li>
                                </ul>
                            </v-col>
                            <v-col :cols="12">
                                <h3>Vos plats individuels :</h3>
                                <ul class="offset-sm-1">
                                    <li style="font-size:18px;" v-for="dish in command_dish" :key="dish.id">{{ dish.name }} : {{ dish.price }}€ x{{ dish.nb }}</li>
                                </ul>
                            </v-col>
                            <v-row class="col-sm-12">
                                <h2 class="offset-sm-1">Total : {{ this.command_price }} €</h2>
                            </v-row>
                        </v-row>
                    </v-col>
                    <v-col :cols="3">
                        <v-btn class="col-sm-12" dark color="green" @click="see_carte()">
                            <v-icon dark>mdi-plus</v-icon> Voir la carte
                        </v-btn>
                    </v-col>
                </v-row>
            </div>

            <v-container fluid id="menus">
                <v-row>
                    <v-col
                        v-for="item in menus"
                        :key="item.id"
                        :cols="4"
                    > 
                        <v-row>
                            <v-col :cols="12">
                                <h1 class="center_header">{{ item.menu_list.name }} : {{ item.menu_list.menu_price }} €</h1>
                            </v-col>
                            <div class="col-md-12 offset-md-3">
                                <v-btn class="mx-2" dark color="green" @click="add_menu(item.id, item.menu_list.name, item.menu_list.menu_price)">
                                    <v-icon dark>mdi-plus</v-icon> Ajouter ce menu
                                </v-btn>
                            </div>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <h2 class="center_header">Entrées</h2>
                            </v-col>
                            <v-col v-for="starter in item.menu_list.starters" :key="starter.name" :cols="6">
                                <v-card min-height="300px">
                                    <v-img
                                        :src="starter.photo"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                    >
                                        <v-card-title v-text="starter.name"></v-card-title>
                                    </v-img>
                                    <p class="description">{{ starter.description }}</p>
                        
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-bookmark</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <h2 class="center_header">Plats</h2>
                            </v-col>
                            <v-col v-for="main_course in item.menu_list.main_courses" :key="main_course.name" :cols="6">
                                <v-card min-height="200px">
                                    <v-img
                                        :src="main_course.photo"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                    >
                                        <v-card-title v-text="main_course.name"></v-card-title>
                                    </v-img>
                                    <p class="description">{{ main_course.description }}</p>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-bookmark</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col :cols="12">
                                <h2 class="center_header">Desserts</h2>
                            </v-col>
                            <v-col v-for="dessert in item.menu_list.desserts" :key="dessert.name" :cols="6">
                                <v-card min-height="200px">
                                    <v-img
                                        :src="dessert.photo"
                                        class="white--text align-end"
                                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                        height="200px"
                                    >
                                        <v-card-title v-text="dessert.name"></v-card-title>
                                    </v-img>
                                    <p class="description">{{ dessert.description }}</p>
                        
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-heart</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-bookmark</v-icon>
                                        </v-btn>
                        
                                        <v-btn icon>
                                        <v-icon>mdi-share-variant</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>

        <v-container fluid id="carte" style="display:none;">
            <v-row>
                <v-col
                    v-for="course in carte"
                    :key="course.header"
                    :cols="12"
                >
                    <v-row>
                        <v-col :cols="12">
                            <h2 class="center_header">{{ course.header }}</h2>
                        </v-col>

                        <v-col
                            v-for="dish in course.list"
                            :key="dish"
                            :cols="3"
                        >
                            <v-card height="400px">
                                <v-img
                                    :src="dish.photo"
                                    class="white--text align-end"
                                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                                    height="200px"
                                >
                                    <v-card-title v-text="dish.name"></v-card-title>
                                </v-img>
                                <p style="height:100px;" class="description">{{ dish.description }}</p>
                    
                                <v-card-actions>
                                    <v-btn class="col-sm-12" color="green" dark @click="add_dish(dish.id, dish.name, dish.price)">
                                        <v-icon>mdi-plus</v-icon> Ajouter à la commande
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>

export default {
    name: "RestaurantsMenu",
    data () {
        return {
            carte: [{
                header:"Entrées",
                list: []
            },
            {
                header:"Plats",
                list: []
            },
            {
                header:"Desserts",
                list: []
            }],
            menus: [],
            command_menu: [],
            command_dish: [],
            command_price: 0,
            show_menus: true
        }
    },
    props: [
    ],
    methods: {
        see_menus(){
            document.getElementById("menus").style.display = "block";
            document.getElementById("carte").style.display = "none";
        },
        see_carte(){
            document.getElementById("menus").style.display = "none";
            document.getElementById("carte").style.display = "block";
        },
        check_if_menu_is_in_command(id){
            for(var i=0; i<this.command_menu.length; i++){
                if(this.command_menu[i].id === id){
                    return [true, i];
                }
            }
            return [false];
        },
        add_menu(id, menu_name, menu_price){
            var checker = this.check_if_menu_is_in_command(id);
            this.command_price += menu_price;
            if(checker[0] === true){
                this.command_menu[checker[1]].nb += 1;
            }
            else{
                var new_menu_in_command = {
                    id: id,
                    name: menu_name,
                    price: menu_price,
                    nb: 1
                }
                this.command_menu.push(new_menu_in_command);
            }
        },
        add_dish(id, dish_name, dish_price){
            var checker = this.check_if_dish_is_in_command(id, dish_name, dish_price);
            this.command_price += dish_price;
            if(checker[0] === true){
                this.command_dish[checker[1]].nb += 1;
            }
            else{
                var new_dish_in_command = {
                    id: id,
                    name: dish_name,
                    price: dish_price,
                    nb: 1
                }
                this.command_dish.push(new_dish_in_command);
            }
        },
        check_if_dish_is_in_command(id){
            for(var i=0; i<this.command_dish.length; i++){
                if(this.command_dish[i].id === id){
                    return [true, i];
                }
            }
            return [false];
        },
        get_menus(){
            var self = this;
            this.restaurant_name = this.$route.params.name;
            fetch("http://localhost:3000/get_menus", {
                "method": "GET"
            })
            .then(response => {
                response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    var random_menu_index = Math.floor((Math.random()*res.data.length));
                    self.menus = res.data[random_menu_index].menus;
                });
            })
            .catch(err => {
                console.log(err);
            });
        },
        get_carte(){
            var self = this;
            this.restaurant_name = this.$route.params.name;
            fetch("http://localhost:3000/get_cartes", {
                "method": "GET"
            })
            .then(response => {
                response.json().then(data => ({
                        data: data,
                        status: response.status
                    })
                ).then(res => {
                    var random_carte_index = Math.floor((Math.random()*res.data.length));
                    self.carte[0].list = res.data[random_carte_index].carte.starters;
                    self.carte[1].list = res.data[random_carte_index].carte.main_courses;
                    self.carte[2].list = res.data[random_carte_index].carte.desserts;
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.get_menus();
        this.get_carte();
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
    .center_header{
        text-align: center;
    }
    .description{
        font-size:14px;
    }
</style>