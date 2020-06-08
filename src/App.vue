<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="Receita Segura" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Loading v-if="validatingToken" />
    <Content v-else />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import { baseApiUrl, userKey, usernameBasic, passwordBasic } from '@/global';
import { mapState } from 'vuex';
import Header from "./components/template/Header.vue";
import Menu from "./components/template/Menu.vue";
import Content from "./components/template/Content.vue";
import Footer from "./components/template/Footer.vue";
import Loading from './components/template/Loading.vue'

export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content,
    Footer,
    Loading
  },
  computed: mapState(['isMenuVisible', 'user']),
  data() {
    return {
      validatingToken: false
    }
  },
  methods: {
    async validateToken () {
      this.validatingToken = true
      
      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if(!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        return
      }

      const res = await axios.  axios
        .post(`${baseApiUrl}/oauth/token`, qs.stringify(this.user), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          auth: {
              username: usernameBasic,
              password: passwordBasic
          }
        })

      if (res.data) {
        this.$store.commit('setUser', userData)
      } else {
        localStorage.removeItem(userKey)
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    },
    created() {
      this.validateToken()
    }
  }

};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100vh;
  display: grid;
  grid-auto-rows: 50px 1fr 40px;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>