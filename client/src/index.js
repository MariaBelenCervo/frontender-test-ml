import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import App from './app/App';
import rootReducer from './reducers';
import './index.scss';
import * as serviceWorker from './serviceWorker';

// Utilizo el thunk middleware para manejar la interacción entre las actions y el store, 
// incluyendo side effects tales como peticiones AJAX.
let middlewares = [thunk];

// En development incluyo el middleware redux-logger para mostrar en consola las actions de redux
if (process.env.NODE_ENV === 'development') {
    const logger = require('redux-logger').logger;
    middlewares = [...middlewares, logger];
}

const middleware = applyMiddleware(...middlewares);

// Creo el store pasandole el reducer principal (que unifica todos los reducers individuales)
// y todos los middlewares a utilizar
const store = createStore(rootReducer, middleware);

const rootElement = document.getElementById("root");

// Renderizo el componente principal, englobandolo en un Provider para pasarle el store
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, rootElement
);

serviceWorker.unregister();