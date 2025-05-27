<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="bg-blue-700 text-white">
   <q-toolbar class="px-4 flex justify-between items-center">
  <div class="flex items-center space-x-3">
    <q-btn
      flat
      dense
      round
      icon="menu"
      class="q-mr-sm"
      @click="leftDrawerOpen = !leftDrawerOpen"
    />
    <img src="../assets/logo dev.png" alt="Logo" class="logo" />
    <span class="text-lg font-bold">TESTE TECNICO</span>
  </div>
        <div class="flex items-center space-x-2">
          <span class="text-sm font-medium">João Moreira</span>
          <q-avatar round size="md" color="white" text-color="blue-700" icon="account_circle" />
        </div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      side="left"
      class="bg-blue-900 text-white"
    >
      <q-list>
        <q-item-label header class="text-white font-semibold text-sm px-4 py-2">
          Menu
        </q-item-label>

      <q-item
  v-for="link in essentialLinks"
  :key="link.title"
  :to="link.link"
  exact
  active-class="bg-white/10 text-white font-semibold"
  class="transition-all duration-200 rounded-lg hover:bg-white/10 px-2"
  clickable
  v-ripple
>
  <q-item-section avatar>
    <q-icon :name="link.icon" class="text-white" />
  </q-item-section>

  <q-item-section>
    <q-item-label class="text-white text-sm font-medium tracking-wide">
      {{ link.title }}
    </q-item-label>
  </q-item-section>
</q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-gray-100 min-h-screen p-6">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const leftDrawerOpen = ref(true);

const essentialLinks = [
  {
    title: 'Home',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Favoritos',
    icon: 'favorite',
    link: '/favoritos'
  },
  {
    title: 'Categorias',
    icon: 'category',
    link: '/categorias'
  },
  {
    title: 'Sobre',
    icon: 'info',
    link: '/sobre'
  }
];
</script>
<style scoped>
.logo{
  max-width: 90px;
  max-height: 50px;
}


</style>