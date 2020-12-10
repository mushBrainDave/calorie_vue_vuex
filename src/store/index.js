import Vue from 'vue'
import Vuex from 'vuex'
import intakes from './modules/intakes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    intakes
  }
})