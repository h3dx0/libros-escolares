let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let libroSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    cantidad: {type: Number, required: true, default: 1},
    galeria: [
        { imagen1: {type: String, required: false} },
        { imagen2: {type: String, required: false} },
        { imagen3: {type: String, required: false} }
    ],
    categorias: {type: String, required: true},
    gradoEscolar: {type: String, required: true},
    contacto: {
        nombrePersona: {type: String},
        email: {type: String},
        telefono: {type: Number},
    }
});


module.exports = mongoose.model('Libro', libroSchema);