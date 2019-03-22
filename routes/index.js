/** 
 * Dentro de la carpeta /api se define toda la lógica correspondiente al
 * end point que comienza en /api
 */
module.exports = function(app) {
    app.use('/api', require('./api'));
}