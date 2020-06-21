<template>
  <div class="crm-admin">
    <PageTitle icon="fa fa-file" main="Atestado" />
    <b-form>
      <input type="hidden" id="user-id" v-model="atestado.id" />
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Paciente:" label-for="paciente">
            <b-form-select v-model="atestado.paciente.id">
              <option :value="null" disabled>Seleciona um paciente</option>
              <option
                v-for="pacienteAtestado in pacientes"
                :key="pacienteAtestado.id"
                :value="pacienteAtestado.id"
              >{{ pacienteAtestado.nome }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-group label="CID:" label-for="cid">
            <b-form-select v-model="atestado.cidFk.id">
              <option :value="null" disabled>Seleciona um CID</option>
              <option
                v-for="cidAtestado in cids"
                :key="cidAtestado.id"
                :value="cidAtestado.id"
              >{{ cidAtestado.descricao }}</option>
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="6" sm="12">
          <b-form-group label="Dias afastado:" label-for="diaAfastado">
            <b-form-input
              id="diaAfastado"
              type="text"
              v-model="atestado.diasAfastamento"
              required
              :readonly="mode === 'remove'"
              placeholder="Informe a quantidade de dias"
            />
          </b-form-group>
        </b-col>
        <b-col md="6" sm="12">
          <b-form-checkbox
            id="permitirCid"
            v-model="atestado.permiteInformarCid"
            name="permitirCid"
            value="true"
            unchecked-value="false"
            style="top: 40px"
          >Paciente permite informar CID?</b-form-checkbox>
        </b-col>
      </b-row>
    </b-form>
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
          <b-form-input id="senha-input" type="password" v-model="atestado.assinatura" required></b-form-input>
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
  name: "Atestado",
  components: { PageTitle },
  data() {
    return {
      mode: "save",
      medicoAtestado: {},
      medicos: [],
      pacienteAtestado: {},
      pacientes: [],
      cidAtestado: {},
      cids: [],
      atestado: {
        medico: {
          id: null
        },
        paciente: {
          id: null
        },
        cidFk: {
          id: null
        },
        assinatura: ""
      }
    };
  },
  methods: {
    downloadFile(idAtestado) {
      const url = `${baseApiUrl}/atestados/imprimirAtestadoId/${idAtestado}`;
      axios.get(url, { responseType: "arraybuffer" }).then(res => {
        let blob = new Blob([res.data], { type: "application/pdf" });
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = "atestado.pdf";
        link.click();
        window.open(link);
      });
    },
    resetModal() {
      this.atestado.assinatura = "";
    },
    loadMedico() {
      const json = localStorage.getItem(userKey);
      const userData = JSON.parse(json);
      this.atestado.medico.id = userData.id;
    },
    loadPacientes() {
      const url = `${baseApiUrl}/pacientes`;
      axios.get(url).then(res => {
        this.pacientes = res.data;
      });
    },
    loadCids() {
      const url = `${baseApiUrl}/cids`;
      axios.get(url).then(res => {
        this.cids = res.data;
      });
    },
    reset() {
      (this.mode = "save"), (this.atestado = { paciente: {id: null}, cidFk: {id: null} });
    },
    save() {
      axios
        .post(`${baseApiUrl}/atestados`, this.atestado)
        .then(res => {
          this.$toasted.global.defaultSuccess();
          this.reset();
          this.downloadFile(res.data.id);
        })
        .catch(showError);
    },
    remove() {
      const id = this.atestado.id;
      axios.delete(`${baseApiUrl}/atestados/${id}`).then(() => {
        this.$toasted.global.defaultSuccess();
        this.reset();
      });
    }
  },
  mounted() {
    this.loadMedico();
    this.loadPacientes();
    this.loadCids();
  }
};
</script>

<style>
</style>