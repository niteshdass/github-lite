<template>
  <div class="wrapper">
    <Toolbar/>
    <v-container v-if="loading">
      <LoadingBar />
    </v-container>
    <v-container v-if="!loading">
      <v-card
        class="mx-auto"
        max-width="900"
        tile
      >
        <v-img
        height="100%"
        width="900"
        src="https://image.freepik.com/free-photo/old-black-background-grunge-texture-dark-wallpaper-blackboard-chalkboard-concrete_1258-48233.jpg"
        >
        <v-row
        align="end"
        class="fill-height text-center"
        >
        <v-col
        align-self="start"
        class="pa-0"
        cols="12"
        >
        <v-avatar size="350" style="margin-top: 5%" >
          <img
          :src="data.userProfileImage"
          alt="avater"
          >
        </v-avatar>
      </v-col>
      <v-col class="py-0">
        <v-list-item
        color="rgba(0, 0, 0, .4)"
        dark
        >
          <v-list-item-content>
          <v-list-item-title class="text-h6">
            {{ data.name }}
          </v-list-item-title>
          <div style="display: flex; justify-content: space-between;">
            <h5 v-if="data.company">
              <v-icon left color="blue-grey">mdi-domain</v-icon>
            {{ data.company }}
            </h5>
            <h5 v-if="data.location">
              <v-icon left color="blue-grey">mdi-map-marker</v-icon>
            {{ data.location }}
            </h5>
            <h5 v-if="data.twitter">
              <v-icon left color="blue-grey">mdi-twitter</v-icon>
            {{ data.twitter }}
            </h5>
          </div>
          </v-list-item-content>
        </v-list-item>
      </v-col>
      </v-row>
      </v-img>
      </v-card>
      <v-row class="text-center">
        <v-col class="mb-2 mt-4">
          <div style="text-align: center">
            <h2 v-if="data.bioData">BIO-DATA</h2>
            <p>
              <span class="blue-grey--text">
                Email: {{ data.email }}
              </span><br>
              <span class="blue-grey--text">
                Github: <router-link :to="data.url" class="decoration__none">{{ data.url }} </router-link>
              </span><br>
              <span class="blue-grey--text">
                {{ data.bioData }}
              </span><br>
            </p>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="!loading">
      <div class="search-result mx-auto">
        <v-card outlined elevation="6" class="bg-none pa-5 white--text" >
          <v-row>
            <v-col cols="4" class="text-center repo-section">
              <router-link :to="'/profile/' + data.userName + '/repos'" class="decoration__none">
            <v-card>
            <v-img
            contain
            class="white--text"
            height="200px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZtsEkxy-9kHcrdQmFw9hb997BUITNDH9ovHOmJ53s1IekV61u6aCP8X8bmXOfmimFwsk&usqp=CAU"
            />
            <v-card-title>
              <div style="margin-left: 40%;">
                <v-btn
                icon
                color="deep-orange"
                >
                  <v-icon>mdi-cached</v-icon>
                </v-btn>
                <span class="title blue--text">{{ data.repos }}</span>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn style="width: 100%" large round depressed class="mx-auto" color="primary" @click="colchange">REPOSITORIES</v-btn>
            </v-card-actions>
            </v-card>
              </router-link>
            </v-col>
            <v-col cols="4" class="text-center repo-section">
              <router-link :to="'/profile/' + data.userName + '/followers'" class="decoration__none">
              <v-card>
                <v-img
                contain
                class="white--text"
                height="200px"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxIfj64ouGSo3PBDGFzaOax4f2js-QFAC9-UlUZIzSs3OZHDi5RBKj4XDQ72pzxL0NBMk&usqp=CAU"
                />
              <v-card-title>
                <div style="margin-left: 40%;">
                  <v-btn
                  icon
                  color="deep-orange"
                  >
                    <v-icon>mdi-thumb-up</v-icon>
                  </v-btn>
                  <span class="title blue--text">{{ data.followers }}</span>
                </div>
              </v-card-title>
              <v-card-actions>
               <v-btn style="width: 100%" large round depressed class="mx-auto" color="primary" @click="colchange">FOLLOWERS</v-btn>
              </v-card-actions>
            </v-card>
            </router-link>
            </v-col>
            <v-col cols="4" class="text-center repo-section">
              <router-link :to="'/profile/' + data.userName + '/following'" class="decoration__none">
            <v-card>
            <v-img
            contain
            class="white--text"
            height="200px"
            src="https://static.thenounproject.com/png/125116-200.png"
            />
            <v-card-title>
              <div style="margin-left: 40%;">
                <v-btn
                icon
                color="deep-orange"
                >
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <span class="title blue--text">{{ data.following }}</span>
              </div>
              </v-card-title>
              <v-card-actions>
                <v-btn style="width: 100%" large round depressed class="mx-auto" color="primary" @click="colchange">FOLLOWING</v-btn>
              </v-card-actions>
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
import moment from 'moment'
import LoadingBar from '../../components/LoadingBar'
import Toolbar from '../../components/NavBar'

let name
export default {
  props: ['login'],

  data: () => ({
    username: '',
    data: [],
    loading: false
  }),

  components: {
    Toolbar,
    LoadingBar
  },

  created () {
    name = this.login
    this.loading = true
    axios.get('https://api.github.com/users/' + name)
      .then((res) => {
        this.data = this.prepareData(res.data)
        console.log(res.data)
        this.loading = false
      })
      .catch((error) => {
        this.loading = false
        console.log(error)
      })
  },
  methods: {
    prepareData (dataItems) {
    /* eslint-disable camelcase */
      const {
        avatar_url = '',
        login = '',
        email = '',
        name = '',
        company = '',
        location = '',
        twitter_username = '',
        bio = '',
        public_repos = '',
        followers = '',
        following = '',
        created_at = '',
        url = ''
      } = dataItems
      const templateObj = {}
      templateObj.userName = login || ''
      templateObj.name = name || ''
      templateObj.company = company || ''
      templateObj.twitter = twitter_username || ''
      templateObj.location = location || ''
      templateObj.bioData = bio || ''
      templateObj.repos = public_repos || ''
      templateObj.followers = followers || ''
      templateObj.following = following || ''
      templateObj.date = moment(String(created_at)).format('MM/DD/YYYY') || ''
      templateObj.userProfileImage = avatar_url || ''
      templateObj.email = email || ''
      templateObj.url = url || ''
      return templateObj
    }
  }
}
</script>
