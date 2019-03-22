import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from './SearchBarComponent';
import { withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';

class SearchBarContainer extends Component {
    // Cuando se monta o se cambia de vista, se resetea el search
    componentDidUpdate() {
        this.props.resetSearch();
    }

    handleSubmit(data) {
        if (data.input === '') {
            return;
        }
        const url = `/items?search=${data.input}`;

        // Actualizo la URL con el query de busqueda que ingreso el usuario
        this.props.history.push(url);
    }

    render() {
        return (
            <SearchBar onSubmit={data => this.handleSubmit(data)} />
        );
    }
}

// Mapeo la action de reseteo del form (dada por react-redux-form)
// a propiedad en este componente
const mapDispatchToProps = (dispatch) => {
    const resetSearch = () => {
        dispatch(actions.reset('search'));
    };

    return { 
        resetSearch
    };
};

export default withRouter(connect(null, mapDispatchToProps)(SearchBarContainer));