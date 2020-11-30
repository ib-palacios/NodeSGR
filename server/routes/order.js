const { Router } =  require('express');
const orderController = Router();
const Order = require('../models/order');


orderController.get('/obtener', (req, res) => {
    
    Order.find().then(resp => {
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


orderController.get('/obtenerActivosC/:idStatus', (req, res) => {
    let id = req.params.idStatus;

    Order.find({ idRegistrationStatus: id }).populate([{path: 'idCustomer', select: 'strFullName'}, {path: 'idRepairStatus', select: 'strStatus'}, {path: 'idRetirementStatus', select: 'strStatus'} ]).then(resp => {
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

orderController.get('/obtenerActivosE/:idStatus/:idRepairS', (req, res) => {
    let idS = req.params.idStatus;
    let idR = req.params.idRepairS;

    Order.find({$and: [{ idRegistrationStatus: idS}, {idRepairStatus: idR }]}).populate([{path: 'idCustomer', select: 'strFullName'}, {path: 'idRepairStatus', select: 'strStatus'}]).then(resp => {
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

orderController.get('/obtenerActivosR/:idStatus/:idRetirementS', (req, res) => {
    let idS = req.params.idStatus;
    let idR = req.params.idRetirementS;

    Order.find({$and:[{idRegistrationStatus: idS}, {idRetirementStatus: idR}]}).populate([{path: 'idCustomer', select: 'strFullName'}, {path: 'idRepairStatus', select: 'strStatus'}, {path: 'idRetirementStatus', select: 'strStatus'}]).then(resp => {
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

orderController.get('/obtenerPorId/:idOrder', (req, res) => {
    let id = req.params.idOrder;
    
    Order.findById(id).then(resp => {
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

orderController.post('/registrarOrden', (req, res) => {
    const body = req.body;

    const order = new Order({
        idCustomer: body.idCustomer,
        idRegistrationStatus: body.idRegistrationStatus,
        idRepairStatus: body.idRepairStatus,
        idRetirementStatus: body.idRetirementStatus,
        strDevice: body.strDevice,
        strModel: body.strModel,
        strImei: body.strImei,
        strColor: body.strColor,
        strAmountPayable: body.strAmountPayable,
        strWorkToDo: body.strWorkToDo,
        strStatusComment: body.strStatusComment,
        strRetirementBy: body.strRetirementBy,
        dteDateOfAttention: body.dteDateOfAttention,
        dteRetirementDate: body.dteRetirementDate

    });

    order.save().then(resp => {
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


orderController.put('/actualizarOrden/:idOrder', (req, res) => {
    let id = req.params.idOrder;
    let body = req.body;

    let OrderObj = {
        idCustomer: body.idCustomer,
        idRegistrationStatus: body.idRegistrationStatus,
        idRepairStatus: body.idRepairStatus,
        idRetirementStatus: body.idRetirementStatus,
        strDevice: body.strDevice,
        strModel: body.strModel,
        strImei: body.strImei,
        strColor: body.strColor,
        strAmountPayable: body.strAmountPayable,
        strWorkToDo: body.strWorkToDo,
        strStatusComment: body.strStatusComment,
        strRetirementBy: body.strRetirementBy,
        dteDateOfAttention: body.dteDateOfAttention,
        dteRetirementDate: body.dteRetirementDate
    }

    Order.findOneAndUpdate({ _id: id }, { $set: OrderObj }, { upsert: true } ).then(resp => {
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

orderController.delete('/eliminar/:idOrder/:idStatus', (req, res) => {
    let idO = req.params.idOrder;
    let idS = req.params.idStatus;

    Order.findByIdAndUpdate(idO, {idRegistrationStatus: idS } ).then(resp => {
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

module.exports = orderController;