import Action from './actions';
import { fetchWithErrors } from '../../shared/js/utils';
import { apiURL, errorMsg } from '../../shared/js/constants';

const { requestItems, showItems, itemsRequestFailed } = Action;

// Operación que representa la secuencia completa para buscar el listado
const fetchItems = (searchQuery) => (dispatch) => {
    // Esto hace que el estado cambie para mostrar el cartel de carga
    dispatch(requestItems());
    const query = apiURL.ITEMS + searchQuery;

    // Hago el resquest a la API server
    return fetchWithErrors(query)
        .then(response => response.json())
        .then(json => {
            // Si llego bien genero un action para mostrar la respuesta (pasada como parametro)
            dispatch(showItems(json));
        })
        .catch(() => {
            // Si hay algun error, disparo la acción para mostrarlo (con el mensajje como parametro)
            dispatch(itemsRequestFailed(errorMsg.ITEMS));
        });
};

export default {
    fetchItems
}