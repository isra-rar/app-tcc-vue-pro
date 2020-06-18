<template>
  <div class="crm-admin">
    <PageTitle  icon="fa fa-id-card" main="Especialidade"/>
    <b-form>
      <input type="hidden" id="user-id" v-model="especialidade.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Especialidade:" label-for="especialidade">
            <b-form-input
              id="especialidade"
              type="text"
              v-model="especialidade.nomeEspecialidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Especialidade"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button variant="success" v-if="mode === 'save'" @click="save">Salvar</b-button>
          <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
          <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <div>
      <Table
        :items="especialidades"
        :fields="fields"
        :current-page="pagina"
        :perPage="qtnpagina"
        :loadData="laodEspecialidade"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { showError, baseApiUrl } from "@/global";
import axios from "axios";
import Table from "../template/Table";

export default {
  name: "Especialidade",
  components: { Table, PageTitle },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      especialidade: {
        nomeEspecialidade: ''
      },
      especialidades: [],
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true
        },
        {
          key: "nomeEspecialidade",
          label: "Especialidade",
          sortable: true
        },
        {
          key: "actions",
          label: "Ações"
        }
      ]
    };
  },
  methods: {
    loadData() {
      const url = `${baseApiUrl}/especialidades`;
      axios.get(url).then(res => {
        this.especialidades = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.especialidade = { } ), this.loadData();
    },
    save() {
      const method = this.especialidade.id ? "put" : "post";
      const id = this.especialidade.id ? `/${this.especialidade.id}` : "";
      axios[method](`${baseApiUrl}/especialidades${id}`, this.especialidade)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.especialidade.id;
      axios.delete(`${baseApiUrl}/especialidades/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    laodEspecialidade(especialidade, mode = "save") {
      this.mode = mode;
      this.especialidade = { ...especialidade };
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
</style>