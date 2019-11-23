import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import User from './components/User.vue'
import Role from './components/Role.vue'
import Paciente from './components/Paciente.vue'
import Schedule from './components/Schedule.vue'
import Order from './components/Order.vue'
import MedicalEquipment from './components/MedicalEquipment.vue'
import MachineReview from './components/MachineReview.vue'
import FinalReport from './components/FinalReport.vue'


Vue.use(Router)

var router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      //cada elemento de mi array tendra acceso a esta ruta
    },
    {
      path: '/users',
      name:'users',
      component: User,
    },

    {
      path: '/roles',
      name:'roles',
      component: Role,
    },
    {
      path: '/pacientes',
      name:'pacientes',
      component: Paciente,
    },

     {
      path: '/finalreports',
      name: 'finalreports',
      component: FinalReport
    },

    {
      path: '/machinereviews',
      name: 'machinereviews',
      component: MachineReview
    },


   
    {
      path: '/schedules',
      name: 'schedules',
      component: Schedule
    },

    {
      path: '/orders',
      name: 'orders',
      component: Order
    },
    {
      path: '/medicalequipments',
      name: 'medicalequipments',
      component: MedicalEquipment
    }
  ]
})



export default router