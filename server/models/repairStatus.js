const {Schema, model} = require('mongoose');

const repairStatusSchema = new Schema({
    strStatus: {
        type: String, 
        required: [true, 'Ingrese un nombre de status'],
        unique: true
   }
});

module.exports = model('RepairStatus', repairStatusSchema);