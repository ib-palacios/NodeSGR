const {Schema, model} = require('mongoose');

const adminSchema = new Schema({
    strUser: {
        type: String, 
        required: [true, 'Porfavor ingresa el nombre de el usuario'],
        unique: true
   },
   strPass: {
        type: String,
        required: [true, 'Ingrese la contraseña']
   }
},{
    timestamps: true
});

module.exports = model('Admin', adminSchema);