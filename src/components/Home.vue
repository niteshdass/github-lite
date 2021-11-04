    <template>
      <div class="wrapper">
        <v-card
          color="grey lighten-4"
          flat
          height="50px"
          tile
        >
          <v-toolbar id="scroll-target" dense>
            <router-link class="decoration__none" to="/"> <v-toolbar-title>GITHUB-LITE</v-toolbar-title></router-link>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              hide-details
              label="Enter github account name"
              single-line
              v-model="username"
              @keydown.enter="submitForm"
            ></v-text-field>
            <v-btn @click="submitForm()" icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
        <v-container v-if="loading">
          <LoadingBar />
        </v-container>
        <v-container v-if="!loading">
          <div class="search-result mx-auto">
            <v-card outlined flat class="bg-none py-4">
              <h2 v-if="dataItems.length" class="text-center my-3" >Github Users</h2>
              <h2 v-else class="text-center my-3" >Data not found ! please try again</h2>
              <v-row class="ml-8" >
                <v-col cols="4" md="4" sm="12" class="mx-auto" v-for="item in dataItems" :key="item.id">
                  <router-link :to="'/profile/' + item.userName" class="decoration__none">
                    <v-card elevation="8" outlined class="pa-3 my-3 search--item ">
                      <v-row justify="center" align="center">
                        <v-avatar size="200" style="margin-top: 5%">
                          <img
                          :src="item.userProfileImage"
                          alt="avater"
                          >
                        </v-avatar>
                      </v-row>
                      <v-row justify="center" style="margin-top: 20%">
                        <v-btn
                        rounded
                        color="info"
                        dark
                        >
                          {{ item.userName }}
                          <v-icon
                          dark
                          right
                          >
                            mdi-arrow-right
                          </v-icon>
                        </v-btn>
                      </v-row>
                    </v-card>
                  </router-link>
                </v-col>
              </v-row>
            </v-card>
          </div>
          <v-btn
          v-scroll="onScroll"
          v-show="fab"
          fab
          dark
          fixed
          bottom
          right
          color="primary"
          @click="toTop"
          >
            <v-icon>mdi-arrow-up</v-icon>
          </v-btn>
        </v-container>
      </div>
    </template>
<script>
import axios from 'axios'
import _ from 'lodash'
import LoadingBar from './LoadingBar'

export default {
  data: () => ({
    username: '',
    clicksubmit: '',
    data: [],
    dataItems: [],
    loading: false,
    fab: false
  }),

  components: {
  // toolbar,
    LoadingBar
  },
  async created () {
    this.submitForm()
  },
  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },
    toTop () {
      this.$vuetify.goTo(0)
    },
    prepareData (dataItems) {
      const preparedData = []
      _.map(dataItems, (dataItem) => {
      /* eslint-disable camelcase */
        const {
          avatar_url = '',
          login = ''
        } = dataItem
        const templateObj = {}
        templateObj.userName = login || ''
        templateObj.userProfileImage = avatar_url || ''
        preparedData.push(templateObj)
        return templateObj
      })
      return preparedData
    },
    submitForm () {
      this.loading = true
      let name = this.username || 'alex'
      this.clicksubmit = this.username
      name = name.split(' ').join('')
      axios.get('https://api.github.com/search/users?q=' + name)
        .then((res) => {
          this.data = res.data
          this.dataItems = this.prepareData(res.data.items)
          this.loading = false
          console.log('this.form', this.dataItems)
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>
