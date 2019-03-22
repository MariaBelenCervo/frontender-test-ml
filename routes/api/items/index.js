const router = require('express').Router();

// Lógica para /api/items
router.route('/')
    .get(require('./getItems.js'));

// Lógica para /api/items/:id
router.route('/:id')
    .get(require('./getProduct.js'));

module.exports = router;