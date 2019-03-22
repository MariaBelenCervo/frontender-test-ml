import Type from './types.js';

// Acción que se dispara cuando solicito detalles del producto a la API 
const requestDetail = () => ({
    type: Type.REQUEST_DETAIL
});

// Acción que se dispara cuando llega el detalle del producto de la API 
// y quiero mostrar el contenido (parametro pasado en el payload) 
const showDetail = (product) => ({
    type: Type.SHOW_DETAIL,
    payload: product
});

// Si hay algun error en el fetching de datos, se dispara esta accion,
// que recibe como parametro el mensaje de error  
const productDetailFailed = (errorMsg) => ({
    type: Type.PRODUCT_DETAIL_FAILED,
    payload: errorMsg
});

export default {
    requestDetail,
    showDetail,
    productDetailFailed
}