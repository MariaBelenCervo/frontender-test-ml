import React from 'react';
import './Loader.scss';

// Representa el componente que indica que se esta buscando datos del API server.
const LoaderComponent = () => {
    return (
        <div id="loader">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
        </div>
    );
}

export default LoaderComponent;