const fetch = require('node-fetch');
const ServerError = require('../../../utils/ServerError.js');

/** 
 * Wrapper alrededor de la función fetch que incorpora rechazar la promesa en caso de que 
 * el statusCode de la respuesta HTTP no esté en el rango de 200-299
 */
module.exports = (req) => fetch(req).then(handleErrors);

const handleErrors = (response) => {
    if (!response.ok) {
        // Si el status code no está en el rango 200-299, lanzo error con la respuesta del server
        throw new ServerError(response);
    }

    return response;
}