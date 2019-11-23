<template>
    <!--Para alinear el contenido-->
    <v-layout align-start>
       <v-flex>
            <v-toolbar flat color="white">
                <v-btn @click="crearPDF"><v-icon>print</v-icon></v-btn>
                <v-toolbar-title>MachineReview</v-toolbar-title>
                <v-divider
                    class="mx-2"
                    inset
                    vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-text-field class="text-xs-center" v-model="search" append-icon="search" label="Busqueda" single-line hide-details></v-text-field>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo</v-btn>
                    </template>
                    <v-card>
                    <v-card-title>
                        <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs6 sm6 md6>
                              <v-text-field v-model="reviewdate" label="ReviewDate"></v-text-field>
                            </v-flex>
        
                             <v-flex xs6 sm6 md6>
                                <v-select v-model="idschedule" :items="idSchedule" label="Order">
                                </v-select>
                            </v-flex>
                           
                    
                        </v-layout>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                        <v-btn color="blue darken-1" flat @click="guardar">Guardar</v-btn>
                    </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>
            <v-data-table
            :headers="headers"
            :items="MachineReview"
            :search="search"
            class="elevation-1"
            >
            <template v-slot:items="props">
                <td class="justify-center layout px-0">
                <v-icon
                    small
                    class="mr-2"
                    @click="editItem(props.item)"
                >
                    edit
                </v-icon>

                </td>
                <td>{{ props.item.reviewdate }}</td>
                <td>{{ props.item.schedule }}</td>

              
            
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="listar">Actualizar</v-btn>
            </template>
            </v-data-table>

        </v-flex> 
    </v-layout>
</template>

<script>
    import axios from 'axios'
    import jsPDF from 'jspdf'
    import autoTable from 'jspdf-autotable'
    export default {
        data(){
            return{
                machinereviews:[],
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'reviewdate', value: 'reviewdate', sortable: false },
                    { text: 'schedule', value: 'schedule', sortable: false },
                    
                   
                    
                    
                   
                ],
                search:'',
                editedIndex: -1,
                //Para crear Order
                id: '',

                idschedule:'',
                schedule:[],
                reviewdate:'',
               
               
            }
        },

        //Evaluar si se registra o se edita
        computed: {
            
            formTitle () {
            return this.editedIndex === -1 ? 'Nueva MachineReview' : 'Actualizar MachineReview'
            }
        },

        watch: {
            dialog (val) {
            val || this.close()
            }
        },

        created () {
            //Esta propiedad es la primera que se ejecuta al iniciar
            this.listar()
            this.select()
        },

        methods:{
            crearPDF(){
                var columns = [
                   
                    {title: "Schedule", dataKey: "shedule"}, 
                    {title: "ReviewDate", dataKey: "reviewdate"}, 
                  
            
                ];
                var rows = [];

                this.schedules.map(function(x){
                    rows.push({reviewdate:x.reviewdate,schedule:x.schedule});
                });

                // Only pt supported (not mm or in)
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows, {
                    margin: {top: 60},
                    addPageContent: function(data) {
                        doc.text("Listado de Machine Reviews", 40, 30);
                    }
                });
                doc.save('MachinesReviews.pdf');
            },
            listar(){
                let me = this;
                axios.get("api/machinereview").then(function(response){
                    me.MachinesReviews = response.data
                }).catch(function(error){
                    console.log(error)
                })
            },
            select(){
                let me = this;
                var scheduleArray = []
                axios.get("api/machinereview").then(function(response){
                   scheduleArray=response.data
                    scheduleArray.map(function(x){
                        me.schedule.push({text: x.idschedule, value:x.idschedule})
                    })
                }).catch(function(error){
                    console.log(error)
                })

            },

            editItem (item) {
                this.id = item.idmachinereview
                this.idschedule=item.idschedule
    
                this.reviewdate=item.reviewdate
                
                
              
                this.editedIndex = 1
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.desserts.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.limpiar()
            },

            limpiar(){
                this.id=""
                this.idschedule=""
                this.reviewdate=""

                this.editedIndex=-1
            },

            guardar () {
                if(this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Para editar    
                    let me = this
                    axios.put("api/machinereview",{
                        'idmachinereview':me.id,
                        'idschedule':me.idschedule,
                        'reviewdate':me.reviewdate,
                       
                  
                        
                    }).then(function(response){
                        me.close()
                        me.listar()
                        me.limpiar()
                    }).catch(function(error){
                        console.log(error)
                    })
                } else {
                    //Para guardar
                    let me = this
                    axios.post("api/machinereview",{
                        'idschedule':me.idschedule,
                       'reviewdate':me.reviewdate,
                  
                       
                    }).then(function(response){
                        me.close()
                        me.listar()
                        me.limpiar()
                    }).catch(function(error){
                        console.log(error)
                    })
                }
                this.close()
            },
          
        
       
        }        
    }
</script