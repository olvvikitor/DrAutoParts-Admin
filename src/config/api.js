// src/config/api.js
export const API_URLS = {
    AUTH: {
        LOGIN: "/api/v1/admin/auth", // URL de autenticação
    },
    PRODUCT: {
        CREATE: "/api/v1/products/new",
        GET_ALL: "/api/v1/products/all",
        GET_BY_ID: "/api/v1/products/{id}",
        SEARCH: "/api/v1/products",
        UPDATE: "/api/v1/products/update/{id}",
    },
    CATEGORY: {
        CREATE: "/api/v1/category/new",
        GET_BY_ID: "/api/v1/category/{id}",
        UPDATE: "/api/v1/category/{id}",
        DELETE: "/api/v1/category/{id}",
        GET_BY_NAME: "/api/v1/category/{name}",
        GET_ALL: "/api/v1/category",
    },
    MODELO: {
        CREATE: "/api/v1/modelo/new",
        GET_ALL: "/api/v1/modelo",
        GET_BY_ID: "/api/v1/modelo/",
        UPDATE: "/api/v1/modelo/",
        DELETE: "/api/v1/modelo/",
        GET_BY_NAME: "/api/v1/modelo/name/",
    },
    FORNECEDOR: {
        CREATE: "/api/v1/fornecedor/new",
        GET_ALL: "/api/v1/fornecedor",
        GET_BY_ID: "/api/v1/fornecedor/",
        UPDATE: "/api/v1/fornecedor/",
        DELETE: "/api/v1/fornecedor/",
        GET_BY_NAME: "/api/v1/fornecedor/",
        GET_BY_CODE: "/api/v1/fornecedor/",
    },
    CART: {
        ADD_ITEM: "/api/v1/cartItem/add",
        GET_CONTENT: "/api/v1/cartItem/content",
    },
};

// URL base da API
export const BASE_URL = "https://dr-auto-parts-backend.onrender.com";