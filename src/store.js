import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import router from './router'

Vue.use(Vuex)

//Aqui se muestra el estado de nuestrav aplicacion
//Nuestros componentes emitiran acciones que modifiquen este estado
export default new Vuex.Store({
  state: {
   
  },
  //logica para cambiar de estado
  //Mediante estas acciones se van a cambiar de estado
  mutations: {
  
  },
  //Las acciones no cambian de estado si no más bien realizan las mutaciones
  actions: {
   
  }
})
