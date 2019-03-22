import fetch from 'cross-fetch';

/** 
 * Dado un entero le agrego los separadores de miles 
 */
export const formatPrice = price => {
    let pattern = /(-?\d+)(\d{3})/;

    price = price.toString();
    while (pattern.test(price))
        price = price.replace(pattern, "$1.$2");

    return price;
};

/** 
 * Wrapper alrededor de la función fetch que incorpora rechazar la promesa en caso de que 
 * el statusCode de la respuesta HTTP no esté en el rango de 200-299
 */
export const fetchWithErrors = (req) => fetch(req).then(handleErrors);

const handleErrors = (response) => {
    if (!response.ok) {
        // Si el status code no está en el rango 200-299, lanzo error con la respuesta del server
        throw new Error(response);
    }

    return response;
}

/** 
 * Capitaliza la primera letra de un string
 */
export const capitalizeFirst = str => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}