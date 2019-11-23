<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>MedicalEquipments</v-toolbar-title>
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
                 <v-flex xs12 sm6 md6>
                 <v-text-field v-model="statedescription" label="Statedescription">
                 </v-text-field>
                 </v-flex>
                     <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="brand" label="Brand"></v-text-field>
                                </v-flex>
                                <v-flex xs12 sm6 md6>
                                    <v-text-field v-model="name" label="Name">
                                    </v-text-field>
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
      <v-data-table :headers="headers" :items="medicalequipmets" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          
          </td>
       <td>{{ props.item.statedescription }}</td>
         <td>{{ props.item.brand }}</td>
          <td>{{ props.item.name }}</td>
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
      medicalequipmets: [],
      dialog: false,
      headers: [
       { text: 'Opciones', value: 'opciones', sortable: false },
                    { text: 'Statedescription', value: 'statedescription' },
                    { text: 'Brand', value: 'brand' },
                    { text: 'Name', value: 'name' }
      ],
      search: "",
      editedIndex: -1,

      //Model
      id: "",
     statedescription:"",
     brand: "",
     name: "",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Nuevo MedicalEquipment' : 'Actualizar MedicalEquipment';
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
  },
  methods: {
    listar() {
      let me = this;
      axios
        .get("api/medicalequipment")
        .then(function(response) {
          //console.log(response);
          me.medicalequipmets = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editItem(item) {
              this.id=item.id;
                this.statedescription=item.statedescription;
                this.brand=item.brand;
                this.name=item.name;
                 this.editedIndex = 1;
                this.dialog = true;
    },

  

    close() {
      this.dialog = false;
    },
    limpiar() {
     this.id="";
                this.statedescription="";
                this.brand="";
                this.name="";

    },
    guardar() {
      if (this.editedIndex > -1) {
        //Código para editar

        let me = this;
        axios 
          .put("api/medicalequipment", {
              id : me.id,
            statedescription : me.statedescription,
            brand : me.brand,
            name : me.name
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        //Código para guardar
        let me = this;
        axios
          .post("api/medicalequipment", {
            
            statedescription : me.statedescription,
            brand : me.brand,
            name : me.name
          })
          .then(function(response) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
