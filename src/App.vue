<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <!-- Aqui agrego las opciones del menu -->
        <template>
          <v-list-tile :to="{ name: 'home'}">
            <v-list-tile-action><v-icon>home</v-icon></v-list-tile-action>
            <v-list-tile-title>Inicio</v-list-tile-title>
          </v-list-tile>
        </template>

        <!-- Opción desplegable del menú -->
        <template >
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>Builder</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <!--Botón de Categoria-->
            <v-list-tile :to="{ name: 'roles'}">
              <v-list-tile-action><v-icon>table_chart</v-icon></v-list-tile-action>
              <v-list-tile-title>Roles</v-list-tile-title>
            </v-list-tile>

             <v-list-tile :to="{ name: 'users'}">
              <v-list-tile-action><v-icon>table_chart</v-icon></v-list-tile-action>
              <v-list-tile-title>Users</v-list-tile-title>
            </v-list-tile>
            

            <!--Botón de Categoria-->
          </v-list-group>
        </template>

          <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Order
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'orders'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Orders
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'medicalequipments'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  MedicalEquipments
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            
          </v-list-group>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Review
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'schedules'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  Schedules
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'machinereviews'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  MachineReviews
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            
          </v-list-group>
        </template>

        <template>
          <v-list-group>
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Report
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile :to="{ name: 'finalreports'}">
              <v-list-tile-action>
                <v-icon>table_chart</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  FinalReports
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>


            
          </v-list-group>
        </template>

        <!-- Opción desplegable del menú -->
      
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="#0000FF"
      dark
      app
      fixed
    >
      <!-- Toolbar -->
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon color="#0000FF" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down black--text">Astra</span>
      </v-toolbar-title>
      <!-- Espacio -->
      <v-spacer></v-spacer>
      <!-- Icono de Apps -->
    
    </v-toolbar>

    <!-- Contenedor de la pagina -->
    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>

      <!-- Pie de pagina-->
      <v-footer dark height="auto">
        <v-layout justify-center>
          <v-flex text-xs-center>
            <v-card flat tile color="#0000FF" class="white--text">
              <v-card-text class="black--text pt-3">
                Proyecto Final Applicaciones Web &copy;2019 UPC
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-footer>

    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: null,
    }
  },
  //computed: {
    //Verificandod esde el store
   // logueado(){
    //  return this.$store.state.usuario
   // },
   // esAdministrador(){
    //  return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador'

    //},
    //esAlmacenero(){
     // return this.$store.state.usuario && this.$store.state.usuario.rol == 'Almacenero'
    //},
   // esVendedor(){
    //  return this.$store.state.usuario && this.$store.state.usuario.rol == 'Vendedor'
   // }
 // },
 // created(){
   // this.$store.dispatch("autoLogin");
  //},
  //methods:{
   // salir(){
    //  this.$store.dispatch("salir");
  //  }
 // }
}
</script>
