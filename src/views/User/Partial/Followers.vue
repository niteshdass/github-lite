  <template>
    <div class="wrapper">
      <Toolbar/>
      <v-container v-if="loading">
        <LoadingBar />
      </v-container>
      <v-container v-if="!loading">
        <div class="search-result mx-auto">
          <v-card outlined flat class="bg-none py-4">
            <h2 class="text-center my-3" >Folowers</h2>
            <v-row class="ml-8" >
              <v-col cols="12" md="4"  class="mx-auto" v-for="item in data" :key="item.userName">
                <router-link :to="'/profile/' + item.userName" class="decoration__none">
                  <v-card elevation="14" outlined class="pa-3 my-3 search--item ">
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
      </v-container>
    </div>
  </template>

<script>
import axios from 'axios'
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
  computed: {
  },

  created () {
    this.loading = true
    const name = this.login
    axios.get('https://api.github.com/users/' + name + '/followers')
      .then((res) => {
        this.data = this.prepareData(res.data)
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
    }
  }
}
</script>
