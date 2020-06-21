<template>
  <div class="crm-admin">
    <PageTitle icon="fa fa-file" main="Receita" />
    <b-form>
      <input type="hidden" id="user-id" v-model="receita.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Paciente:" label-for="paciente">
            <b-form-select v-model="receita.paciente.id">
              <option :value="null" disabled>Seleciona um paciente</option>
              <option
                v-for="pacienteReceita in pacientes"
                :key="pacienteReceita.id"
                :value="pacienteReceita.id"
              >{{ pacienteReceita.nome }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Conduta" label-for="conduta">
            <b-form-input
              id="conduta"
              type="text"
              v-model="newPrescricao.conduta"
              required
              :readonly="mode === 'remove'"
              placeholder="Condutas para medicamento"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col xs="12">
          <b-button
            variant="dark"
            @click="adicionarPrescricao"
            style="margin-top: 40px"
          >Adicionar prescrição</b-button>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="Medicamento:" label-for="medicamento">
            <b-form-select v-model="newPrescricao.medicamentoFk.id">
              <option :value="null" disabled>Seleciona um Medicamento</option>
              <option
                v-for="medicamentoReceita in medicamentos"
                :key="medicamentoReceita.produto"
                :value="medicamentoReceita.id"
              >{{ medicamentoReceita.produto }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <div>
      <b-table
        id="my-table"
        hover
        striped
        :bordered="true"
        :no-border-collapse="true"
        :fixed="true"
        :items="receita.prescricoes"
        :fields="fields"
        small
      >

        <template v-slot:cell(actions)="data">
          <b-button variant="danger" @click="removePrescricao(data.item) ">
            <i class="fa fa-trash"></i>
          </b-button>
        </template>
      </b-table>
    </div>
    <hr />
    <b-row>
      <b-col xs="12">
        <b-button
          v-b-modal.modal-prevent-closing
          variant="success"
          v-if="mode === 'save'"
        >Assinar Digitalmente</b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-col>
    </b-row>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Assinatura Digital"
      @show="resetModal"
      @hidden="resetModal"
      @ok="save"
    >
      <form ref="form">
        <b-form-group label="Senha:" label-for="senha-input" invalid-feedback="Senha is required">
          <b-form-input id="senha-input" type="password" v-model="receita.assinatura" required></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import { showError, baseApiUrl, userKey } from "@/global";
import axios from "axios";

export default {
  name: "Receita",
  components: { PageTitle },
  data() {
    return {
      mode: "save",
      addPrescricao: false,
      pacienteReceita: {},
      pacientes: [],
      medicamentoReceita: {},
      medicamentos: [],
      newPrescricao: {
        medicamentoFk: {
          id: null
        }
      },
      receita: {
        medico: {
          id: null
        },
        paciente: {
          id: null
        },
        prescricoes: []
      },
      fields: [
        {
          key: "conduta",
          label: "Conduta",
          sortable: true
        },
        {
          key: "medicamentoFk.id",
          label: "Medicamento",
          sortable: true,
          formatter: (value) => {
            return this.medicamentos.find(m => m.id == value)['produto']
          }
        },
        {
          key: "actions",
          label: "Ações"
        }
      ]
    };
  },
  methods: {
    getProdutoMedicamento(id) {
      return this.medicamentos.find(m => m.id == id).produto;
    },
    adicionarPrescricao() {
      this.receita.prescricoes.push(this.newPrescricao);
      this.newPrescricao = {
        medicamentoFk: {
          id: null
        }
      };
    },
    downloadFile(idReceita) {
      const url = `${baseApiUrl}/receitas/imprimirReceitaId/${idReceita}`;
      axios.get(url, { responseType: "arraybuffer" }).then(res => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "receita.pdf";
        link.click();
        window.open(link);
      });
    },
    resetModal() {
      this.receita.assinatura = "";
    },
    loadMedico() {
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.receita.medico.id = userData.id;
    },
    loadPacientes() {
      const url = `${baseApiUrl}/pacientes`;
      axios.get(url).then(res => {
        this.pacientes = res.data;
      });
    },
    loadMedicamentos() {
      const url = `${baseApiUrl}/medicamentos`;
      axios.get(url).then(res => {
        this.medicamentos = res.data;
      });
    },
    reset() {
      (this.mode = "save"),
        (this.receita = { paciente: { id: null }, prescricoes: [] });
    },
    save() {
      axios
        .post(`${baseApiUrl}/receitas`, this.receita)
        .then(res => {
          this.$toasted.global.defaultSuccess();
          this.downloadFile(res.data.id);
          this.reset();
        })
        .catch(showError);
    },
    remove() {
      const id = this.receita.id;
      axios.delete(`${baseApiUrl}/receitas/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    },
    laodPrescricao(receita) {
      this.receita.prescricoes = { ...receita.prescricoes };
    },
    removePrescricao(value) {
      var arr = this.receita.prescricoes;
      var index = arr.indexOf(value);
      if (index > -1) {
        arr.splice(index, 1);
      }
      return arr;
    }
  },
  mounted() {
    this.loadMedico();
    this.loadPacientes();
    this.loadMedicamentos();
  }
};
</script>

<style>
</style>