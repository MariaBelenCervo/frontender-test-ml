const fetchWithError = require('./fetchWithErrorHandling.js');
const JSONError = require('../../../utils/JSONError.js');
const sendError = require('../sendError.js');

/** 
 * Implementa toda la lógica de obtención del detalle del producto del server remoto 
 * @param res el objeto de respuesta que se enviará al cliente
 * @param req el objeto request con el query del cliente
 */
module.exports = (req, res, next) => {
    // Simultáneamente, hago 2 requests al server remoto para obtener detalles del producto y descripción
    const product = fetchWithError(`https://api.mercadolibre.com/items/${req.params.id}`);
    const productDesc = fetchWithError(`https://api.mercadolibre.com/items/${req.params.id}/description`);

    // Englobo ambas promesas en una sola, que se resolverá cuando ambas se resuelvan
    Promise.all([product, productDesc])
        .then(responses => {
            // Ambos requests llegaron bien
            const [product , productDesc] = responses;

            // Los datos de los request anteriores llegaron bien, entonces los paso a JSON
            return Promise.all([product.json(), productDesc.json()]);
        })
        .then(jsonResponses => {
            const [product , productDesc] = jsonResponses;

            // En base a la información del producto, formateo la respuesta al cliente 
            const data = formatResponse(product);
            
            // Le agrego la descripción obtenida
            data.item.description = productDesc.plain_text;

            // Simultáneamente, hago 2 requests al server remoto para obtener detalles de la currency y categoría
            const currency = fetchWithError(`https://api.mercadolibre.com/currencies/${data.item.currency_id}`)
            const category = fetchWithError(`https://api.mercadolibre.com/categories/${product.category_id}`)

            return Promise.all([data, currency, category]);
        })
        .then(values => {
            const [data , currency, category] = values;

            // Los datos de los request anteriores llegaron bien, entonces los paso a JSON
            return Promise.all([data, currency.json(), category.json()]);
        })
        .then(values => {
            // En esta instancia ya obtuve todos los datos que necesito del remote Server
            const [data, currency, category] = values;

            // Completo el array de categorías
            addAllCategories(data, category);

            // Agrego lo que faltaba en el campo price
            addCurrency(data, currency);
    
            // Envio la respuesta al cliente
            res.json(data);
        })
        // Si entró a este catch, es porque alguna respuesta del remote server llegó con 
        // statusCode de error u ocurrió algún otro error
        .catch(error => sendError(error, res));
}

const formatResponse = (jsonResp) => {
    let response;

    try {
        response = {
            'author': {
                'name': 'María Belén',
                'lastname': 'Cervo'
            },
            'item': {
                id: jsonResp.id,
                title: jsonResp.title,
                currency_id: jsonResp.currency_id, // Se eliminará luego, cuando se envié la respuesta final
                price: {
                    currency: '', // A rellenar luego
                    amount: jsonResp.price,
                    decimals: 0 // A rellenar luego
                },
                picture: jsonResp.pictures[0].url, // Para mostrar el detalle, uso la primera imagen de todas las disponibles 
                condition: jsonResp.condition,
                free_shipping: jsonResp.shipping.free_shipping,
                sold_quantity: jsonResp.sold_quantity,
                description: '', // A rellenar luego
                categories: [] // A rellenar luego
            }
        }
    } catch (e) {
        throw new JSONError(e);
    }

    return response;
}

const addAllCategories = (data, category) => {
    try {
        category.path_from_root.forEach((category) => {
            data.item.categories.push(category.name);
        });
    } catch (e) {
        throw new JSONError(e);
    }
}

const addCurrency = (data, currency) => {
    try {
        data.item.price.currency = currency.symbol;
        data.item.price.decimals = currency.decimal_places;
        delete data.item.currency_id; // Ya no necesito esta propiedad
    } catch (e) {
        throw new JSONError(e);
    }
}