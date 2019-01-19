const mongoose = require('mongoose');
const EmailGroups = require('./emailGroups');
const Role = require('./role');
const { Schema } = mongoose;
const ControlSchema = new Schema ({

    name: { type: String, required: true },

    emailGroups: { type: [String], required: false },
    roles: { type: [String], required: false, default: Role.Admin },
    createdDate: { type: Date, default: Date.now }

});

module.exports = mongoose.model('Control', ControlSchema);