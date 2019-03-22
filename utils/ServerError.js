/** 
 * Defino la clase ServerError, que extiende de Error, y agrega un field que
 * representa la respuesta (con statusCode de error) recibida por la API remota.
 */
module.exports = class ServerError extends Error {
    constructor(response = null, ...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }

        this.response = response;
    }

    get serverResponse() {
        return this.response;
    }
}