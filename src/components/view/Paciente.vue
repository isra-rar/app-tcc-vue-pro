<template>
  <div>
    <PageTitle icon="fa fa-user" main="Pacientes" />
    <b-form>
      <input type="hidden" id="user-id" v-model="paciente.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="paciente-nome">
            <b-form-input
              id="nomePaciente"
              type="text"
              v-model="paciente.nome"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="CPF:" label-for="paciente-cpf">
            <b-form-input
              id="cpfPaciente"
              type="text"
              v-model="paciente.cpf"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CPF"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="RG:" label-for="paciente-rg">
            <b-form-input
              id="pacienteRg"
              type="text"
              v-model="paciente.rg"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o RG"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CEP:" label-for="paciente-cep">
            <b-form-input
              id="pacienteCep"
              type="text"
              v-model="paciente.endereco.cep"
              @blur.native="buscaCep"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Logradouro:" label-for="paciente-logradouro">
            <b-form-input
              id="paciente-logradouro"
              type="text"
              v-model="paciente.endereco.logradouro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Logradouro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Bairro:" label-for="paciente-bairro">
            <b-form-input
              id="paciente-bairro"
              type="text"
              v-model="paciente.endereco.bairro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Bairro"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="paciente-numero">
            <b-form-input
              id="paciente-numero"
              type="text"
              v-model="paciente.endereco.numeroEndereco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Numero"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Cidade:" label-for="paciente-cidade">
            <b-form-input
              id="paciente-cidade"
              type="text"
              v-model="paciente.endereco.cidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="UF:" label-for="paciente-uf">
            <b-form-input
              id="paciente-uf"
              type="text"
              v-model="paciente.endereco.uf"
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
      <hr />
      <div>
        <Table
          :items="pacientes"
          :fields="fields"
          :current-page="pagina"
          :perPage="qtnpagina"
          :loadData="loadPaciente"
        />
      </div>
    </b-form>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { showError, baseApiUrl } from "@/global";
import axios from "axios";
import Table from "../template/Table";
import { getCep } from "../../services/cepApi";

export default {
  name: "Paciente",
  components: { Table, PageTitle },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      paciente: {
        nome: "",
        cpf: "",
        rg: "",
        endereco: {
          logradouro: "",
          bairro: "",
          cep: "",
          cidade: "",
          uf: "",
          numeroEndereco: ""
        }
      },
      pacientes: [],
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
      const url = `${baseApiUrl}/pacientes`;
      axios.get(url).then(res => {
        this.pacientes = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.paciente = { endereco: {} }), this.loadData();
    },
    save() {
      const method = this.paciente.id ? "put" : "post";
      const id = this.paciente.id ? `/${this.paciente.id}` : "";
      axios[method](`${baseApiUrl}/pacientes${id}`, this.paciente)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    async buscaCep() {
      const response = await getCep(this.paciente.endereco.cep);
      if (response.data.erro) {
        return;
      }
      const { logradouro, bairro, localidade, uf } = response.data;
      this.paciente.endereco.logradouro = logradouro;
      this.paciente.endereco.bairro = bairro;
      this.paciente.endereco.cidade = localidade;
      this.paciente.endereco.uf = uf;
    },
    remove() {
      const id = this.paciente.id;
      axios.delete(`${baseApiUrl}/pacientes/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    loadPaciente(paciente, mode = "save") {
      this.mode = mode;
      this.paciente = { ...paciente };
    }
  },
  mounted() {
    this.loadData();
  }
};
</script>

<style>
</style>