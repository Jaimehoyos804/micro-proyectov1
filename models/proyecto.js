const { Schema, model} = require('mongoose')

const ProyectoSchema = Schema({
    numero : {
        type: String,
        required: [true, 'Número requerido'],
        unique: [true]
    },
    fechaInicio: {
        type: Date,
        default: new Date()
    },
    fechaEntrega: {
        type: Date,
        default: new Date()
    },
    valor : {
        type: String,
        unique: [true]
    },
    titulo : {
        type: String,
        unique: [true]
    },
        
    tipoProyecto : {
        type: Schema.Types.ObjectId,
        ref: 'TipoProyecto',
        required: true
    },
    cliente : {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        required: true
    },

    universidad : {
        type: Schema.Types.ObjectId,
        ref: 'Universidad',
        required: true
    },
    etapa : {
        type: Schema.Types.ObjectId,
        ref: 'Etapa',
        required: true
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

module.exports = model('Proyecto', ProyectoSchema)
