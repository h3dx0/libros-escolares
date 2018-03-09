let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let libroSchema = new Schema({
    titulo: {type: String, required: true},
    descripcion: {type: String, required: true},
    precio: {type: Number, required: true},
    cantidad: {type: Number, required: true, default: 1},
    imagenes: [{type: String, required: true}],
    asignatura: {type: String, required: true},
    gradoEscolar: {type: Number, required: true},
    contacto: {
        nombrePersona: {type: String},
        email: {type: String},
        telefono: {type: Number},
    }
});


module.exports = mongoose.model('Libro', libroSchema);