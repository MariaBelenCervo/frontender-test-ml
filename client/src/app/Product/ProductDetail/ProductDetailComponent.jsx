import React from 'react';
import './ProductDetail.scss';
import { formatPrice, capitalizeFirst } from '../../shared/js/utils';
import { toES } from '../../shared/js/lang';

const ProductDetail = ({product}) => {
    // separo parte entera y decimal
    const [integer, decimal] = Number.parseFloat(product.price.amount).toFixed(product.price.decimals).split('.');
    
    // Le agrego los separadores de miles a la parte entera
    const formattedPrice = formatPrice(integer);

    // Capitalizo la primera letra de la condicion del producto
    const cond = capitalizeFirst(toES[product.condition]);

    // Chequeo si se vendió exactamente uno o no, para agregarle el plural
    const plural = product.sold_quantity === 1 ? '' : 's';

    return (
        <>
        <div className="main-content">
            <figure className="image-content">
                <img src={product.picture} alt={product.title} />
            </figure>
            <div className="description">
                <h2>Descripción del producto</h2>
                <p>{product.description}</p>
            </div>
        </div>

        <div className="details">
            <dl>
                <div>
                    {cond} - {product.sold_quantity} vendido{plural}
                </div>
            </dl>
            <header>
                <h1>{product.title}</h1>
            </header>
            <p>{product.price.currency} {formattedPrice}<span className="decimal">{decimal}</span></p>
            <button>Comprar</button>
        </div>
        </>
    );
}

export default ProductDetail;