<template>
  <div class="crm-admin">
    <b-form>
      <input type="hidden" id="user-id" v-model="crm.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Razão Social:" label-for="crm-razaosocial">
            <b-form-input
              id="crm-razaosocial"
              type="text"
              v-model="crm.razaoSocial"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome da Razão Social"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Nome Fantasia:" label-for="crm-nomefantasia">
            <b-form-input
              id="crm-nomefantasia"
              type="text"
              v-model="crm.nomeFantasia"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Nome Fantasia"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CNPJ:" label-for="crm-cnpj">
            <b-form-input
              id="crm-cnpj"
              type="text"
              v-model="crm.cnpj"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CNPJ"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Presidente CRM:" label-for="crm-presidente">
            <b-form-input
              id="crm-presidente"
              type="text"
              v-model="crm.presidente"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Presidente do CRM"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CEP:" label-for="crm-cep">
            <b-form-input
              id="crm-cep"
              type="text"
              v-model="crm.endereco.cep"
              @blur.native="buscaCep"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Logradouro:" label-for="crm-logradouro">
            <b-form-input
              id="crm-logradouro"
              type="text"
              v-model="crm.endereco.logradouro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Logradouro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Bairro:" label-for="crm-bairro">
            <b-form-input
              id="crm-bairro"
              type="text"
              v-model="crm.endereco.bairro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Bairro"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="crm-numero">
            <b-form-input
              id="crm-numero"
              type="text"
              v-model="crm.endereco.numero"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Numero"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Localidade:" label-for="crm-localidade">
            <b-form-input
              id="crm-localidade"
              type="text"
              v-model="crm.endereco.localidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Localidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="UF:" label-for="crm-uf">
            <b-form-input
              id="crm-uf"
              type="text"
              v-model="crm.endereco.uf"
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
          <b-button variant="warning" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        </b-col>
      </b-row>
    </b-form>
    <hr />
    <div>
      <Table
        :items="crms"
        :fields="fields"
        :current-page="pagina"
        :perPage="qtnpagina"
        :loadData="loadCrm"
      />
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from "@/global";
import axios from "axios";
import { getCep } from "../../services/cepApi";
import Table from "../template/Table";
export default {
  name: "CrmAdmin",
  components: { Table },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      crm: {
        razaoSocial: "",
        nomeFantasia: "",
        cnpj: "",
        presidente: "",
        endereco: {
          cep: "",
          logradouro: "",
          bairro: "",
          numero: "",
          localidade: "",
          uf: ""
        }
      },
      crms: [],
      fields: [
        {
          key: "id",
          label: "Código",
          sortable: true
        },
        {
          key: "razaoSocial",
          label: "Razão Social",
          sortable: true
        },
        {
          key: "nomeFantasia",
          label: "Nome Fantasia",
          sortable: true
        },
        {
          key: "cnpj",
          label: "CNPJ",
          sortable: true
        },
        {
          key: "presidente",
          label: "Presidente",
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
    loadUsers() {
      const url = `${baseApiUrl}/crms`;
      axios.get(url).then(res => {
        this.crms = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.crm = { endereco: {} }), this.loadUsers();
    },
    save() {
      const method = this.crm.id ? "put" : "post";
      const id = this.crm.id ? `/${this.crm.id}` : "";
      axios[method](`${baseApiUrl}/crms${id}`, this.crm)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.crm.id;
      axios.delete(`${baseApiUrl}/crms/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    async buscaCep() {
      const response = await getCep(this.crm.endereco.cep);
      if (response.data.erro) {
        return;
      }
      const { logradouro, bairro, localidade, uf } = response.data;
      this.crm.endereco.logradouro = logradouro;
      this.crm.endereco.bairro = bairro;
      this.crm.endereco.localidade = localidade;
      this.crm.endereco.uf = uf;
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    loadCrm(crm, mode = "save") {
      this.mode = mode;
      this.crm = { ...crm };
    }
  },
  mounted() {
    this.loadUsers();
  }
};
</script>

<style>
</style>