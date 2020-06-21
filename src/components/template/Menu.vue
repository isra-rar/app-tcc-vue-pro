<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="tree-options">
      <tree :data="items" ref="tree" />
    </div>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";

export default {
  nome: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      items: [
        {
          text: "Cadastro",
          children: [
            { text: "Especialidade" },
            { text: "Instituição" },
            { text: 'Medico' },
            { text: 'Usuario' },
            { text: 'Paciente' }
          ]
        },
        {
          text: "Emitir",
          children: [
            { text: "Receita" },
            { text: "Atestado" }
          ]
        }
      ]
    };
  },
  methods: {
    onNodeSelect(node) {
      let routerNode = node.data.text.toLowerCase();
      if (routerNode != 'cadastro' && routerNode != 'emitir' && routerNode != 'consulta') {
        routerNode = this.removeAccents(routerNode);
        this.$router.push({
          path: routerNode
        });
      }
    },
    removeAccents(text) {
      return text
        .normalize("NFD")
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, "");
    }
  },
  mounted() {
    this.$refs.tree.$on("node:selected", this.onNodeSelect);
  }
};
</script>

<style>
.menu {
  grid-area: menu;
  background: #e9f7e9;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
a:-webkit-any-link {
  color: -webkit-link;
  cursor: pointer;
  text-decoration: none;
  color: #343434;
  font-size: 1.1rem;
  padding: 10px;
}
</style>