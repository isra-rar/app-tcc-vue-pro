<template>
  <div>
    <PageTitle  icon="fa fa-university" main="Instituição"/>
    <b-form>
      <input type="hidden" id="user-id" v-model="instituicao.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CNPJ:" label-for="instituicao-cnpj">
            <b-form-input
              id="instituicao-cnpj"
              type="text"
              v-model="instituicao.cnpj"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CNPJ"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Razão Social:" label-for="instituicao-razaosocial">
            <b-form-input
              id="instituicao-razaosocial"
              type="text"
              v-model="instituicao.razaoSocial"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome da Razão Social"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CEP:" label-for="instituicao-cep">
            <b-form-input
              id="instituicao-cep"
              type="text"
              v-model="instituicao.endereco.cep"
              @blur.native="buscaCep"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Logradouro:" label-for="instituicao-logradouro">
            <b-form-input
              id="instituicao-logradouro"
              type="text"
              v-model="instituicao.endereco.logradouro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Logradouro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Bairro:" label-for="instituicao-bairro">
            <b-form-input
              id="instituicao-bairro"
              type="text"
              v-model="instituicao.endereco.bairro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Bairro"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="instituicao-numero">
            <b-form-input
              id="instituicao-numero"
              type="text"
              v-model="instituicao.endereco.numeroEndereco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Numero"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Cidade:" label-for="instituicao-cidade">
            <b-form-input
              id="instituicao-cidade"
              type="text"
              v-model="instituicao.endereco.cidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="UF:" label-for="instituicao-uf">
            <b-form-input
              id="instituicao-uf"
              type="text"
              v-model="instituicao.endereco.uf"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a UF"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Complemento:" label-for="instituicao-bairro">
            <b-form-input
              id="instituicao-complemento"
              type="text"
              v-model="instituicao.endereco.complemento"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Complemento"
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
        :items="instituicoes"
        :fields="fields"
        :current-page="pagina"
        :perPage="qtnpagina"
        :loadData="loadInstituicao"
      />
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import Table from "../template/Table";
import { getCep } from "../../services/cepApi";

export default {
  name: "Instituicao",
  components: { Table, PageTitle },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      instituicao: {
        cnpj: "",
        razaoSocial: "",
        tipoInstituicao: "CONSELHO",
        endereco: {
          logradouro: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          numeroEndereco: "",
          complemento: ""
        }
      },
      instituicoes: [],
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true
        },
        {
          key: "cnpj",
          label: "CNPJ",
          sortable: true
        },
        {
          key: "razaoSocial",
          label: "Razão Social",
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
      const url = `${baseApiUrl}/instituicoes`;
      axios.get(url).then(res => {
        this.instituicoes = res.data;
      });
    },
    reset() {
      (this.mode = "save"),
        (this.instituicao = { endereco: {} }),
        this.loadData();
    },
    save() {
      const method = this.instituicao.id ? "put" : "post";
      const id = this.instituicao.id ? `/${this.instituicao.id}` : "";
      axios[method](`${baseApiUrl}/instituicoes${id}`, this.instituicao)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    async buscaCep() {
      const response = await getCep(this.instituicao.endereco.cep);
      if (response.data.erro) {
        return;
      }
      const { logradouro, bairro, localidade, uf } = response.data;
      this.instituicao.endereco.logradouro = logradouro;
      this.instituicao.endereco.bairro = bairro;
      this.instituicao.endereco.cidade = localidade;
      this.instituicao.endereco.uf = uf;
    },
    remove() {
      const id = this.instituicao.id;
      axios.delete(`${baseApiUrl}/instituicoes/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    loadInstituicao(instituicao, mode = "save") {
      this.mode = mode;
      this.instituicao = { ...instituicao };
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
</style>