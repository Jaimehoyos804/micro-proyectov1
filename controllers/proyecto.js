const Proyecto = require('../models/proyecto')
const { request, response } = require('express')

const TipoProyecto = require('../models/tipoProyecto')
const Cliente = require('../models/cliente')
const Universidad = require('../models/universidad')
const Etapa = require('../models/etapa')

// crear
const createProyecto = async (req = request,
     res = response) => {
    try {
        const data = req.body;
        const { tipoProyecto, cliente, universidad, etapa } = data;

        const tipoProyectoDB = await TipoProyecto.findById(tipoProyecto);
        if (!tipoProyectoDB) {
            return res.status(400).json({ msg: 'Tipo de proyecto inválido' });
        }

        const clienteDB = await Cliente.findById(cliente);
        if (!clienteDB) {
            return res.status(400).json({ msg: 'Cliente inválido' });
        }

        const universidadDB = await Universidad.findById(universidad);
        if (!universidadDB) {
            return res.status(400).json({ msg: 'Universidad inválida' });
        }

        const etapaDB = await Etapa.findById(etapa);
        if (!etapaDB) {
            return res.status(400).json({ msg: 'Etapa inválida' });
        }

        const proyecto = new Proyecto(data);
        await proyecto.save();

        return res.status(201).json(proyecto);

    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}

//Listar Proyectos
const getProyectos = async (req = request, 
    res = response) => {
    try {
        const proyectosDB = await Proyecto.find()
            .populate('tipoProyecto', 'nombre')
            .populate('cliente', 'nombre')
            .populate('universidad', 'nombre')
            .populate('etapa', 'nombre');
        return res.json(proyectosDB);
    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}

// actualizar 
const updateProyectoByID = async (req = request, 
    res = response) => {
    try {
        const { id } = req.params;
        const data = req.body;
        data.fechaActualizacion = new Date();
        const proyecto = await Proyecto.findByIdAndUpdate(id, data, { new: true });
        if (!proyecto) {
            return res.status(404).json({ msg: 'Proyecto no encontrado' });
        }
        return res.json(proyecto);
    } catch (e) {
        return res.status(500).json({ msg: 'Error general ' + e });
    }
}


module.exports = {
    createProyecto,
    getProyectos,
    updateProyectoByID
}