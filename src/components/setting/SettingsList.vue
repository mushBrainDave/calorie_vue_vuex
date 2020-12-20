<template>
  <v-main>
    <!-- Welcome title -->
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <blockquote>
            Welcome {{validUserName}}!
            <footer>
              <small>
                <em>&mdash;Calorie Counter Services.</em>
              </small>
            </footer>
          </blockquote>
        </v-col>
        <v-col  cols="12" md="10" lg="10" align="center" justify="center">
          <v-alert v-if="showMsg === 'new'"
                   dismissible
                   :value="true"
                   type="success"
          >
            New settings has been added.
          </v-alert>
          <v-alert v-if="showMsg === 'update'" dismissible
                   :value="true"
                   type="success"
          >
           Settings information has been updated.
          </v-alert>
          <v-alert v-if="showMsg === 'deleted'" dismissible
                   :value="true"
                   type="success"
          >
            Selected Settings has been deleted.
          </v-alert>
        </v-col>
      </v-row>

      <!-- Data table -->
      <v-row align="center" justify="center">
        <v-col cols="12" md="10" v-resize="onResize">
          <v-data-table
            :headers="headers"
            :items="settings"
            class="elevation-1"
            style="max-height: 300px; overflow-y: auto"
            v-if="!isMobile"
          >
                  <template v-slot:item="props">
                    <tr>
                      <td align="left">{{ props.item.calorie_goal }}</td>
                      <td nowrap="true" align="left">{{ props.item.weight_goal }}</td>
                      <td nowrap="true" align="left">{{ props.item.fat_perc_goal }}</td>
                      <td nowrap="true" align="left">{{ props.item.protein_goal }}</td>
                      <td nowrap="true" align="left">{{ props.item.fat_goal }}</td>
                      <td nowrap="true" align="left">{{ props.item.carb_goal }}</td>
                      <td nowrap="true" align="left">{{ booleanDisplay(props.item.calorie_min_max) }}</td>
                      <td nowrap="true" align="left">{{ props.item.set_date }}</td>
                      <td align="center"><v-icon @click="updateSettings(props.item)">mdi-pencil</v-icon></td>
                    </tr>  
                  </template>
            </v-data-table>
            <v-data-iterator 
              :items="settings"
              hide-default-footer
              v-else
            >
              <template v-slot:default="{ items, isExpanded, expand }">
                <v-row>
                  <v-col
                    v-for="item in items"
                    :key="item.name"
                    cols="12"
                  >
                    <v-card>
                      <v-card-title class="pb-0 pt-0 pl-0">
                        <v-col cols="9" class="text-left body-2 text-truncate">{{item.calorie_goal }}</v-col>
                        <v-col cols="3" class="text-center">
                          <v-card-actions>
                            <v-icon @click="updateSettings(item)" class="small">mdi-pencil</v-icon>
                            <v-icon @click.native="expand(item, !isExpanded(item))" class="small">mdi-dots-horizontal</v-icon>
                          </v-card-actions>
                        </v-col>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-list v-show="isExpanded(item)" dense>
                        <v-list-item>
                          <v-list-item-content>Calorie Goal:</v-list-item-content>
                          <v-list-item-content class="align-end">{{ item.calorie_goal }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>My calorie goal is:</v-list-item-content>
                          <v-list-item-content class="align-end">{{ booleanDisplay(item.calorie_min_max) }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>Set Date:</v-list-item-content>
                          <v-list-item-content class="align-end">{{ item.set_date }}</v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </template>     
            </v-data-iterator>  
        </v-col>  
      </v-row>
    </v-container>  
  </v-main>
</template>

<script>

  import router from '../../router';
  import {APIService} from '../../http/APIService';
  const apiService = new APIService();
  import { mapState } from 'vuex'

  export default {
    name: "Settings",
    data: () => ({
      validUserName: "Guest",
      settingsSize: 0,
      showMsg: '',
      isMobile: false,
      headers: [
        {text: 'Calorie Goal', sortable: false, align: 'left',},
        {text: 'Weight Goal (lbs)', sortable: false, align: 'left',},
        {text: 'Body Fat Goal (%)', sortable: false, align: 'left',},
        {text: 'Protein Goal (g)', sortable: false, align: 'left',},
        {text: 'Fat Goal (g)', sortable: false, align: 'left',},
        {text: 'Carb Goal (g)', sortable: false, align: 'left',},
        {text: 'My calorie goal is', sortable: false, align: 'left',},
        {text: 'Set Date', sortable: false, align: 'left',},
        {text: 'Update', sortable: false, align: 'center',},
      ],

    }),

    mounted() {
      this.showMessages();
    },
    computed: {
      ...mapState('intakes', ['settings'])
    },
    methods: {
      booleanDisplay(bool) {
        if (bool === true)
          return String('the most calories I can get')
        else
          return String('the least calories I can get')
      },
      onResize() {
          if (window.innerWidth < 600)
            this.isMobile = true;
          else  
            this.isMobile = false;
        },
      showMessages(){
        console.log(this.$route.params.msg)
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      updateSettings(settings) {        router.push('/settings-create/' + settings.id);
      },
    }
  };
</script>

