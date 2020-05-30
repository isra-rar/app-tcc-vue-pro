<template>
  <aside class="menu" v-show="isMenuVisible">
    <div class="menu-filter">
      <i class="fa fa-search fa-lg"></i>
      <input type="text" placeholder=" Pesquisar"
        v-model="treeFilter" class="filter-field">
    </div>
    <hr>
    <!-- <div class="menu-options">
      <a href="">Medicos</a>
      <a href="">Clinica</a>
      <a href="">Orgao</a>
      <a href="">Teste</a>
    </div> -->
    <!-- <div class="menu-dropdown">
      <b-dropdown right split text="Split Menu">
        <b-dropdown-item>Medicos</b-dropdown-item>
        <b-dropdown-item>Clinica</b-dropdown-item>
      </b-dropdown>
    </div> -->
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


  /* .menu-options a {
    display: flex;
    flex-direction: column;
    padding: 10px 30px;
    color: black;
    text-decoration: none;
  }
  .menu-options a:hover {
    background: linear-gradient(to left, rgba(255,0,0,0), rgba(0, 100, 0, 1));
  } */
</style>