<template>
  <div id="app" :class="{'hide-menu': !isMenuVisible || !user}">
    <Header title="Receita Segura" :hideToggle="!user" :hideUserDropdown="!user" />
    <Menu v-if="user" />
    <Content />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import { baseApiUrl, userKey } from "@/global";
import { mapState } from "vuex";
import Header from "@/components/template/Header";
import Menu from "@/components/template/Menu";
import Content from "@/components/template/Content";
import Footer from "@/components/template/Footer";

export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(["isMenuVisible", "user"]),
  data() {
    return {
      validatingToken: true
    };
  },
  methods: {
    async validateToken() {

      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.$store.commit("setUser", null);

      if (!userData) {
        this.$router.push({ name: "auth" }, () => {});
        return;
      }
      const res = await axios.post(`${baseApiUrl}/oauth/token`, userData);

      if (res.data) {
        this.$store.commit("setUser", userData);
      } else {
        localStorage.removeItem(userKey);
        this.$router.push({ name: "auth" });
      }
    }
  },
  created() {
    this.validateToken();
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