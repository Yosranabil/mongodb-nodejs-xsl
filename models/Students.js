const mongoose = require('mongoose');

// Define a schema
const userSchema = new mongoose.Schema({
    name: String,
    gpa: Number,
    email: String,
});

// Export the model
module.exports = userSchema;