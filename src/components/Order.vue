<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Orders</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field
          class="text-xs-center"
          v-model="search"
          append-icon="search"
          label="Búsqueda"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2">Nuevo</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                           <v-flex xs6 sm6 md6>
                            <v-text-field type="number" v-model="priority" label="Priority"></v-text-field>
                            </v-flex>
                            <v-flex xs6 sm6 md6>
                                <v-select v-model="idmedicalequipment" :items="medicalequipments" label="MedicalEquipment">
                                </v-select>
                            </v-flex>
                            <v-flex xs12 sm12 md12>
                            <v-text-field v-model="description" label="Description"></v-text-field>
                            </v-flex>
                             <v-flex xs12 sm12 md12>
                            <v-text-field v-model="date" label="Date"></v-text-field>
                            </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="guardar">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
      <v-data-table :headers="headers" :items="orders" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          
          </td>
                <td>{{ props.item.priority }}</td>
                <td>{{ props.item.medicalequipment }}</td>
                <td>{{ props.item.description }}</td>
                <td>{{ props.item.date }}</td>

        </template>
        <template slot="no-data">
          <v-btn color="primary" @click="listar">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      orders: [],
      dialog: false,
      headers: [
                    { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'priority', value: 'priority', sortable: false },
                    { text: 'MedicalEquipment', value: 'medicalequipment', sortable: false },
                    { text: 'Description', value: 'description', sortable: false },
                    { text: 'Date', value: 'date', sortable: false },
      ],
      search: "",
      editedIndex: -1,

      //Model
        id: '',
        idmedicalequipment:'',
        medicalequipments:[],
        priority:0,
        descripcion:'',
        date:'',
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Order" : "Actualizar Order";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
     this.select()
  },
  methods: {
    listar() {
      let me = this;
      axios
        .get("api/order")
        .then(function(response) {
          //console.log(response);
          me.orders = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     select(){
               let me = this;
                var medicalequipmentsArray = []
                axios.get("api/medicalequipment").then(function(response){
                    medicalequipmentsArray=response.data
                    medicalequipmentsArray.map(function(x){
                        me. medicalequipments.push({text: x.name, value:x.id})
                    })
                }).catch(function(error){
                    console.log(error)
                })
            },

    editItem(item) {
      this.id = item.idorder
    this.idmedicalequipment=item.idmedicalequipment
    this.priority=item.priority
     this.description = item.description
     this.date = item.date
              

      this.editedIndex = 1;
      this.dialog = true;
    },

  

    close() {
      this.dialog = false;
    },
    limpiar() {
      this.id=""
                this.idmedicalequipment=""
                this.priority=""
                this.description=""
                this.date=""
                this.editedIndex=-1
    },
      guardar () {
                  console.log("holiwis", this);
                if(this.validar()){
                    return;
                      console.log("hYA");
                }
                if (this.editedIndex > -1) {
                    console.log("holawas");
                    //Para editar
                    let me = this

        
                    axios.put("api/order",{
                        id:me.id,
                        idmedicalequipment:me.idmedicalequipment,
                        priority:me.priority,
                        description:me.description,
                        date:me.date
                    }).then(function(response){
                        me.close()
                        me.listar()
                        me.limpiar()
                    }).catch(function(error){
                        console.log(error)
                    })
                } else {
                      console.log("Jitrusquis");
                    let me = this

                    axios.post("api/order",{
                         idmedicalequipment:me.idmedicalequipment,
                        priority:me.priority,
                        description:me.description,
                        date:me.date
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
};
</script>
