const { Router } =  require('express');
const repairStatusController = Router();
const RepairStatus = require('../models/repairStatus');

repairStatusController.get('/obtener', (req, res) => {
    
    RepairStatus.find().then(resp => {
        if(resp){
            return res.status(200).json({
                ok: true,
                status:200,
                msg: 'Datos consultados exitosamente',
                count: resp.length,
                cnt: resp
            });
        }
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al consultar los datos',
            cnt: err
        });
    });
});

repairStatusController.post('/registrar', (req, res) => {
    const body = req.body;

    const repairStatus = new RepairStatus({
        strStatus: body.strStatus
    });

    repairStatus.save().then(resp => {
        if(resp){
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: 'Registro guardado exitosamente',
                count: resp.length,
                cnt: resp 
            });
        }
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al registrar',
            err: err
        });
    });
});

module.exports = repairStatusController;