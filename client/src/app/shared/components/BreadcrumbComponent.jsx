import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumb.scss';

const BreadcrumbComponent = ({values}) => {
    const list = values.map((v, i) => {
        return (
            <li className={v.active ? "active" : undefined} key={i}>
                <Link to={v.href}>{v.text}</Link>
            </li>
        );
    });

    return (
        <nav aria-label="Breadcrumb" id="breadcrumb">
            <ol>
                {list}
            </ol>
        </nav>
    );
}

export default BreadcrumbComponent;