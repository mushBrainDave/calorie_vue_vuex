import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Auth from '@/components/Auth'
import SettingList from '@/components/setting/SettingsList'
import SettingCreate from '@/components/setting/SettingsCreate'
import IntakeList from '@/components/intake/IntakeList'
import IntakeCreate from '@/components/intake/IntakeCreate'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/settings-list',
      name: 'SettingsList',
      component: SettingList
    },
    {
      path: '/settings-list/:msg',
      name: 'SettingsUpdatedList',
      component: SettingList
    },
    {
      path: '/settings-create',
      name: 'SettingsCreate',
      component: SettingCreate
    },
    {
      path: '/settings-create/:pk',
      name: 'SettingsUpdate',
      component: SettingCreate
    },
     {
      path: '/intake-list',
      name: 'IntakeList',
      component: IntakeList
    },
{
      path: '/intake-list/:msg',
      name: 'IntakeUpdatedList',
      component: IntakeList
    },
    {
      path: '/intake-create',
      name: 'IntakeCreate',
      component: IntakeCreate
    },
    {
      path: '/intake-create/:pk',
      name: 'IntakeUpdate',
      component: IntakeCreate
    },
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    }
  ]
})