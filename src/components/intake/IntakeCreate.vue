<template>
  <v-container grid-list-md>
    <v-row align="center" justify="center">
      <v-col class="align-center">
        <v-row class="align-center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-alert v-if="showMsg === 'error'"
                     dismissible
                     :value="true"
                     type="error"
            >
              Please verify Intake information.
            </v-alert>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="10" md="10" lg="6" class="align-center">
            <v-card class="login-card">
              <v-card-title>
                <span class="headline">{{pageTitle}}</span>
              </v-card-title>
              <v-spacer/>
 
              <v-card-text>
                <v-form ref="form" lazy-validation>
                  <v-container>
                    <!--<v-text-field
                      v-model="intake.user"
                      label="User"
                      required
                    />-->
                    <v-text-field
                      v-model="intake.calories"
                      label="Calories"
                      required
                    />
                    <v-text-field
                      v-model="intake.current_weight"
                      label="Weight (lbs)"
                      required
                    />
                    <v-text-field
                      v-model="intake.fat_perc"
                      label="Body Fat (%)"
                      required
                    />
                    <v-text-field
                      v-model="intake.protein"
                      label="Protein (g)"
                      required
                    />
                    <v-text-field
                      v-model="intake.fat"
                      label="Fat (g)"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="intake.carbs"
                      label="Carbs (g)"
                      required
                      type="number"
                    />
                    <v-text-field
                      v-model="intake.intake_date"
                      label="Intake Date"
                      required
                      type="date"
                    />
 
                </v-container>
                <v-btn v-if="!isUpdate" class="blue white--text" @click="createIntake">Save</v-btn>
                <v-btn v-if="isUpdate" class="blue white--text" @click="updateIntake">Update</v-btn>
                <v-btn class="white black--text" @click="cancelOperation">Cancel</v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>  
      </v-col>
    </v-row>
  </v-container>
</template>
 
 
<script>
  import router from '../../router';
  import {APIService} from '../../http/APIService';
  const apiService = new APIService();
  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

  export default {
    name: 'IntakeCreate',
    components: {},
    data() {
      return {
        showError: false,
        intake: {},
        pageTitle: "Add New Intake",
        isUpdate: false,
        showMsg: '',
      };
    },
    computed: {
      ...mapState('intakes', ['intakes'])
    },

    methods: {
      ...mapActions(
        'intakes', ['getIntakes'],
        'intakes', ['createIntake']
        ),
      createIntake() {
        apiService.addNewIntake(this.intake).then(response => {
          if (response.status === 201) {
            this.intake = response.data;
             this.showMsg = "";
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
      cancelOperation(){
         router.push("/intake-list");
      },
      updateIntake() {
        apiService.updateIntake(this.intake).then(response => {
          if (response.status === 200) {
            this.intake = response.data;
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
      }
    },
    mounted() {
      this.getIntakes();
      if (this.$route.params.pk) {
        this.pageTitle = "Edit Intake";
        this.isUpdate = true;
        apiService.getIntake(this.$route.params.pk).then(response => {
          this.intake = response.data;
        }).catch(error => {
          if (error.response.status === 401) {
            router.push("/auth");
          }
        });
      }
    },
  }
</script>
<style scoped>
  .aform {
    margin-left: auto;
    width: 60%;
  }
</style>
