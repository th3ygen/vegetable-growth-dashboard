const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        mongoose.Promise = global.Promise;
        mongoose.connect('mongodb://localhost:27017/justgood', { useNewUrlParser: true });
    },
    disconnect: () => {
        mongoose.disconnect();
    }
}