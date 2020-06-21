<template>
  <div class="overflow-auto">
    <b-table
      id="my-table"
      hover
      striped
      :bordered="true"
      :no-border-collapse="true"
      :fixed="true"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      :current-page="currentPage"
      small
    >
      <template v-slot:cell(actions)="data">
        <b-button variant="warning" @click="loadData(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadData(data.item, 'remove') ">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>

    <hr />

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Current Page: {{ currentPage }}</p>
  </div>
</template>

<script>
export default {
  nome: "Table",
  props: ["items", "fields", "loadData"],
  data() {
    return {
      perPage: 5,
      currentPage: 1
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  }
};
</script>

<style>
.page-item.active .page-link {
  background-color: #28a745 !important;
  border-color: #28a745;
}
.page-link {
  color: #28a745;
}
</style>