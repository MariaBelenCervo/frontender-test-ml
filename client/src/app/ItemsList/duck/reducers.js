import Type from './types';

const INITIAL_STATE = {
    isFetching: false,
    data: {},
    errorMsg: null
}

const itemsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Type.REQUEST_ITEMS: {
            // Activa el simbolo de que esta cargando datos
            return {...state, isFetching: true, data: {}, errorMsg: null};
        }
        case Type.SHOW_ITEMS: {
            // Muestra los datos, desactiva el cargando datos y el mensaje de error (si hubiera)
            return {...state, isFetching: false, data: action.payload, errorMsg: null};
        }
        case Type.ITEMS_FAILED: {
            // Carga un mensaje de error y vacia cualquier dato previo
            return {...state, isFetching: false, data: {}, errorMsg: action.payload};
        }
        default:
            return state;
    }
}

export default itemsReducer;