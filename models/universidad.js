const { Schema, model } = require('mongoose')

const UniversidadSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre requerido']
    },
    direccion: {
        type: String,
        required: [true, 'direccion requerida'],
        unique: [true]
    },
    teléfono: {
        type: String,
        required: [true, 'telfono requerido'],
        unique: [true]
    },
    fechaCreacion: {
        type: Date,
        default: new Date()
    },
    fechaActualizacion: {
        type: Date,
        default: new Date()
    }
})

module.exports = model('Universidad', UniversidadSchema)