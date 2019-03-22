/** 
 * Dentro de la carpeta /api/items se define toda la lógica correspondiente al
 * end point que comienza en /api/items
 */
const router = require('express').Router();

router.use('/items', require('./items'));

module.exports = router;