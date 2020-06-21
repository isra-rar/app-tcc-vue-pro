<template>
  <div>
    <PageTitle icon="fa fa-user-md" main="Medicos" />
    <b-form>
      <input type="hidden" id="user-id" v-model="medico.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Nome:" label-for="medico-nome">
            <b-form-input
              id="nomeMedico"
              type="text"
              v-model="medico.nome"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o nome"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="CPF:" label-for="medico-cpf">
            <b-form-input
              id="cpfMedico"
              type="text"
              v-model="medico.cpf"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CPF"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="RG:" label-for="medico-rg">
            <b-form-input
              id="medicoRg"
              type="text"
              v-model="medico.rg"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o RG"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group label="Especialidade" label-for="especialidades">
            <b-form-select v-model="medico.especialidadeFk.id">
              <option :value="null" disabled>Selecione Especialidade</option>
              <option
                v-for="especialidade in especialidades"
                :key="especialidade.id"
                :value="especialidade.id"
              >{{ especialidade.nomeEspecialidade }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="CEP:" label-for="medico-cep">
            <b-form-input
              id="medicoCep"
              type="text"
              v-model="medico.endereco.cep"
              @blur.native="buscaCep"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CEP"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Logradouro:" label-for="medico-logradouro">
            <b-form-input
              id="medico-logradouro"
              type="text"
              v-model="medico.endereco.logradouro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Logradouro"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Bairro:" label-for="medico-bairro">
            <b-form-input
              id="medico-bairro"
              type="text"
              v-model="medico.endereco.bairro"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Bairro"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Numero:" label-for="medico-numero">
            <b-form-input
              id="medico-numero"
              type="text"
              v-model="medico.endereco.numeroEndereco"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o Numero"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Cidade:" label-for="medico-cidade">
            <b-form-input
              id="medico-cidade"
              type="text"
              v-model="medico.endereco.cidade"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a Cidade"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="UF:" label-for="medico-uf">
            <b-form-input
              id="medico-uf"
              type="text"
              v-model="medico.endereco.uf"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a UF"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Instituição" label-for="instituicao">
            <b-form-select v-model="medico.lotacaoFk.id">
              <option :value="null" disabled>Seleciona a instituição</option>
              <option
                v-for="instituicao in instituicoes"
                :key="instituicao.id"
                :value="instituicao.id"
              >{{ instituicao.razaoSocial }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="CRM:" label-for="crmMedico">
            <b-form-input
              id="crmMedico"
              type="text"
              v-model="medico.crm"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe o CRM"
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
        :items="medicos"
        :fields="fields"
        :current-page="pagina"
        :perPage="qtnpagina"
        :loadData="loadMedico"
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
  name: "Medico",
  components: { Table, PageTitle },
  data() {
    return {
      pagina: 1,
      qtnpagina: 3,
      mode: "save",
      especialidade: {},
      especialidades: [],
      instituicao: {},
      instituicoes: [],
      medico: {
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
        },
        especialidadeFk: {
          id: null
        },
        lotacaoFk: {
          id: null
        }
      },
      medicos: [],
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
          key: 'especialidadeFk.nomeEspecialidade',
          label: 'Especialidade',
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
      const url = `${baseApiUrl}/medicos`;
      axios.get(url).then(res => {
        this.medicos = res.data;
      });
    },
    loadEspecialidades() {
      const url = `${baseApiUrl}/especialidades`;
      axios.get(url).then(res => {
        this.especialidades = res.data.map(especialidade => {
          return {
            ...especialidade,
            value: especialidade.id,
            text: especialidade.nomeEspecialidade
          };
        });
      });
    },
    loadInstituicoes() {
      const url = `${baseApiUrl}/instituicoes`;
      axios.get(url).then(res => {
        this.instituicoes = res.data.map(instituicao => {
          return {
            ...instituicao,
            value: instituicao.id,
            text: instituicao.razaoSocial
          };
        });
      });
    },
    reset() {
      (this.mode = "save"),
        (this.medico = { endereco: {}, especialidadeFk: {}, lotacaoFk: {} }),
        this.loadData();
    },
    save() {
      const method = this.medico.id ? "put" : "post";
      const id = this.medico.id ? `/${this.medico.id}` : "";
      axios[method](`${baseApiUrl}/medicos${id}`, this.medico)
        .then(() => {
          this.$toasted.global.defaultSuccess();
          this.reset();
        })
        .catch(showError);
    },
    async buscaCep() {
      const response = await getCep(this.medico.endereco.cep);

      if (!response) {
        return;
      }

      const { street, city, neighborhood, state } = response;
      this.medico.endereco.logradouro = street;
      this.medico.endereco.bairro = neighborhood;
      this.medico.endereco.cidade = city;
      this.medico.endereco.uf = state;
    },
    remove() {
      const id = this.medico.id;
      axios.delete(`${baseApiUrl}/medicos/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    },
    loadMedico(medico, mode = "save") {
      this.mode = mode;
      this.medico = { ...medico };
    }
  },
  mounted() {
    this.loadData();
    this.loadEspecialidades();
    this.loadInstituicoes();
  }
};
</script>

<style>
</style>