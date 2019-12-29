<template>
    <v-card
      class="mx-auto"
    >
      <v-container fluid>
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
                    <v-btn class="mx-2" dark color="green">
                        <v-icon dark>mdi-plus</v-icon> Ajouter ce menu
                    </v-btn>
                </div>
            </v-row>
            <v-row>
                <v-col :cols="12">
                    <h2 class="center_header">Entrées</h2>
                </v-col>
                <v-col v-for="starter in item.menu_list.starters" :key="starter.name" :cols="6">
                    <v-card min-height="200px">
                        <v-img
                            :src="starter.photo"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                        >
                            <v-card-title v-text="starter.name"></v-card-title>
                        </v-img>
            
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
</template>

<script>

export default {
    name: "RestaurantsMenu",
    data () {
        return {
            menus: [1,2,3]
        }
    },
    props: [
    ],
    methods: {
        get_menus(){
            var self = this;
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
                    console.log(self.menus);
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    },
    created(){
        this.get_menus();
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
</style>