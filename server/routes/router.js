const express = require('express');
const route = express();
port = 3000

const services = require('../services/render');
const controller = require('../controller/controller');

route.use(controller.bodyParser.urlencoded({ extended: false }));

//API
route.post('/api/mahasiswa',controller.create);
route.get('/api/mahasiswa',controller.find);
route.put('/api/mahasiswa/:id',controller.update);
route.delete('/api/mahasiswa/:id',controller.delete);

route.listen(port, () => console.log(`This app is listening on port ${port}`));
