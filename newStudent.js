const mongoose = require('mongoose');
const student = require('./models/Students');

require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;

const Freshman = mongoose.model('User', student, 'freshmen');
const Sophomore = mongoose.model('User', student, 'sophomore');
const Junior = mongoose.model('User', student, 'junior');

function insertNewStudent(){

    // Create a new user document
    const newUser = new Freshman({
        name: 'Alina Lopez',
        gpa: 1.99,
        email: 'alina1989@example.com',
        });
        
        // Save the new user to the database
        newUser.save()
        .then(savedUser => {
            console.log('User saved to the database:', savedUser);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            // Close the connection after saving
            mongoose.connection.close();
        });
}

// Connect to MongoDB
mongoose.connect(mongodbUri, {useNewUrlParser: true,useUnifiedTopology: true,});

insertNewStudent();