export const errorMsg = {
    PRODUCT: "No se pudo visualizar el producto. Por favor intentalo una vez más.",
    ITEMS: "No se pudo recuperar la lista de productos. Por favor intentalo una vez más."
};

// URLs para los ruteos a nivel cliente
export const clientURL = {
    PRODUCT: "/items/",
    ITEMS: "/items?search="
};

// URLs para las peticiones a la API server
export const apiURL = {
    PRODUCT: "/api/items/",
    ITEMS: "/api/items?q="
};