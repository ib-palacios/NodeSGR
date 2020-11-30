const { Router } =  require('express');
const RegistrationStatusController = Router();
const RegistrationStatus =  require('../models/registrationStatus');

RegistrationStatusController.get('/obtener', (req, res) => {
    
    RegistrationStatus.find().then(resp => {
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

RegistrationStatusController.post('/registrar', (req, res) => {
    const body = req.body;

    const registrationStatus = new RegistrationStatus({
        strStatus: body.strStatus
    });

    registrationStatus.save().then(resp => {
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

module.exports = RegistrationStatusController;