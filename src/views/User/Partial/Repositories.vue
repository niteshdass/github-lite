  <template>
    <div class="wrapper">
      <Toolbar/>
      <v-container v-if="loading">
        <LoadingBar />
      </v-container>
      <v-container fluid v-if="!loading">
        <v-row class="text-center">
          <v-divider vertical class="my-5 mx-3" dark></v-divider>
          <v-col cols="12">
            <v-card flat outlined class="mt-5 bg-none pa-4">
              <div>
                <h1 class="text-center">Repositories</h1>
                <v-row>
                  <v-col cols="12" md="6"  v-for="(item, i) in data" :key="i">
                    <v-row>
                      <v-col col="12">
                        <v-card class="mx-auto h--100" color="#F7F9F9" dark max-width="500">
                        <v-card-title>
                          <v-row align="center" justify="end">
                            <span class="subheading mr-16">
                              <v-tooltip bottom small>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    left
                                    small
                                    color="blue-grey"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    mdi-file-code
                                  </v-icon>
                                  <span style="color: black">{{ item.language }}</span>
                                  </template>
                                  <span>Language</span>
                              </v-tooltip>
                            </span>
                            <span class="subheading mr-16 ml-5">
                              <v-tooltip bottom small>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    left
                                    small
                                    color="blue-grey"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    mdi-source-fork
                                  </v-icon>
                                  <span style="color: black">{{ item.forks }}</span>
                                </template>
                                <span>Forks</span>
                              </v-tooltip>
                            </span>
                            <span class="mr-16 ml-5">
                              <v-tooltip bottom small>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-icon
                                    left
                                    small
                                    color="blue-grey"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    mdi-eye
                                  </v-icon>
                                  <span style="color: black">{{ item.watching }}</span>
                                </template>
                                <span>Watchers</span>
                              </v-tooltip>
                            </span>
                          </v-row>
                        </v-card-title>
                          <a :href="item.htmlUrl" target="_blank" class="decoration__none">
                            <h4 class="mt-3 ml-3 blue--text">{{item.name}}</h4>
                          </a>
                        <p class="ml-4 blue-grey--text caption">
                          <span> {{ item.description }} </span>
                        </p>
                        <v-card-actions>
                          <v-list-item class="grow">
                            <v-list-item-avatar color="grey darken-3">
                              <v-img
                              class="elevation-6"
                              :src="item.ownerProfile"
                              ></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                              <v-list-item-title>
                                <span class="blue-grey--text">{{ item.owner }}</span>
                              </v-list-item-title>
                            </v-list-item-content>
                            <v-row align="center" justify="end">
                              <v-icon class="mr-1 blue-grey--text">mdi-star</v-icon>
                              <span class="subheading mr-2 blue-grey--text">{{item.star}}</span>
                              <v-icon class="mr-1 blue-grey--text">mdi-watch</v-icon>
                              <span class="subheading blue-grey--text">{{item.date}}</span>
                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                        </v-card>
                      </v-col>
                      </v-row>
                    </v-col>
                </v-row>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </template>
<script>
import axios from 'axios'
import moment from 'moment'
import Toolbar from '../../../components/NavBar'
import LoadingBar from '../../../components/LoadingBar'
import _ from 'lodash'

export default {
  props: ['login'],

  data: () => ({
    data: [],
    loading: false
  }),

  components: {
  // toolbar,
    Toolbar,
    LoadingBar
  },

  created () {
    const name = this.login
    this.loading = true
    axios.get('https://api.github.com/users/' + name + '/repos')
      .then((res) => {
        this.data = this.prepareData(res.data)
        console.log(this.prepareData(res.data))
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        console.log(error)
      })
  },
  methods: {
    prepareData (dataItems) {
      const preparedData = []
      _.map(dataItems, (dataItem) => {
      /* eslint-disable camelcase */
        const {
          html_url = '',
          name = '',
          language = '',
          forks = '',
          watchers_count = '',
          description = '',
          updated_at = '',
          owner = '',
          stargazers_count = ''
        } = dataItem
        const templateObj = {}
        templateObj.htmlUrl = html_url || ''
        templateObj.name = name.toUpperCase() || ''
        templateObj.language = language || 'Javascript'
        templateObj.forks = forks || 0
        templateObj.watching = watchers_count || 0
        templateObj.description = description || 'Rust library for requesting certificates from an ACME provider'
        templateObj.owner = owner?.login || ''
        templateObj.star = stargazers_count || ''
        templateObj.ownerProfile = owner?.avatar_url || ''
        templateObj.date = moment(String(updated_at)).format('MM/DD/YYYY') || ''
        preparedData.push(templateObj)
        return templateObj
      })
      return preparedData
    }
  }
}
</script>
