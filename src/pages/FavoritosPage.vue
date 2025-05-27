<template>
  <q-page class="p-4">
    <h1 class="text-2xl font-bold mb-4">Meus Favoritos</h1>

    <div v-if="favorites.length === 0" class="text-center text-gray-500 mt-8">
      Você ainda não adicionou nenhum GIF aos favoritos.
      <q-icon
        name="sentiment_dissatisfied"
        size="lg"
        class="block mx-auto mt-2"
      />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <GifCard v-for="gif in favorites" :key="gif.id" :gif="gif" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGiphyStore } from "stores/giphyStore";
import GifCard from "components/GifCard.vue";

const giphyStore = useGiphyStore();

// Propriedade computada para obter a lista de GIFs favoritos da store
const favorites = computed(() => giphyStore.favorites);
</script>

<style scoped></style>
