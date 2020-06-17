<template>
  <div class="crm-admin">
    <PageTitle icon="fa fa-users" main="Usuario" />
    <b-form>
      <input type="hidden" id="user-id" v-model="usuario.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="usuario-nome">
            <b-form-input
              id="nome"
              type="text"
              v-model="usuario.nomeUsuario"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Matricula:" label-for="usuario-matricula">
            <b-form-input
              id="matricula"
              type="text"
              v-model="usuario.matricula"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome de usuário"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Email:" label-for="usuario-email">
            <b-form-input
              id="email"
              type="text"
              v-model="usuario.email"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Email"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Nivel de acesso" label-for="nivelacesso">
            <b-form-select v-model="usuario.nivelDeAcesso" :options="niveisAcesso">
              <option :value="null" disabled>Selecione um nível de acesso</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Instituição" label-for="instituicao">
            <b-form-select v-model="usuario.instituicao.id">
              <option :value="null" disabled>Seleciona a instituição</option>
              <option
                v-for="instituicaoUser in instituicoes"
                :key="instituicaoUser.id"
                :value="instituicaoUser.id"
              >{{ instituicaoUser.razaoSocial }}</option>
            </b-form-select>
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
        :items="usuarios"
        :fields="fields"
        :current-page="pagina"
        :perPage="qtnpagina"
        :loadData="laodUsuario"
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
  name: "Usuario",
  components: { Table, PageTitle },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      niveisAcesso: [
        { value: "ADMINISTRADOR", text: "ADMINISTRADOR" },
        { value: "CONSELHO", text: "CONSELHO" },
        { value: "GOVERNO", text: "GOVERNO" },
        { value: "PROFISSIONAL", text: "PROFISSIONAL" }
      ],
      instituicaoUser: {},
      instituicoes: [],
      usuario: {
        nivelDeAcesso: null,
        instituicao: {
          id: null
        }
      },
      usuarios: [],
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true
        },
        {
          key: "nome",
          label: "Nome",
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
      const url = `${baseApiUrl}/usuarios`;
      axios.get(url).then(res => {
        this.usuarios = res.data;
      });
    },
    loadInstituicoes() {
      const url = `${baseApiUrl}/instituicoes`;
      axios.get(url).then(res => {
        this.instituicoes = res.data.map(instituicaoUser => {
          return {
            ...instituicaoUser,
            value: instituicaoUser.id,
            text: instituicaoUser.razaoSocial
          };
        });
      });
    },
    reset() {
      (this.mode = "save"),
        (this.usuario = { nivelDeAcesso: null, instituicao: null }),
        this.loadData();
    },
    save() {
      const method = this.usuario.id ? "put" : "post";
      const id = this.usuario.id ? `/${this.usuario.id}` : "";
      axios[method](`${baseApiUrl}/usuarios${id}`, this.usuario)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.usuario.id;
      axios.delete(`${baseApiUrl}/usuarios/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    laodUsuario(usuario, mode = "save") {
      this.mode = mode;
      this.usuario = { ...usuario };
    }
  },
  mounted() {
    this.loadData();
    this.loadInstituicoes();
  }
};
</script>

<style>
</style>