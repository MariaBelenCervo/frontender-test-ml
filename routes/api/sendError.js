const ServerError = require('../../utils/ServerError.js');
const JSONError = require('../../utils/JSONError.js');

/** 
 * Esta funcion envía un mensaje de error dependiendo del tipo de error que sea
 * (parseo de JSON, error del server remoto, o error general). Setea sobre el objeto
 * response pasado como parámetro un statusCode en el header, un status y errorMessage 
 * en el body y lo envia al cliente
 */
module.exports = (error, res) => {
    const body = {
        'errorMessage': '',
        'status': 0
    }

    if (error instanceof ServerError) {
        const response = error.serverResponse;

        // Si hay un error en el server remoto, forwardea ese error al cliente
        body.errorMessage = response.statusText;
        body.status = response.status;
    } else if (error instanceof JSONError) {
        // Si el error es de parseo de algún campo, envia error generico 500
        // y el correspondiente mensaje de error generado
        body.errorMessage = error.message;
        body.status = 500;
    } else {
        // Si no, es un error de comunicacion entre API server y server remoto.
        body.errorMessage = 'The service is unavailable';
        body.status = 503;
    }

    // Envio respuesta a cliente
    res.status(body.status).send(body);
};