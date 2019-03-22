import React from 'react';
import { Helmet } from "react-helmet";
import './Home.scss';

const Home = () => {
    return (
        <div id="home-page">
            <Helmet>
                <title>Mercado Libre Argentina</title>
                <meta name="description" content="Todo lo que buscás al mejor precio en Mercado Libre, la comunidad de compra y venta online más grande de América Latina." />
                <meta name="keywords" content="Televisores, Celulares, Deportes, Smartphones, Electrodomésticos, Moda, Computación, Hogar, Jardín, Autos, Motos, Inmuebles." />
                <meta name="robots" content="archive" />
            </Helmet>
            <div className="pill-message info">
                <h2>¡Bienvenido a Mercado Libre!</h2>
                <p>Ingresá en el buscador lo que querés encontrar y descubrí la mejor forma de comprar online.</p>
            </div>
        </div>
    );
}

export default Home;