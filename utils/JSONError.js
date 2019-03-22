/** 
 * Extiendo la clase Error para diferenciar errores generales de errores de parseo de JSON
 */
module.exports = class JSONError extends Error {
    constructor(...params) {
        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, JSONError);
        }
    }
}