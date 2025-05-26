<template>
  <q-page class="p-4">
    <!-- Search Bar -->
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

    <!-- Loading Indicator -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <!-- GIF Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <GifCard v-for="gif in gifsToDisplay" :key="gif.id" :gif="gif" />
    </div>

     <!-- No Results Message -->
    <div v-if="!isLoading && gifsToDisplay.length === 0 && searchQuery" class="text-center text-gray-500 mt-8">
        Nenhum GIF encontrado para "{{ searchQuery }}". Tente outra busca.
    </div>
     <div v-if="!isLoading && gifsToDisplay.length === 0 && !searchQuery" class="text-center text-gray-500 mt-8">
        Não foi possível carregar os GIFs populares. Verifique sua conexão ou a chave da API.
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGiphyStore } from 'stores/giphyStore';
import GifCard from 'components/GifCard.vue';

const giphyStore = useGiphyStore();
const searchQuery = ref('');

// Fetch trending GIFs when the component mounts
onMounted(() => {
  if (giphyStore.trending.length === 0) {
      giphyStore.fetchTrending();
  }
});

// Determine which GIFs to display (search results or trending)
const gifsToDisplay = computed(() => {
  return searchQuery.value ? giphyStore.searchResults : giphyStore.trending;
});

// Determine loading state based on search or trending fetch
const isLoading = computed(() => {
    return searchQuery.value ? giphyStore.loading.search : giphyStore.loading.trending;
});

// Handle search input changes
const handleSearch = (value: string | number | null) => {
  const query = typeof value === 'string' ? value : '';
  if (query) {
    giphyStore.searchGifs(query);
  } else {
    // Clear search results if query is empty, show trending
    giphyStore.searchResults = [];
    // Optionally re-fetch trending if needed, or just rely on cached data
    if (giphyStore.trending.length === 0) {
        giphyStore.fetchTrending();
    }
  }
};

</script>

<style scoped>
/* Add component-specific styles here if needed */
</style>
