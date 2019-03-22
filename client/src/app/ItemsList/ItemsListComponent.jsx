import React from 'react';
import Breadcrumb from '../shared/components/BreadcrumbContainer';
import Loader from '../shared/components/LoaderComponent';
import Items from './Items/ItemsComponent';
import { Helmet } from "react-helmet";
import './ItemsList.scss';

const ItemsList = ({ isFetching, data, errorMsg }) => {
    const { items } = data;

    if (isFetching) return <Loader />;
    if (errorMsg != null) return <div className="pill-message danger"><p>{errorMsg}</p></div>;
    if (items !== undefined) {
        if (items.length === 0) {
            return (
                <div className="pill-message info">
                    <p className="pill-title">No hay resultados para la búsqueda</p>
                    <p>Podés probar revisando la ortografía o buscando palabras más genéricas</p>
                </div>
            );
        } else {
            const category = data.categories[data.categories.length - 1];
            return (
                <>
                <Helmet>
                    <title>{category} en Mercado Libre Argentina</title>
                    <meta name="description" content="¡Una increíble cantidad de opciones para vos! Descubrí la mejor forma de comprar online." />
                    <meta name="keywords" content=" Envío Gratis. Tiendas Oficiales. Ofertas Exclusivas. Cuotas sin Interes. Garantía." />
                    <meta name="robots" content="archive" />
                </Helmet>
                <section id="related-categories">
                    <Breadcrumb data={data.categories} />
                </section>
                <section id="results">
                    <Items items={data.items} />
                </section>
                </>
            );
        }
    }

    return null;
}

export default ItemsList;