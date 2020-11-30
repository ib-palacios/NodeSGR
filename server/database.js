const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://palacios:p161326@cluster0.ngnpn.mongodb.net/database_sgr?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(database =>{
    console.log('Base de datos conectada');
}).catch(err => {
    console.log(err);
});

