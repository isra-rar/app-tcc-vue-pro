<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder=" Pesquisar"
        v-model="treeFilter" class="filter-field">
    </div>
  </aside>
</template>

<script>
import { mapState } from 'vuex';


export default {
  nome: "Menu",
  computed: mapState(['isMenuVisible'])
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
 
</style>