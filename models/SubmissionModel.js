const mongoose = require('mongoose');

const formSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
    type: String,
    required: true,
    },
    address: {
    type: String,
    required: true,
    },
    type_of_destination: {
        type: Number,
        required: true,
    },
    note: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('FormSubmission', formSubmissionSchema);
