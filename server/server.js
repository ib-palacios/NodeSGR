const express = require('express');
const app = express();
const cors = require('cors');

port = process.env.PORT || 3000;

require('./database');

app.use(cors());
app.use(express.json());

app.use('/api/admin', require('./routes/admin'));
app.use('/api/customer', require('./routes/customer'));
app.use('/api/order', require('./routes/order'));
app.use('/api/registrationStatus', require('./routes/registrationStatus'));
app.use('/api/repairStatus', require('./routes/repairStatus'));
app.use('/api/retirementStatus', require('./routes/retirementStatus'));



app.listen(port, ()=> {
    console.log('servidor en puerto ', port)
});