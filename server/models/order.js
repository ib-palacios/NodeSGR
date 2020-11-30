const {Schema, model} = require('mongoose');
const { schema } = require('./admin');
const Customer = require('./customer');
const RegistrationStatus = require('./registrationStatus');
const RepairStatus = require('./repairStatus');
const RetirementStatus = require('./retirementStatus');


const orderSchema = new Schema({
    idCustomer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    idRegistrationStatus: {
        type: Schema.Types.ObjectId,
        ref: 'RegistrationStatus'
    },
    idRepairStatus: {
        type: Schema.Types.ObjectId,
        ref: 'RepairStatus'
    },
    idRetirementStatus: {
        type: Schema.Types.ObjectId,
        ref: 'RetirementStatus'
    },
    strDevice: {
        type: String, 
        required: [true, 'Ingrese el nombre de dispositivo'],
   },
   strModel: {
        type: String, 
        required: [true, 'Ingrese el modelo dispositivo'],
   },
   strImei: {
        type: String, 
        required: [true, 'Ingrese el numero IMEI'],
   },
   strColor: {
        type: String, 
        required: [true, 'Ingrese el color'],
   },
   dteDateOfAttention: {
        type: Date,
        required: [true, 'Ingrese la fecha de atención']
   },
   strAmountPayable: String,
   strStatusComment: String,
   strWorkToDo: String,
   strRetirementBy: String,
   dteRetirementDate: Date
},{
    timestamps: true
});

module.exports = model('Order', orderSchema);