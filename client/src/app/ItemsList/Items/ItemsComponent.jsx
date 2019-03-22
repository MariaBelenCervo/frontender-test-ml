import React from 'react';
import { Link } from 'react-router-dom';
import './Items.scss';
import { formatPrice } from '../../shared/js/utils'
import { clientURL } from '../../shared/js/constants';

const Items = ({items}) => {
    const list = items.map((item, index) => {
        // separo parte entera
        const priceInt = Number.parseFloat(item.price.amount).toFixed(item.price.decimals).split('.')[0];
        
        // Le agrego los separadores de miles a la parte entera
        const formattedPrice = formatPrice(priceInt);

        return (
            <li key={index}>
                <div className="image-content">
                    <Link to={clientURL.PRODUCT + item.id}>
                        <img src={item.picture} alt={item.title} />
                    </Link>
                </div>
                <div className="item-info">
                    <div className="item-details">
                        <span className="price">{item.price.currency} {formattedPrice}</span>
                        <span className={'shipping ' + (item.free_shipping && 'active') }></span>
                        <h2>
                            <Link to={clientURL.PRODUCT + item.id}>{item.title}</Link>
                        </h2>
                    </div>
                    <div className="item-address">{item.address}</div>
                </div>
            </li>
        );
    });

    return (
        <ul id="items-list">
            {list}
        </ul>
    );
}

export default Items;