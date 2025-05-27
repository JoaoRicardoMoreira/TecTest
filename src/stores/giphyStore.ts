import { defineStore } from "pinia";
import { api } from "boot/axios"; // Use the configured Axios instance
import { LocalStorage, Notify } from "quasar";

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
    original: {
      url: string;
    };
  };
}

interface Category {
  name: string;
  name_encoded: string;
  subcategories: Category[];
}

interface GiphyState {
  apiKey: string;
  trending: Gif[];
  searchResults: Gif[];
  favorites: Gif[];
  categories: Category[];
  categoryGifs: Gif[];
  loading: {
    trending: boolean;
    search: boolean;
    categories: boolean;
    categoryGifs: boolean;
  };
}

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

export const useGiphyStore = defineStore("giphy", {
  state: (): GiphyState => ({
    apiKey: GIPHY_API_KEY || "",
    trending: [],
    searchResults: [],
    favorites: LocalStorage.getItem("giphyFavorites") || [],
    categories: [],
    categoryGifs: [],
    loading: {
      trending: false,
      search: false,
      categories: false,
      categoryGifs: false,
    },
  }),

  actions: {
    async fetchTrending() {
      if (!this.apiKey) {
        Notify.create({
          type: "negative",
          message: "Chave da API GIPHY não configurada.",
        });
        return;
      }
      this.loading.trending = true;
      try {
        const response = await api.get("/gifs/trending", {
          params: {
            api_key: this.apiKey,
            limit: 24,
            rating: "g",
          },
        });
        this.trending = response.data.data;
      } catch (error) {
        console.error("Erro ao buscar trending GIFs:", error);
        Notify.create({
          type: "negative",
          message: "Falha ao buscar trending GIFs.",
        });
      } finally {
        this.loading.trending = false;
      }
    },

    async searchGifs(query: string) {
      if (!this.apiKey) {
        Notify.create({
          type: "negative",
          message: "Chave da API GIPHY não configurada.",
        });
        return;
      }
      if (!query) {
        this.searchResults = [];
        return;
      }
      this.loading.search = true;
      try {
        const response = await api.get("/gifs/search", {
          params: {
            api_key: this.apiKey,
            q: query,
            limit: 24,
            rating: "g",
          },
        });
        this.searchResults = response.data.data;
      } catch (error) {
        console.error("Erro ao buscar GIFs:", error);
        Notify.create({ type: "negative", message: "Falha ao buscar GIFs." });
      } finally {
        this.loading.search = false;
      }
    },

    async fetchCategories() {
      if (!this.apiKey) {
        Notify.create({
          type: "negative",
          message: "Chave da API GIPHY não configurada.",
        });
        return;
      }
      this.loading.categories = true;
      try {
        const response = await api.get("/gifs/categories", {
          params: {
            api_key: this.apiKey,
          },
        });

        this.categories = response.data.data.filter(
          (cat: Category) => cat.name !== "actions",
        );
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
        Notify.create({
          type: "negative",
          message: "Falha ao buscar categorias.",
        });
      } finally {
        this.loading.categories = false;
      }
    },

    async fetchGifsByCategory(categoryName: string) {
      if (!this.apiKey) {
        Notify.create({
          type: "negative",
          message: "Chave da API GIPHY não configurada.",
        });
        return;
      }
      this.loading.categoryGifs = true;
      try {
        const response = await api.get("/gifs/search", {
          params: {
            api_key: this.apiKey,
            q: categoryName,
            limit: 24,
            rating: "g",
          },
        });
        this.categoryGifs = response.data.data;
      } catch (error) {
        console.error(
          `Erro ao buscar GIFs para a categoria ${categoryName}:`,
          error,
        );
        Notify.create({
          type: "negative",
          message: `Falha ao buscar GIFs para ${categoryName}.`,
        });
      } finally {
        this.loading.categoryGifs = false;
      }
    },

    addFavorite(gif: Gif) {
      if (!this.isFavorite(gif.id)) {
        this.favorites.push(gif);
        LocalStorage.set("giphyFavorites", this.favorites);
        Notify.create({
          type: "positive",
          message: "GIF adicionado aos favoritos!",
        });
      }
    },

    removeFavorite(gifId: string) {
      this.favorites = this.favorites.filter((fav) => fav.id !== gifId);
      LocalStorage.set("giphyFavorites", this.favorites);
      Notify.create({ type: "info", message: "GIF removido dos favoritos." });
    },

    isFavorite(gifId: string): boolean {
      return this.favorites.some((fav) => fav.id === gifId);
    },
  },
});
