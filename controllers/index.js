let express = require('express');
let Libro = require('../models/libro');

let buscarLibro = async (req, res) => {
    let titulo = req.body.titulo;
    let asignatura = req.body.asignatura;
    let gradoEscolar = req.body.gradoescolar;
    let query = {};

    if(titulo !== "") {
        query.titulo =titulo ;
    }
    if(asignatura !== "") {
        query.asignatura = asignatura;
    }

    if(gradoEscolar !== "-1") {
        query.gradoEscolar =  gradoEscolar ;
    }
    console.log(query)
    let libros = await Libro.find(query);
    console.log(libros, "Resultado de busqueda")
    return res.render('resultado_busqueda',
        {
            title: 'Express',
            libros: libros
        });

}

module.exports = {
    buscarLibro
};