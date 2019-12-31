<template>
    <v-app id="inspire">
        <h2 style="margin:10px;">Evaluations:</h2>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">Date</th>
                    <th class="text-left">Note</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="evaluation in evaluations" :key="evaluation">
                    <td>{{ evaluation.date }}</td>
                    <td>{{ evaluation.grade }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>
    </v-app>
</template>

<script>

export default {
    name: "RestaurantsEvaluation",
    data () {
        return {
            
        }
    },
    props: [
        "evaluations"
    ],
    methods: {
        format_date(){
            for(var i=0; i<this.evaluations.length; i++){
                var date  = new Date(this.evaluations[i].date);
                this.evaluations[i].date = date.toLocaleDateString("fr-FR");
            }
        }
    },
    created(){
        this.format_date();
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