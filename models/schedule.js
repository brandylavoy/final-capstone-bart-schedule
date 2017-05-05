var mongoose = require('mongoose');

var scheduleSchema = new mongoose.Schema({
    name: { type: String, required: false },
//    date: { type: String, required: false },
//    place: { type: String, required: false },
//    url: { type: String, required: false },
//    type: { type: String, required: false }

});

var schedule = mongoose.model('schedule', scheduleSchema);

module.exports = schedule;
