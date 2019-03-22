// Utilizo express y express.Router() para manejo de todas las rutas del API Server
const express = require('express');
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;

// Sirvo todo el contenido estático de la carpeta client/build
// que es donde se buildea la react app del cliente
app.use(express.static(path.join(__dirname, 'client/build')));

// Aca es donde se implementa todo el ruteo y lógica de la API
require('./routes')(app);

// Cualquier ruta desconocida sirve el index.html por default
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Pongo a escuchar el server en el port definido previamente
app.listen(port, () => console.log(`App is listening on port ${port}`));