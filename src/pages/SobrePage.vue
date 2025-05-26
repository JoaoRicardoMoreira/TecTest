<template>
  <q-page class="p-4">
    <h1 class="text-2xl font-bold mb-4">Sobre o Projeto</h1>

    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Desafio Técnico Front-End - GIPHY App</div>
        <div class="text-subtitle2">Desenvolvido por: [Seu Nome Aqui]</div> <!-- TODO: Replace with actual developer name -->
      </q-card-section>

      <q-card-section class="q-pt-none">
        <p>
          Esta aplicação foi desenvolvida como parte de um desafio técnico para a vaga de Programador Web Front-End na SGBR® Sistemas.
        </p>
        <p>
          O objetivo foi criar uma interface interativa para visualizar e gerenciar GIFs utilizando a API pública do GIPHY.
        </p>
        <p>
          Tecnologias Utilizadas:
        </p>
        <ul>
          <li>Quasar Framework v2</li>
          <li>Vue.js v3 (Composition API com Script Setup)</li>
          <li>Vue Router</li>
          <li>Pinia (Gerenciamento de Estado)</li>
          <li>Axios (Requisições HTTP)</li>
          <li>Tailwind CSS (Estilização)</li>
          <li>LocalStorage (Persistência de Favoritos via Plugin Quasar)</li>
          <li>GIPHY API</li>
        </ul>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <!-- Add links if needed, e.g., to GitHub repo or LinkedIn -->
        <!-- <q-btn flat label="GitHub" color="primary" href="[Your GitHub Link]" target="_blank" /> -->
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup lang="ts">
// No specific script logic needed for this static page
</script>

<style scoped>
/* Add component-specific styles here if needed */
ul {
  list-style: disc;
  margin-left: 20px;
}
li {
    margin-bottom: 4px;
}
</style>
