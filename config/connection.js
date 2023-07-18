const mongoose = require('mongoose');

// connecting to mongoDB and create a db called week18Mongoose
mongoose.connect('mongodb://127.0.0.1/week18Mongoose')
  .then(() => {
    console.log('Mongoose Mongoose!! I am connected to the DB!!!');
  })
  .catch(error => console.log(error));


module.exports = mongoose.connection