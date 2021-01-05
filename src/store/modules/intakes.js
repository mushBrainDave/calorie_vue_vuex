import router from '../../router';
import {APIService} from '../../http/APIService';
const apiService = new APIService();

const state = {
    intake: [],
    intakes: [],
    dates: ['2020-10-21', '2020-10-28'],
    isUpdate: false
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
    setIntake(state, intake) {
        state.intake = intake
    },
    updateIntake(state, intake) {
        state.intake = intake
    },
    setUpdate(state, isUpdate) {
        state.isUpdate = isUpdate
    },
}

const actions = {
    getIntakes({commit}) {
        apiService.getIntakeList().then(response => {
            commit('setIntakes', response.data.data)
            if (localStorage.getItem("isAuthenticates")
            && JSON.parse(localStorage.getItem("isAuthenticates")) === true) {
            this.validUserName = JSON.parse(localStorage.getItem("log_user"));
            }
        }).catch(error => {
            if (error.response.status === 401) {
            localStorage.removeItem('isAuthenticates');
            localStorage.removeItem('log_user');
            localStorage.removeItem('token');
            //router.push("/auth");
            }
        });
    },
    createIntake({commit}) {
        apiService.addNewIntake(state.intake).then(response => {
            if (response.status === 201) {
                commit('setIntake', [])
                commit('setUpdate', false)
                router.push('/intake-list/new');
            }else{
                this.showMsg = "error";
            }
            }).catch(error => {
                if (error.response.status === 401) {
                router.push("/auth");
            }else if (error.response.status === 400) {
                this.showMsg = "error";
            }
        });
    },
    updateIntake({commit}) {
        console.log('here')
        apiService.updateIntake(state.intake).then(response => {
            if (response.status === 200) {
                commit('setIntake', [])
                commit('setUpdate', false)
                router.push('/intake-list/update');
            }else{
                this.showMsg = "error";
            }
            }).catch(error => {
            if (error.response.status === 401) {
                router.push("/auth");
            }else if (error.response.status === 400) {
                this.showMsg = "error";
            }
        });
    },
    deleteIntake({commit}, payload) {
        apiService.deleteIntake(intake.id).then(response => {
          if (response.status === 204) {
            router.push('/intake-list/deleted/')
            this.getintakes()
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