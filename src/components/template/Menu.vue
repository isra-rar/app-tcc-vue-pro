<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="tree-options">
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
  components: { Tree },
  computed: mapState(['isMenuVisible']),
  data(){
    return {
      items: [
        {text: 'Cadastro', children: [
          {text: 'Especialidade'},
          {text: 'Instituição'},
          {text: 'Medicamento'},
          {text: 'CID'},
        ]},
        {text: 'Emitir', children: [
          {text: 'Receita'},
          {text: 'Atestado'},
          {text: 'Paciente'},
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