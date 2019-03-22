import Type from './types';

// Estado inicial: sin datos, sin carga de datos y sin mensaje de error.
const INITIAL_STATE = {
    isFetching: false,
    data: {},
    errorMsg: null
}

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Type.REQUEST_DETAIL: {
            // Activa el simbolo de que esta cargando datos
            return {...state, isFetching: true, data: {}, errorMsg: null};
        }
        case Type.SHOW_DETAIL: {
            // Muestra los datos, desactiva el cargando datos y el mensaje de error (si hubiera)
            return {...state, isFetching: false, data: action.payload, errorMsg: null};
        }
        case Type.PRODUCT_DETAIL_FAILED: {
            // Carga un mensaje de error y vacia cualquier dato previo
            return {...state, isFetching: false, data: {}, errorMsg: action.payload};
        }
        default:
            return state;
    }
}

export default productReducer;