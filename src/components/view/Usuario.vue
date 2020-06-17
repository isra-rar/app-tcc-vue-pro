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
          <b-form-group label="CEP:" label-for="usuario-cep">
            <b-form-input
              id="usuarioCep"
              type="text"
              v-model="usuario.endereco.cep"
              @blur.native="buscaCep"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Logradouro:" label-for="usuario-logradouro">
            <b-form-input
              id="usuario-logradouro"
              type="text"
              v-model="usuario.endereco.logradouro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Logradouro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Bairro:" label-for="usuario-bairro">
            <b-form-input
              id="medusuarioico-bairro"
              type="text"
              v-model="usuario.endereco.bairro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Bairro"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="usuario-numero">
            <b-form-input
              id="usuario-numero"
              type="text"
              v-model="usuario.endereco.numeroEndereco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Numero"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Cidade:" label-for="usuario-cidade">
            <b-form-input
              id="usuario-cidade"
              type="text"
              v-model="usuario.endereco.cidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="UF:" label-for="usuario-uf">
            <b-form-input
              id="usuario-uf"
              type="text"
              v-model="usuario.endereco.uf"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a UF"
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
import { getCep } from "../../services/cepApi";

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
      usuario: {
        nivelDeAcesso: null,
        endereco: {
          logradouro: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          numeroEndereco: ""
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
    reset() {
      (this.mode = "save"),
        (this.usuario = { nivelDeAcesso: null }),
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
    async buscaCep() {
      const response = await getCep(this.usuario.endereco.cep);

      if(!response){
          return
      }

      const { street, city, neighborhood, state } = response;
      this.usuario.endereco.logradouro = street;
      this.usuario.endereco.bairro = neighborhood;
      this.usuario.endereco.cidade = city;
      this.usuario.endereco.uf = state;
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
  }
};
</script>

<style>
</style>