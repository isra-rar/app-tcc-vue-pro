<template>
  <div class="auth-content" v-show="!isLoginVisible">
    <div class="auth-modal">
      <img src="@/assets/logo.png" width="80" alt="Logo" />
      <label class="logo-login">Receita Segura</label>
      <hr />
      <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>
      <input v-if="showSignup" v-model="user.name" type="text" placeholder="Nome" name="nome" />
      <input v-model="user.username" type="text" placeholder="E-mail" name="email" />
      <input v-model="user.password" type="password" placeholder="Senha" name="senha" v-on:keyup.enter="signin"/>
      <input
        v-if="showSignup"
        v-model="user.confirmPassword"
        type="password"
        placeholder="Confirme a Senha"
        name="confirmarSenha"
      />

      <button v-if="showSignup" @click="signup">Registrar</button>
      <button v-else @click="signin" >Entrar</button>

      <a href @click.prevent="showSignup = !showSignup">
        <!-- <span v-if="showSignup">Já tem cadastro? Acesse o Login!</span>
        <span v-else>Não tem cadastro? Registre-se aqui!</span> -->
      </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, userKey, showError, usernameBasic, passwordBasic} from "@/global";
import axios from "axios";
import qs from "qs";
import { mapState } from "vuex";

export default {
  name: "Auth",
  computed: mapState(["isLoginVisible"]),
  data() {
    return {
      showSignup: false,
      user: {
        grant_type: "password"
      }
    };
  },
  methods: {
    signin() {
      axios
        .post(`${baseApiUrl}/oauth/token`, qs.stringify(this.user), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          },
          auth: {
              username: usernameBasic,
              password: passwordBasic
          }
        })
        .then(res => {
          this.$store.commit("setUser", res.data);
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: "/home" });
        })
        .catch(showError);
    },
    signup() {
      axios
        .post(`${baseApiUrl}/signup`, this.user)
        .then(() => {
          this.$toasted.global.defaultSucess();
          this.user = {};
          this.showSignup = false;
        })
        .catch(showError);
    }
  }
};
</script>

<style>
.auth-content {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.auth-modal {
  background-color: #fff;
  width: 350px;
  padding: 35px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-title {
  font-size: 1.2rem;
  font-weight: 100;
  margin-bottom: 15px;
}

.logo-login {
  font-size: 1.8rem;
  font-family: "Helvetica";
}

.auth-modal input {
  border: 1px solid #bbb;
  width: 100%;
  margin-bottom: 15px;
  padding: 3px 8px;
  outline: none;
}

.auth-modal button {
  align-self: center;
  background-color: green;
  color: #fff;
  padding: 5px 15px;
}

.auth-modal a {
  margin-top: 25px;
}
.auth-modal hr {
  border: 0;
  width: 100%;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(120, 120, 120, 0),
    rgba(120, 120, 120, 0.75),
    rgba(120, 120, 120, 0)
  );
}
</style>