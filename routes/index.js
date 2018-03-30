let express = require('express');
let router = express.Router();
let cloudinary = require('cloudinary').v2;
let Libro = require('../models/libro');
let mainController = require('../controllers/index');
let multer = require('multer');
let upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function (req, res, next) {

    Libro.find()
        .then((libros) => {
            return res.render('index',
                {
                    title: 'Express',
                    libros: libros
                });
        })
        .catch((err) => {
            console.log("Error obteniendo los libros", err)
        });

});

/* GET vender libros. */
router.get('/vender-libro', function (req, res, next) {
    return res.render('vender_libro')
});

router.post('/vender-libro', upload.array('imagen', 3), async function (req, res, next) {
    let msg = null;
    let imagenes = req.files;
    let imagenesPublic = [];
    for (let i = 0; i < imagenes.length; i++) {
        let result = await cloudinary.uploader.upload(imagenes[i].path);
        imagenesPublic.push(result.public_id)
    }

    let libro = await new Libro({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        cantidad: req.body.cantidad,
        asignatura: req.body.asignatura,
        gradoEscolar: req.body.gradoEscolar,
        imagenes: imagenesPublic,
        contacto: {
            nombrePersona: req.body.nombrePersona,
            email: req.body.email,
            telefono: req.body.telefono,
        }
    });

    await libro.save((err, doc) => {
        if (err) {
            console.log("Error al insertar libro", err);
            return;
        }
        msg = "Libro creado con éxito";
        return res.render('vender_libro', {msg: msg});
    });


});

/* GET vender libros. */
router.get('/detalle-libro/:id', function (req, res, next) {
    const idLibro = req.params.id;
    Libro.findOne({_id: idLibro})
        .then((libro) => {
            console.log(libro);
            return res.render('detalle_libro', {libro: libro});
        })
        .catch((error) => {
            console.log('No se encontró el libro', error);
            return res.render('detalle_libro', {libro: null});

        })
});

router.post('/buscar-libro', mainController.buscarLibro);

module.exports = router;
