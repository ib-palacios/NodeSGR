const {Schema, model} = require('mongoose');
const RegistrationStatus = require('./registrationStatus');

const customerSchema = new Schema({
    idRegistrationStatus: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrationStatus',
    },
    strFullName: {
        type: String, 
        required: [true, 'Ingrese el nombre de cliente'],
        unique: true
   },

   strAddress: {
        type: String,
        required: [true, 'Ingrese la dirección del cliente']
    }, 

    strEmail: {
        type: String,
        required: [true, 'Ingrese el correo electronico']
    },

    strTelephone: {
        type: String,
        required: [true, 'Ingrese el número de telefono']
    }
},{
    timestamps: true
}
);

module.exports = model('Customer', customerSchema);