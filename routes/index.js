let express = require('express');
let router = express.Router();
let Libro = require('../models/libro');
/* GET home page. */
router.get('/', function (req, res, next) {
    Libro.find()
        .then((libros) => {
            return res.render('index', {title: 'Express', libros: libros});
        })
        .catch((err) => {
            console.log("Error obteniendo los libros", err)
        });

});

/* GET vender libros. */
router.get('/vender-libro', function (req, res, next) {
    return res.render('vender_libro')
});

router.post('/vender-libro', function (req, res, next) {
    let msg = null;
    let libro = new Libro({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        categorias: req.body.categoria,
        gradoEscolar: req.body.gradoEscolar,
        contacto: {
            nombrePersona: req.body.nombrePersona,
            email: req.body.email,
            telefono: req.body.telefono,
        }
    });
    try {
        libro.save((err, doc) => {
            return res.render('vender_libro', {msg: msg});
        });
        msg = "Libro creado con éxito";
        console.log(msg)
    } catch (err) {
        console.log("Error al crear el libro", err);
    }
});

module.exports = router;
