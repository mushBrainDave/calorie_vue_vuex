import {APIService} from '../../http/APIService';
const apiService = new APIService();


const state = {
    intakes: [],
    settings: [],
    dates: ['2020-10-21', '2020-10-28'],
}

const getters = {
    intakesByD (state)  {
        return state.intakes.filter(entry => {
          return (
            entry.intake_date >= state.dates[0] &&
            entry.intake_date <= state.dates[1]
          )
        })
    }
}

const mutations = {
    setIntakes(state, intakes) {
    state.intakes = intakes
    },
    setDates(state, dates) {
        state.dates = dates
    },
    setSettings(state, settings) {
        state.settings = settings
    }
}

const actions = {
    getIntakes({commit}) {
        apiService.getIntakeList().then(response => {
            commit('setIntakes', response.data.data)
            //this.intakes = response.data.data;
            //this.intakeSize = this.intakes.length;
            if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
            }
        }).catch(error => {
            if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
            }
        });
    },
    getSettings({commit}) {
        apiService.getSettingsList().then(response => {
            commit('setSettings', response.data.data)
          //this.settings = response.data.data;
          //this.settingsSize = this.settings.length;
          if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
          }
        }).catch(error => {
          if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            router.push("/auth");
          }
        });
      },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}