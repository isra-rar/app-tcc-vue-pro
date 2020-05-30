<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder=" Pesquisar"
        v-model="treeFilter" class="filter-field">
    </div>
    <div>
      <tree
      :data="items"
      :options="options"
      ref="tree"
      />
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';
import Tree from 'liquor-tree'


export default {
  nome: "Menu",
  components: {Tree},
  computed: mapState(['isMenuVisible']),
  data(){
    return {
      items: [
        {text: 'Medicos', children: [
          {text: 'Listar'},
        ]},{text: 'Instituição', children: [
          {text: "Listar"}
        ]},
        {text: 'Atestado', children: [
          {text: 'Gerar'}
        ]},
        {text: 'Usuarios', children: [
          {text: 'Listar'}
        ]}
      ]
    }
  }
};
</script>

<style>
  .menu {
    grid-area: menu;
    /* background: linear-gradient(to right, #232526, #414345); */
    background: #e9f7e9;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }

  .menu-filter {
    padding: 10px 5px;
  }

  .menu-filter i {
    padding: 5px;
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