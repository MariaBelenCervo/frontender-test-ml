import React, { Component } from 'react';
import Breadcrumb from './BreadcrumbComponent';
import { clientURL } from '../js/constants';

class BreadcrumbContainer extends Component {
    render() {
        // Renderizo el Breadcrumb con el texto correspondiente, el href hacia donde 
        // debe redirigir, y la clase active para saber cual es el activo.
        const values = this.props.data.map(v => {
            return {
                text: v,
                href: clientURL.ITEMS + v,
                active: false
            }
        });

        values[values.length - 1].active = true; // En este caso, el breadcrum activo siempre es el último

        return (
            <Breadcrumb values={values} />
        );
    }
}

export default BreadcrumbContainer;