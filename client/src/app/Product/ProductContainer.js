import React, { Component } from 'react';
import { connect } from 'react-redux';
import Product from './ProductComponent';
import { operations } from '.';

class ProductContainer extends Component {
    componentDidMount() {
        // Cuando se monta el componente, disparo un request a la API
        // de producto para recuperar los datos del mismo de acuerdo a su ID
        this.props.fetchProduct(this.props.productId);
    }

    // Renderizo el detalle del producto de acuerdo a los valores de state.product
    render() {
        const { isFetching, data, errorMsg } = this.props;
        return (
            <>
            <Product isFetching={isFetching} data={data} errorMsg={errorMsg} />
            </>
        );
    }
}

// Mapeo el estado state.product en propiedades para este componente
const mapStateToProps = (state) => {
    const { isFetching, data, errorMsg } = state.product;
    return {
        isFetching,
        data,
        errorMsg
    }
};

// Mapeo la operacion fetchProductDetail en una propiedad de este componente
const mapDispatchToProps = (dispatch) => {
    const fetchProduct = (id) => {
        dispatch(operations.fetchProductDetail(id));
    };

    return { fetchProduct };
};

// Connecto este componente al store
export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);