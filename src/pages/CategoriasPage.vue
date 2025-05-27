<template>
  <q-page class="p-4">
    <h1 class="text-2xl font-bold mb-4">Categorias de GIFs</h1>

  
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <q-spinner-dots color="primary" size="40px" />
    </div>

   
    <div v-if="!isLoading && categories.length === 0" class="text-center text-gray-500 mt-8">
      Não foi possível carregar as categorias. Verifique sua conexão ou a chave da API.
    </div>

   
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <q-card
        v-for="category in categories"
        :key="category.name_encoded"
        class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
        @click="goToCategoryGifs(category.name_encoded)"
      >
        <q-card-section class="text-center">
          <div class="text-lg font-semibold">{{ category.name }}</div>
         
        </q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useGiphyStore } from 'stores/giphyStore';

const giphyStore = useGiphyStore();
const router = useRouter();


onMounted(() => {
  if (giphyStore.categories.length === 0) {
    giphyStore.fetchCategories();
  }
});


const categories = computed(() => giphyStore.categories);
const isLoading = computed(() => giphyStore.loading.categories);


const goToCategoryGifs = (categoryNameEncoded: string) => {
  router.push({ name: 'CategoriaGifs', params: { categoryName: categoryNameEncoded } });
};

</script>

<style scoped>

</style>
