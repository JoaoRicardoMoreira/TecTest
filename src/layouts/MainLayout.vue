<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Top Bar -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <!-- Menu Button (for small screens) -->
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" class="lt-md" />

        <!-- Logo and Title -->
        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <!-- Placeholder Logo - Replace with actual logo if available -->
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Giphy App Challenge
        </q-toolbar-title>

        <!-- Developer Name -->
        <div class="q-mr-md text-caption">Desenvolvido por: [Seu Nome Aqui]</div> <!-- TODO: Replace with actual developer name -->
      </q-toolbar>
    </q-header>

    <!-- Left Navigation Drawer -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu Principal
        </q-item-label>

        <!-- Dynamically generate menu links -->
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- Main Page Content Area -->
    <q-page-container>
      <!-- Vue Router will inject the active page component here -->
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, { EssentialLinkProps } from 'components/EssentialLink.vue'; // Component for menu items

// Define the links for the navigation drawer
const essentialLinks: EssentialLinkProps[] = [
  {
    title: 'Home',
    caption: 'Trending Gifs & Busca',
    icon: 'home',
    link: '/'
  },
  {
    title: 'Favoritos',
    caption: 'Seus Gifs favoritos',
    icon: 'favorite',
    link: '/favoritos'
  },
  {
    title: 'Categorias',
    caption: 'Explorar por categoria',
    icon: 'category',
    link: '/categorias'
  },
  {
    title: 'Sobre',
    caption: 'Informações do Dev',
    icon: 'info',
    link: '/sobre'
  }
];

// Reactive state for controlling the left drawer's visibility
const leftDrawerOpen = ref(false)

// Function to toggle the left drawer (used by the menu button)
function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style lang="scss">
// Ensure Tailwind base styles are applied if not already globally configured
// Note: Quasar handles Tailwind integration, but explicitly including them here can sometimes help
// depending on the setup. Check quasar.config.js and css configuration.
// @tailwind base;
// @tailwind components;
// @tailwind utilities;

// Custom styles can be added here if needed
</style>
