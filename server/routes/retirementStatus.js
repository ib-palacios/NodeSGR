const { Router } =  require('express');
const retirementStatusController = Router();
const RetirementStatus = require('../models/retirementStatus');


retirementStatusController.get('/obtener', (req, res) => {
    
    RetirementStatus.find().then(resp => {
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

retirementStatusController.post('/registrar', (req, res) => {
    const body = req.body;

    const retirementStatus = new RetirementStatus({
        strStatus: body.strStatus
    });

    retirementStatus.save().then(resp => {
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

module.exports = retirementStatusController;