<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Receita Segura" />
    <div class="stats">
      <Stat title="Numero de receitas emitidas por tipo" :value="stat.receitas" icon="fa fa-file" color="#3bc480" />
      <Stat title="Atestados emitidos" :value="stat.atetadosEmitidos" icon="fa fa-file" color="#3bc480" />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./Stat.vue";
// import axios from "axios";
// import { baseApiUrl } from "@/global";

export default {
  name: "Home",
  components: {
    PageTitle,
    Stat
  },
  data() {
    return {
      stat: {
        atetadosEmitidos: 5,
        receitas: 3
      }
    };
  }
  // methods: {
  //   getStats() {
  //     axios.get(`${baseApiUrl}/stats/users`).then(res => (this.stat = res.data));
  //   }
  // },
  // mounted() {
  //   this.getStats();
  // }
};
</script>

<style>
  .stats {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
</style>