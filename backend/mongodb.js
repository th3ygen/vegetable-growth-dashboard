const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/plant_db', { useNewUrlParser: true });
    },
    disconnect: () => {
        mongoose.disconnect();
    }
}