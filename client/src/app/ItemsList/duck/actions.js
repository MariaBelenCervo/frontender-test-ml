import Type from './types.js';

// Acción que se dispara cuando solicito listado a la API 
const requestItems = () => ({
    type: Type.REQUEST_ITEMS
});

// Acción que se dispara cuando llega el listado de la API 
// y quiero mostrar el contenido (parametro pasado en el payload) 
const showItems = (data) => ({
    type: Type.SHOW_ITEMS,
    payload: data
});

// Si hay algun error en el fetching de datos, se dispara esta accion,
// que recibe como parametro el mensaje de error  
const itemsRequestFailed = (errorMsg) => ({
    type: Type.ITEMS_FAILED,
    payload: errorMsg
});

export default {
    requestItems,
    showItems,
    itemsRequestFailed
}