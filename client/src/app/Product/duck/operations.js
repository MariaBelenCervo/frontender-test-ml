import Action from './actions';
import { fetchWithErrors } from '../../shared/js/utils';
import { errorMsg, apiURL } from '../../shared/js/constants';

const { requestDetail, showDetail, productDetailFailed } = Action;

// Operación que representa la secuencia completa para buscar detalles del producto
const fetchProductDetail = (productId) => (dispatch) => {
    // Esto hace que el estado cambie para mostrar el cartel de carga
    dispatch(requestDetail());
    const query = apiURL.PRODUCT + productId;

    // Hago el resquest a la API server
    return fetchWithErrors(query)
        .then(response => response.json())
        .then(json => {
            // Si llego bien genero un action para mostrar la respuesta (pasada como parametro)
            dispatch(showDetail(json));
        })
        .catch(() => {
            // Si hay algun error, disparo la acción para mostrarlo (con el mensajje como parametro)
            dispatch(productDetailFailed(errorMsg.PRODUCT));
        });
};

export default {
    fetchProductDetail
}