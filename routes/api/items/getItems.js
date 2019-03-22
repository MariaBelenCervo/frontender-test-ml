const fetchWithError = require('./fetchWithErrorHandling.js');
const JSONError = require('../../../utils/JSONError.js');
const sendError = require('../sendError.js');

/** 
 * Implementa toda la lógica de obtención de la lista de productos del server remoto 
 * @param res el objeto de respuesta que se enviará al cliente
 * @param req el objeto request con el query del cliente
 */
module.exports = (req, res, next) => {
    // Si el query contiene el parámetro q 
    if ('q' in req.query) {
        // Hago request a la API remota para obtener la lista de items
        fetchWithError(`https://api.mercadolibre.com/sites/MLA/search?q=${req.query.q}`)
            .then(response => response.json())
            .then(jsonResp => {
                // Si la respuesta llegó bien (con status code 200) y se parseó correctamente a JSON
                const data = formatResponse(jsonResp);
                
                // Ordeno los items de mayor a menor de acuerdo a la categoria que más se repite
                sortItemsByCategory(data);

                // Si tengo al menos un producto, hago fetch a la API remota, pasándole el ID
                // de la categoría que más se repite, para obtener todas las parent categories
                const fetchCategory = data.items.length === 0 ? null
                    : fetchWithError(`https://api.mercadolibre.com/categories/${data.items[0].category_id}`);

                // Simultáneamente, disparo un fetch por cada item para obtener el detalle de la
                // currency del item correspondiente                
                const fetchCurrencies = data.items.map(item =>
                    fetchWithError(`https://api.mercadolibre.com/currencies/${item.currency_id}`)
                );

                // Englobo todas las promesas en un Promise.all. De esa forma el siguiente then se 
                // ejecutará si todas las promesas se resolvieron correctamente.
                return Promise.all([data, fetchCategory, ...fetchCurrencies]);
            })
            .then(values => {
                const [data, ...rest] = values;

                // Los datos de los request anteriores llegaron bien, entonces los paso a JSON
                return rest[0] === null ? Promise.all(values)
                    : Promise.all([data, ...rest.map(r => r.json())]);
            })
            .then(values => {
                // En esta instancia ya obtuve todos los datos que necesito del remote Server
                const [data, category, ...currencies] = values;

                // Completo el array de categorías
                addAllCategories(data, category);

                // Agrego lo que faltaba en el campo price
                addCurrencies(data, currencies);

                // Envio la respuesta al cliente
                res.json(data);
            })
            // Si entró a este catch, es porque alguna respuesta del remote server llegó con 
            // statusCode de error u ocurrió algún otro error
            .catch(error => sendError(error, res));
    } else {
        // Si el query no tiene el parámetro q, entonce envío respuesta vacía
        const data = formatResponse({results: []});
        res.json(data);
    }
}

const formatResponse = (jsonResp) => {
    const response = {
        'author': {
            'name': 'María Belén',
            'lastname': 'Cervo'
        },
        'categories': [],
        'items': []
    }

    try {
        const results = jsonResp.results;

        for (let i = 0; i < Math.min(results.length, 4); i++) {
            let item = {
                id: results[i].id,
                title: results[i].title,
                currency_id: results[i].currency_id, // Se eliminará luego, cuando se envié la respuesta final
                category_id: results[i].category_id, // Se eliminará luego, cuando se envié la respuesta final
                price: {
                    currency: '', // A rellenar luego
                    amount: results[i].price,
                    decimals: 0 // A rellenar luego
                },
                picture: results[i].thumbnail,
                condition: results[i].condition,
                address: results[i].address.state_name,
                free_shipping: results[i].shipping.free_shipping
            }

            response.items.push(item);
        }
    } catch (e) {
        // Si hubo algún error de parseo lanzo custom Error
        throw new JSONError(e);
    }

    return response;
}

const sortItemsByCategory = data => {
    // Armo un custom sort con un comparador que ordena los items de mayor a menor en base
    // al número de ocurrencias de una categoría
    data.items.sort((a, b) =>
        data.items.filter(v => v.category_id === b.category_id).length
            - data.items.filter(v => v.category_id === a.category_id).length
    );
}

const addAllCategories = (data, category) => {
    try {
        if (category === null) return;

        category.path_from_root.forEach((category) => {
            data.categories.push(category.name);
        });
    } catch (e) {
        throw new JSONError(e);
    }
}

const addCurrencies = (data, currencies) => {
    try {
        currencies.forEach((currency, index) => {
            data.items[index].price.currency = currency.symbol;
            data.items[index].price.decimals = currency.decimal_places;
            delete data.items[index].currency_id; // Ya no necesito esta propiedad
            delete data.items[index].category_id; // Ya no necesito esta propiedad
        });
    } catch (e) {
        throw new JSONError(e);
    }
}