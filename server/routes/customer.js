const { Router } =  require('express');
const customerController = Router();
const Customer = require('../models/customer');


customerController.get('/obtener', (req, res) => {
    
    Customer.find().then(resp => {
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

customerController.get('/obtenerActivos/:idStatus', (req, res) => {
    let id = req.params.idStatus;

    Customer.find({ idRegistrationStatus: id }).then(resp => {
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

customerController.get('/obtenerPorId/:idCustomer', (req, res) => {
    let id = req.params.idCustomer;
    
    Customer.findById(id).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Registro consultado exitosamente',
            count: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'No se encontro el registro',
            err: err
        });
    });
});

customerController.post('/registrar', (req, res) => {
    const body = req.body;

    const customer = new Customer({
        idRegistrationStatus: body.idRegistrationStatus,
        strFullName: body.strFullName,
        strAddress: body.strAddress,
        strEmail: body.strEmail,
        strTelephone: body.strTelephone,
    });

    Customer.findOne( { 'strFullName': body.strFullName } ).then(resp => {
        if (resp){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'El cliente ya ha sido registrado',
                cnt: resp 
            });
        }
        customer.save().then(resespuesta => {
            if(resespuesta){
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    msg: 'Registro guardado exitosamente',
                    count: resespuesta.length,
                    cnt: resespuesta 
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
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error de servidor db",
            err: err
        });
    });
});

customerController.put('/actualizar/:idCustomer', (req, res) => {
    let id = req.params.idCustomer;
    let body = req.body;


    let customerObj = {
        strFullName: body.strFullName,
        strAddress: body.strAddress,
        strEmail: body.strEmail,
        strTelephone: body.strTelephone,
    }

    Customer.findOneAndUpdate({ _id: id }, { $set: customerObj }, { upsert: true } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: "Registro acutalizado exitosamente",
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al actualizar el registro',
            err: err
        });
    });
});

customerController.delete('/eliminar/:idCustomer/:idStatus', (req, res) => {
    let idC = req.params.idCustomer;
    let idS = req.params.idStatus;

    Customer.findByIdAndUpdate(idC, { idRegistrationStatus: idS } ).then(resp => {
        return res.status(200).json({
            ok: true,
            status: 200,
            msg: 'Se ha desactivado correctamente el cliente',
            cont: resp.length,
            cnt: resp
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: "Error al descativar el cliente",
            err: err
        });
    });
});

module.exports = customerController;