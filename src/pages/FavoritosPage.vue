<template>
  <q-page class="p-4">
    <h1 class="text-2xl font-bold mb-4">Meus Favoritos</h1>

    <!-- Loading Indicator (if needed, though favorites are local) -->
    <!-- <div v-if="isLoading" class="flex justify-center items-center h-64">
      <q-spinner-dots color="primary" size="40px" />
    </div> -->

    <!-- Empty State -->
    <div v-if="favorites.length === 0" class="text-center text-gray-500 mt-8">
      Você ainda não adicionou nenhum GIF aos favoritos.
      <q-icon name="sentiment_dissatisfied" size="lg" class="block mx-auto mt-2" />
    </div>

    <!-- GIF Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <GifCard v-for="gif in favorites" :key="gif.id" :gif="gif" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGiphyStore } from 'stores/giphyStore';
import GifCard from 'components/GifCard.vue';

const giphyStore = useGiphyStore();

// Get favorites directly from the store
const favorites = computed(() => giphyStore.favorites);

// Optional: Add loading state if there's any async operation related to favorites
// const isLoading = computed(() => giphyStore.loading.favorites); // Assuming you add loading state for favorites if needed

</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
