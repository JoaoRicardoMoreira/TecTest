<template>
  <q-page class="p-4">
    <div class="mb-6">
      <q-input
        filled
        v-model="searchQuery"
        label="Buscar GIFs..."
        debounce="500"
        @update:model-value="handleSearch"
        clearable
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <GifCard v-for="gif in gifsToDisplay" :key="gif.id" :gif="gif" />
    </div>

    <div
      v-if="!isLoading && gifsToDisplay.length === 0 && searchQuery"
      class="text-center text-gray-500 mt-8"
    >
      Nenhum GIF encontrado para "{{ searchQuery }}". Tente outra busca.
    </div>
    <div
      v-if="!isLoading && gifsToDisplay.length === 0 && !searchQuery"
      class="text-center text-gray-500 mt-8"
    >
      Não foi possível carregar os GIFs populares. Verifique sua conexão ou a
      chave da API.
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useGiphyStore } from "stores/giphyStore";
import GifCard from "components/GifCard.vue";

const giphyStore = useGiphyStore();
const searchQuery = ref("");

// Busca os GIFs populares quando o componente é montado
onMounted(() => {
  if (giphyStore.trending.length === 0) {
    giphyStore.fetchTrending();
  }
});

// Computed property para determinar quais GIFs exibir
const gifsToDisplay = computed(() => {
  return searchQuery.value ? giphyStore.searchResults : giphyStore.trending;
});

// Computed property para verificar se os GIFs estão sendo carregados
const isLoading = computed(() => {
  return searchQuery.value
    ? giphyStore.loading.search
    : giphyStore.loading.trending;
});

// Função para lidar com a busca de GIFs
const handleSearch = (value: string | number | null) => {
  const query = typeof value === "string" ? value : "";
  if (query) {
    giphyStore.searchGifs(query);
  } else {
    giphyStore.searchResults = [];
    if (giphyStore.trending.length === 0) {
      giphyStore.fetchTrending();
    }
  }
};
</script>

<style scoped></style>
