<template>
  <q-page class="p-4">
    <q-btn
      flat
      icon="arrow_back"
      @click="$router.back()"
      label="Voltar para Categorias"
      class="mb-4"
    />
    <h1 class="text-2xl font-bold mb-4">
      GIFs da Categoria: {{ categoryNameDecoded }}
    </h1>

    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <q-spinner-dots color="primary" size="40px" />
    </div>

    <div
      v-if="!isLoading && categoryGifs.length === 0"
      class="text-center text-gray-500 mt-8"
    >
      Não foi possível carregar GIFs para esta categoria ou não há GIFs
      disponíveis.
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
    >
      <GifCard v-for="gif in categoryGifs" :key="gif.id" :gif="gif" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useGiphyStore } from "stores/giphyStore";
import GifCard from "components/GifCard.vue";

const giphyStore = useGiphyStore();
const route = useRoute();

const categoryName = computed(() => route.params.categoryName as string);
const categoryNameDecoded = computed(() =>
  decodeURIComponent(categoryName.value || ""),
);

// Busca GIFs pela categoria quando o componente é montado ou quando a categoria muda
onMounted(() => {
  if (categoryName.value) {
    giphyStore.fetchGifsByCategory(categoryNameDecoded.value);
  }
});

// Observa mudanças na categoria e busca GIFs correspondentes
watch(categoryName, (newCategoryName) => {
  if (newCategoryName) {
    giphyStore.fetchGifsByCategory(decodeURIComponent(newCategoryName));
  }
});

const categoryGifs = computed(() => giphyStore.categoryGifs);
const isLoading = computed(() => giphyStore.loading.categoryGifs);
</script>

<style scoped></style>
