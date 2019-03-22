import React from 'react';
import Breadcrumb from '../shared/components/BreadcrumbContainer';
import Loader from '../shared/components/LoaderComponent';
import { Helmet } from "react-helmet";
import ProductDetail from './ProductDetail/ProductDetailComponent';
import './Product.scss';

const Product = ({ isFetching, data, errorMsg }) => {
    const { item } = data;

    if (isFetching) return <Loader />;
    if (errorMsg != null || item === undefined) return <div className="pill-message danger"><p>{errorMsg}</p></div>;

    // Si ya terminó de recuperar los datos y no hay mensaje de error, entonces muestro el producto y el breadcrumb
    return (
        <>
        <Helmet>
            <title>{data.item.title} en Mercado Libre Argentina</title>
            <meta name="description" content={"Compralo en Mercado Libre a $ " + data.item.price + "- Encontrá más productos de " + data.item.categories.join(', ')} />
            <meta name="keywords" content={data.item.title + " - " + data.item.categories.join(', ')} />
            <meta name="robots" content="archive" />
        </Helmet>

        <section id="related-categories">
            <Breadcrumb data={data.item.categories} />
        </section>
        <section id="product-detail">
            <ProductDetail product={data.item} />
        </section>
        </>
    );
}

export default Product;