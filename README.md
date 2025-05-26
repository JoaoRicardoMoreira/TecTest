# Desafio Técnico Front-End - Giphy App (SGBR® Sistemas)

Esta aplicação foi desenvolvida como parte do desafio técnico para a vaga de Programador Web Front-End na SGBR® Sistemas. O objetivo foi criar uma interface interativa para visualizar e gerenciar GIFs utilizando a API pública do GIPHY.

## Tecnologias Utilizadas

*   **Framework:** Quasar Framework v2
*   **Linguagem/View:** Vue.js v3 (Composition API com `<script setup>`)
*   **Roteamento:** Vue Router (integrado ao Quasar)
*   **Gerenciamento de Estado:** Pinia
*   **Requisições HTTP:** Axios
*   **Estilização:** Tailwind CSS
*   **Persistência Local:** LocalStorage (através do plugin Quasar Web Storage)
*   **API:** GIPHY API

## Pré-requisitos

*   Node.js (versão recomendada: ^18 || ^16 || ^14.19)
*   npm (versão recomendada: >= 6.13.4) ou yarn (versão recomendada: >= 1.21.1)

## Instalação

1.  **Clone o repositório:**
    ```bash
    # Se você recebeu o projeto como um arquivo .zip, descompacte-o primeiro.
    # Se for um repositório git:
    # git clone <url-do-repositorio>
    # cd <nome-da-pasta-do-projeto>
    ```

2.  **Instale as dependências:**
    Navegue até o diretório raiz do projeto e execute:
    ```bash
    npm install
    # ou
    yarn install
    ```

## Configuração

1.  **Chave da API GIPHY:**
    *   Crie uma conta no painel de desenvolvedores do GIPHY: [https://developers.giphy.com/](https://developers.giphy.com/)
    *   Gere uma chave de API (API Key).
    *   Na raiz do projeto, crie um arquivo chamado `.env`.
    *   Adicione a seguinte linha ao arquivo `.env`, substituindo `SUA_CHAVE_API_AQUI` pela chave que você gerou:
        ```
VITE_GIPHY_API_KEY=SUA_CHAVE_API_AQUI
        ```
    *   **Importante:** O prefixo `VITE_` é necessário para que a variável de ambiente seja exposta ao código do cliente pelo Vite (usado pelo Quasar CLI).

## Execução em Modo de Desenvolvimento

Para iniciar o servidor de desenvolvimento com hot-reload:

```bash
npm run dev
# ou
yarn dev
```

A aplicação estará disponível em `http://localhost:9000` (ou outra porta, se a 9000 estiver ocupada).

## Build para Produção

Para gerar os arquivos otimizados para produção:

```bash
npm run build
# ou
yarn build
```

Os arquivos da build estarão localizados na pasta `/dist/spa`.

## Estrutura do Projeto (Resumo)

*   `/src`: Contém o código-fonte da aplicação.
    *   `/boot`: Arquivos de inicialização do Quasar (Axios, etc.).
    *   `/components`: Componentes Vue reutilizáveis (ex: `GifCard.vue`).
    *   `/css`: Arquivos de estilo globais.
    *   `/layouts`: Layouts da aplicação (ex: `MainLayout.vue`).
    *   `/pages`: Componentes Vue que representam as páginas da aplicação.
    *   `/router`: Configuração do Vue Router.
    *   `/stores`: Stores do Pinia (ex: `giphyStore.ts`).
*   `/public`: Arquivos estáticos.
*   `quasar.config.js`: Arquivo de configuração principal do Quasar.
*   `.env`: Arquivo para variáveis de ambiente (não versionado).

## Considerações

*   O nome do desenvolvedor no Top Bar (`MainLayout.vue`) e na página Sobre (`SobrePage.vue`) deve ser substituído pelo nome real.
*   Um logo fictício foi utilizado. Pode ser substituído pelo logo real da SGBR, se disponível.
*   A aplicação utiliza o plugin `LocalStorage` do Quasar para persistir os GIFs favoritos.

