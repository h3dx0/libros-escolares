let mongoose = require('mongoose');
let schema = mongoose.Schema;

let libroSchema = new Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true, default: 1 },
    imagePath: { type: String, required: false },
    categorias: { type: String, required: true },
    gradoEscolar:{ type: String, required: true },
    contacto:[
        { nombrePersona: { type: String } },
        { email: { type: String } },
        { telefono: { type: Number } },
    ]
});

module.exports = moongose.model('Libro', libroSchema);