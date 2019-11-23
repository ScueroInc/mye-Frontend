<template>
    <!--Para alinear el contenido-->
    <v-layout align-start>
       <v-flex>
            <v-toolbar flat color="white">
                <v-btn @click="crearPDF"><v-icon>print</v-icon></v-btn>
                <v-toolbar-title>Schedule</v-toolbar-title>
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
                              <v-text-field v-model="agreeddate" label="AgreedDate"></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                              <v-text-field v-model="arrivaldate" label="ArrivalDate" ></v-text-field>
                            </v-flex>
                             <v-flex xs6 sm6 md6>
                                <v-select v-model="iduser" :items="idUser" label="User">
                                </v-select>
                            </v-flex>
                             <v-flex xs6 sm6 md6>
                                <v-select v-model="idorder" :items="idOrder" label="Order">
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
            :items="Schedule"
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
                <td>{{ props.item.agreeddate }}</td>
                <td>{{ props.item.arrivaldate }}</td>
                <td>{{ props.item.user }}</td>
                <td>{{ props.item.order }}</td>

              
            
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
                schedules:[],
                dialog: false,
                headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'agreeddate', value: 'agreeddate', sortable: false },
                    { text: 'arrivaldate', value: 'arrivaldate', sortable: false },
                    { text: 'user', value: 'user', sortable: false },
                    { text: 'order', value: 'order', sortable: false },
                    
                   
                    
                    
                   
                ],
                search:'',
                editedIndex: -1,
                //Para crear Order
                id: '',
                iduser:'',
                user:[],
                idorder:'',
                order:[],
                agreeddate:'',
                arrivaldate:'',
               
            }
        },

        //Evaluar si se registra o se edita
        computed: {
            
            formTitle () {
            return this.editedIndex === -1 ? 'Nueva Schedule' : 'Actualizar Schedule'
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
                    {title: "User", dataKey: "user"}, 
                    {title: "Order", dataKey: "order"}, 
                    {title: "agreeddate", dataKey: "AgreedDate"}, 
                    {title: "arrivaldate", dataKey: "ArrivalDate"}, 
            
                ];
                var rows = [];

                this.schedules.map(function(x){
                    rows.push({agreeddate:x.agreeddate,arrivaldate:x.arrivaldate,user:x.user,order:x.order});
                });

                // Only pt supported (not mm or in)
                var doc = new jsPDF('p', 'pt');
                doc.autoTable(columns, rows, {
                    margin: {top: 60},
                    addPageContent: function(data) {
                        doc.text("Listado de Schedules", 40, 30);
                    }
                });
                doc.save('Schedules.pdf');
            },
            listar(){
                let me = this;
                axios.get("api/schedule").then(function(response){
                    me.Schedules = response.data
                }).catch(function(error){
                    console.log(error)
                })
            },
            select(){
                let me = this;
                var userArray = []
                axios.get("api/schedule").then(function(response){
                   userArray=response.data
                    userArray.map(function(x){
                        me.user.push({text: x.name, value:x.iduser})
                    })
                }).catch(function(error){
                    console.log(error)
                })

                var orderArray = []
                axios.get("api/schedule").then(function(response){
                   orderArray=response.data
                    orderArray.map(function(x){
                        me. order.push({text: x.idorder, value:x.idorder})
                    })
                }).catch(function(error){
                    console.log(error)
                })
            },

            editItem (item) {
                this.id = item.idschedule
                this.iduser=item.iduser
                this.idorder=item.idorder
                this.agreeddate=item.agreeddate
                this.arrivaldate = item.arrivaldate
                
              
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
                this.iduser=""
                this.idorder=""
                this.agreeddate=""
                this.arrivaldate =""

                this.editedIndex=-1
            },

            guardar () {
                if(this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Para editar    
                    let me = this
                    axios.put("api/shedule",{
                        'idschedule':me.id,
                        'iduser':me.iduser,
                        'idorder':me.idorder,
                        'agreeddate':me.agreeddate,
                        'arrivaldate':me.arrivaldate,
                  
                        
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
                    axios.post("api/schedule",{
                        'iduser':me.iduser,
                        'idorder':me.idorder,
                        'agreeddate':me.agreeddate,
                        'arrivaldate':me.arrivaldate,
                  
                       
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