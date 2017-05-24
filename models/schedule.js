var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    origin: {
        type: String,
        required: false
    },
    destination: {
        type: String,
        required: false
    },
    //    place: { type: String, required: false },
    //    url: { type: String, required: false },
    //    type: { type: String, required: false }

});

var schedule = mongoose.model('schedule', scheduleSchema);

module.exports = schedule;
