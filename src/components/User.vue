<template>
  <v-layout align-start>
    <v-flex>
      <v-toolbar flat color="white">
        <v-toolbar-title>Users</v-toolbar-title>
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
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="name" label="Name"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                        <v-select v-model="idrol" :items="roles" label="Role">
                    </v-select>
                    </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="tipodoc" label="Tipodoc"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-text-field v-model="numdoc" label="Numdoc"></v-text-field>
                  </v-flex>
                 <v-flex xs12 sm12 md12>
                            <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                </v-flex>
                   <v-flex xs12 sm12 md12>
                    <v-text-field v-model="address" label="Address"></v-text-field>
                  </v-flex>
                   <v-flex xs12 sm12 md12>
                    <v-text-field v-model="phone" label="Phone"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                            <v-text-field type="email" v-model="email" label="Email"></v-text-field>
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
      <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">
        <template slot="items" slot-scope="props">
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
          
          </td>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.role }}</td>
          <td>{{ props.item.tipodoc }}</td>
          <td>{{ props.item.numdoc }}</td>
          <td>{{ props.item.address }}</td>
          <td>{{ props.item.phone }}</td>
          <td>{{ props.item.email }}</td>
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
      users: [],
      dialog: false,
      headers: [
        { text: "Opciones", value: "opciones", sortable: false },
        { text: "Name", value: "name", sortable: true },
        { text: "Role", value: "role", sortable: true },
        { text: "Tipodoc", value: "tipodoc",sortable: true },
        { text: "numdoc", value: "numdoc" , sortable: false },
        { text: "password", value: "password", sortable: false },
        { text: "address", value: "address" , sortable: false },
         { text: "phone", value: "phone", sortable: false  },
        { text: "email", value: "email", sortable: false  }
        
      ],
      search: "",
      editedIndex: -1,

      //Model
      id: "",
      name: "",
      idrole: "",
      roles:[],
      tipodoc: "",
      document:['DNI', 'RUC', 'PASAPORTE', 'CEDULA'],
      numdoc: "",
      password: "",
      address: "",
      phone: "",
      email: "",
      actPassword: false,
     passwordAnt:'',
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo User" : "Actualizar User";
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
        .get("api/user")
        .then(function(response) {
          //console.log(response);
          me.users = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
     select(){
               let me = this;
                var rolesArray = []
                axios.get("api/role").then(function(response){
                    rolesArray=response.data
                    rolesArray.map(function(x){
                        me.roles.push({text: x.namerole, value:x.idrol})
                    })
                }).catch(function(error){
                    console.log(error)
                })
            },

    editItem(item) {
      this.id = item.id;
      this.name = item.name;
      this.idrole = item.idrole;
      this.tipodoc = item.tipodoc;
      this.numdoc = item.numdoc;
      this.password = item.passwordhash
      this.passwordAnt = item.passwordhash
     this.phone = item.phone;
      this.email = item.email;

      this.editedIndex = 1;
      this.dialog = true;
    },

  

    close() {
      this.dialog = false;
    },
    limpiar() {
       this.id = "";
      this.name = "";
      this.idrole = "";
      this.tipodoc = "";
      this.numdoc = "";
      this.password = "";
     this.address = "";
     this.phone = "";
      this.email = "";
      this.passwordAnt=""
      this.actPassword=false
    },
      guardar () {
                if(this.validar()){
                    return;
                }
                if (this.editedIndex > -1) {
                    //Para editar
                    let me = this

                    
                    if(me.password!=me.passwordAnt){
                        me.actPassword = true
                    }

                    axios.put('api/Usuarios/Actualizar',{
                        'idusuario':me.id,
                        'idrol':me.idrol,
                        'nombre':me.nombre,
                        'tipo_documento':me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono':me.telefono,
                        'email':me.email,
                        'password':me.password,
                        'act_password':me.actPassword
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

                    axios.post('api/Usuarios/Crear',{
                        'idrol':me.idrol,
                        'nombre':me.nombre,
                        'tipo_documento':me.tipo_documento,
                        'num_documento':me.num_documento,
                        'direccion':me.direccion,
                        'telefono':me.telefono,
                        'email':me.email,
                        'password':me.password
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
