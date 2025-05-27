<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden group relative">
    <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 group-hover:opacity-75">
      <img :src="gif.images.fixed_height.url" :alt="gif.title" class="h-full w-full object-cover object-center" />
    </div>
    <div class="p-2 absolute top-1 right-1">
       <q-btn
         round
         :icon="isFav ? 'favorite' : 'favorite_border'"
         :color="isFav ? 'red' : 'grey'"
         size="sm"
         @click.stop="toggleFavorite"
         class="opacity-70 group-hover:opacity-100 transition-opacity duration-200"
       >
         <q-tooltip>
           {{ isFav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos' }}
         </q-tooltip>
       </q-btn>
    </div>
     <div class="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 truncate">
        {{ gif.title || 'Sem título' }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGiphyStore } from 'stores/giphyStore';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const props = defineProps<{ gif: Gif }>();

const giphyStore = useGiphyStore();

const isFav = computed(() => giphyStore.isFavorite(props.gif.id));

const toggleFavorite = () => {
  if (isFav.value) {
    giphyStore.removeFavorite(props.gif.id);
  } else {
    giphyStore.addFavorite(props.gif);
  }
};
</script>

<style scoped>
.aspect-w-1 { position: relative; padding-bottom: 100%; }
.aspect-h-1 img { position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; }
</style>
