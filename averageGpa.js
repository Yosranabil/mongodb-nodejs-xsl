const mongoose = require('mongoose');
const student = require('./models/Students');
const xlsx = require('node-xlsx');
const _ = require('lodash');
require('dotenv').config();
const mongodbUri = process.env.MONGODB_URI;

// Connect to db
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true });

// bind the existing collections to the models
const Freshman = mongoose.model('User', student, 'freshmen');
const Sophomore = mongoose.model('User', student, 'sophomore');
const Junior = mongoose.model('User', student, 'junior');

// find gpa for each collection
async function getAverageGPAs() {
  try {
    const [freshmanGPAs, sophomoreGPAs, juniorGPAs] = await Promise.all([
      Freshman.find().select('gpa'),
      Sophomore.find().select('gpa'),
      Junior.find().select('gpa'),
    ]);

    // Calculate average GPAs
    const calculateAverageGPA = (gpas) => _.meanBy(gpas, 'gpa');

    const avgFreshmanGPA = calculateAverageGPA(freshmanGPAs);
    const avgSophomoreGPA = calculateAverageGPA(sophomoreGPAs);
    const avgJuniorGPA = calculateAverageGPA(juniorGPAs);

    // Create the data for the XLSX file
    const data = [
      ['Category', 'Average GPA'],
      ['Freshmen', avgFreshmanGPA],
      ['Sophomores', avgSophomoreGPA],
      ['Juniors', avgJuniorGPA],
    ];

    // Create a buffer with the XLSX data
    const buffer = xlsx.build([{ name: 'Average GPAs', data }]);

    // Write the buffer to a file
    require('fs').writeFileSync('average_gpas.xlsx', buffer);

    console.log('Average GPAs saved to average_gpas.xlsx');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

// Call the function to retrieve and calculate average GPAs
getAverageGPAs();
