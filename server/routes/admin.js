const { Router } =  require('express');
const adminController = Router();
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Secret_Key = 'secret_key_shr';
const saltRounds = 12;


adminController.get('/obtener', (req, res)=> {
    Admin.find().then(resp => {
        if (resp){
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

adminController.post('/registrar', (req, res) => {
    const bodyPass = req.body;
    const hash = bcrypt.hashSync(bodyPass.strPass, saltRounds);

    const admin = new Admin({
        strUser: bodyPass.strUser,
        strPass: hash
    });


    Admin.findOne( { 'strUser': bodyPass.strUser } ).then(resp => {
        if (resp){
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Admin ya ha sido registrado',
                cnt: resp 
            });
        }
        const accessToken = jwt.sign( {_id: admin._id}, Secret_Key);
        admin.save().then(data => {
            return res.status(200).json({
                ok: true,
                status: 200,
                msg: "Admin registrado exitosamente",
                cont: data.length,
                cnt: data,
                token: accessToken
            });
        }).catch(err =>{
            return res.status(400).json({
                ok: false,
                status: 400,
                msg: 'Error al registrar el admin',
                err: err
            });
        });
    }).catch(err => {
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Usuario no encotrado',
            err: err
        });
    });
});

////////////////////////////////
////////////////////////////////
adminController.post('/iniciarSesion', (req, res) => {
    const body = req.body;

    const userData = {
        user: body.strUser,
        pass: body.strPass
    }

    Admin.findOne({strUser: userData.user} ).then(resp => {
        if(resp){
            const resultPassword = bcrypt.compareSync(userData.pass, resp.strPass);
            if(resultPassword){
                const accessToken = jwt.sign({_id: resp._id}, Secret_Key)
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    msg: "Inicio de sesión correcto",
                    cont: resp.length,
                    cnt: resp,
                    token: accessToken
                });
            }else{
                return res.status(400).json({
                    ok: false,
                    status: 400,
                    msg: "Usuraio o Contraseña incorrectos",
                    err: 'Error'
                });
            }
        }
    }).catch(err =>{
        return res.status(400).json({
            ok: false,
            status: 400,
            msg: 'Error al iniciar sesión',
            err: err
        });
    });
});


module.exports = adminController;