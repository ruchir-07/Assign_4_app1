// collegeData.js


// Your existing code...

// Function to add a new student


function addStudent(studentData) {
    return new Promise((resolve, reject) => {
        // If studentData.TA is undefined, set it to false; otherwise, set it to true
        studentData.TA = studentData.TA === undefined ? false : true;

        // Explicitly set the studentNum property
        studentData.studentNum = dataCollection.students.length + 1;

        // Push the updated studentData object onto the "dataCollection.students" array
        dataCollection.students.push(studentData);

        // Resolve the promise
        resolve();
    });
}

// Add the addStudent function to module.exports
module.exports = {
    // Your existing exports...
    addStudent
};


const fs = require('fs').promises;

let students = [];
let courses = [];

function initialize() {
    return Promise.all([
        fs.readFile('./data/students.json', 'utf-8')
            .then(data => {
                students = JSON.parse(data);
            }),
        fs.readFile('./data/courses.json', 'utf-8')
            .then(data => {
                courses = JSON.parse(data);
            })
    ]);
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (students.length > 0) {
            resolve(students);
        } else {
            reject("no results returned");
        }
    });
}

function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        const filteredStudents = students.filter(student => student.course === course);
        if (filteredStudents.length > 0) {
            resolve(filteredStudents);
        } else {
            reject("no results returned");
        }
    });
}

function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        const foundStudent = students.find(student => student.studentNum === num);
        if (foundStudent) {
            resolve(foundStudent);
        } else {
            reject("no results returned");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        // Assuming TAs are stored in a separate array in the data
        // You should adjust this function based on your data structure
        const tas = students.filter(student => student.isTA);
        if (tas.length > 0) {
            resolve(tas);
        } else {
            reject("no results returned");
        }
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (courses.length > 0) {
            resolve(courses);
        } else {
            reject("no results returned");
        }
    });
}

module.exports = {
    initialize,
    getAllStudents,
    getStudentsByCourse,
    getStudentByNum,
    getTAs,
    getCourses
};
