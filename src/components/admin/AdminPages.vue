<template>
  <div class="admin-pages">
    <PageTitle icon="fa fa-cogs" main="Administração do Sistema" sub="Cadastros & Cia" />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Artigos" active>
            <ArticleAdmin />
          </b-tab>
          <b-tab title="Fiscalizador">
            <FiscalizadorAdmin />
          </b-tab>
          <b-tab title="CRMS">
            <CrmAdmin />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import ArticleAdmin from "./ArticleAdmin.vue";
import FiscalizadorAdmin from "./FiscalizadorAdmin.vue";
import CrmAdmin from "./CrmAdmin.vue";

export default {
  name: "AdminPages",
  components: {
    PageTitle,
    ArticleAdmin,
    FiscalizadorAdmin,
    CrmAdmin
  }
};
</script>

<style>
</style>