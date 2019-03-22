import React, { Component } from 'react';
import { connect } from 'react-redux';
import ItemsList from './ItemsListComponent';
import { operations } from '.';
import { actions } from 'react-redux-form';
import { withRouter } from 'react-router-dom';


class ItemsListContainer extends Component {
    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search).get('search');
        
        if (query === null || query.trim() === '') {
            // Si el usuario desde la URL no ingresó un query o lo ingresó vacio, redirigo a /
            this.props.history.push('/');
        } else {
            // Copio en el input search lo mismo que ingresó el usuario, si es que lo hizo desde la URL
            this.props.updateSearchBox(query); 

            // Elimino espacios y todo tipo de acentuaciones, y paso a lowercase
            query = formatQuery(query);

            // Disparo el query al end-point de busqueda
            this.props.fetchItems(query); 
        }
    }

    componentDidUpdate (prevProps) {
        // Chequeo que el usuario siga dentro de /items
        if (this.props.location.pathname !== '/items') return;
        
        // Extraigo el query anterior y el actual
        let oldQuery = new URLSearchParams(prevProps.location.search).get('search');
        let newQuery = new URLSearchParams(this.props.location.search).get('search');

        // Actualizo la barra de busqueda con el nuevo query, si es que fue ingresado desde la URL
        if (newQuery !== null) {
            this.props.updateSearchBox(newQuery);
        }   

        // Elimino espacios y todo tipo de acentuaciones, y paso a lowercase
        oldQuery = formatQuery(oldQuery);
        newQuery = formatQuery(newQuery);

        // Si el query cambió y no es vacío, disparo otra búsqueda al end-point de la API.
        if (newQuery !== '' && newQuery !== oldQuery) {
            this.props.fetchItems(newQuery);
        }
    }

    // Renderizo el listado de acuerdo a los valores de state.items
    render() {
        const {isFetching, data, errorMsg} = this.props;
        return (
            <ItemsList isFetching={isFetching} data={data} errorMsg={errorMsg} />
        );
    }
}

/** 
 * Elimina los espacios en blanco al final y al principio, convierte a lowercase,
 * y elimina todo tipo de acentuación de las vocales
 */
const formatQuery = (query) => {
    return (query !== null) ? query
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "") 
        : '';
}

// Mapeo el estado state.items en propiedades para este componente
const mapStateToProps = (state) => {
    const { isFetching, data, errorMsg } = state.items;
    return {
        isFetching,
        data,
        errorMsg
    }
};

// Mapeo la operacion fetchItems en una propiedad de este componente
// También mapeo la action de react-redux-form para actualizar el valor del search
// input cuando el usuario ingresa el query desde la URL
const mapDispatchToProps = (dispatch) => {
    const fetchItems = (query) => {
        dispatch(operations.fetchItems(query));
    };

    const updateSearchBox = (value) => {
        dispatch(actions.change('search.input', value));
    }

    return { 
        fetchItems,
        updateSearchBox
    };
};

// Connecto este componente al store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ItemsListContainer));