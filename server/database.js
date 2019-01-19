const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.connectionString,{ useNewUrlParser: true, useCreateIndex: true })
  .then(db => console.log('Conectado a MongoDB!'))
  .catch(err => {
    console.log(err);
    process.exit();
  });
module.exports = mongoose;