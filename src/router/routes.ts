import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomePage.vue'), name: 'Home' },
      { path: 'favoritos', component: () => import('pages/FavoritosPage.vue'), name: 'Favoritos' },
      { path: 'categorias', component: () => import('pages/CategoriasPage.vue'), name: 'Categorias' },
      { path: 'sobre', component: () => import('pages/SobrePage.vue'), name: 'Sobre' },
    
      { path: 'categoria/:categoryName', component: () => import('pages/CategoriaGifsPage.vue'), name: 'CategoriaGifs', props: true },
    ],
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

