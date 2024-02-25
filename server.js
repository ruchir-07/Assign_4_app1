// server.js
/********************************************************************************
* WEB700 – Assignment 03
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Kashish Kohli Student ID: 141827238 Date: 10/02/2024
*
********************************************************************************/

const express = require('express');
const app = express();

// Serve static files from the "public" folder
app.use(express.static('public'));

const bodyParser = require('body-parser');


// Body parser middleware
app.use(express.urlencoded({ extended: true }));

app.get('/students/add', (req, res) => {
    res.sendFile(__dirname + '/views/addStudent.html');
});

// POST route to add a new student
app.post('/students/add', (req, res) => {
    // Handle form submission here
    // Extract data from req.body and add a new student
    const { firstName, lastName, age, grade } = req.body;
    // Add logic to add the new student to your data (e.g., students.json)
    res.send('Student added successfully!');
});
const path = require('path');
const collegeData = require(path.join(__dirname, 'modules', 'collegeData.js'));
// Other middleware and configurations...

// GET route to render add student form
app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
});

// Other routes and middleware...





// Other middleware and configurations...

// GET route to render add student form
app.get('/students/add', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'addStudent.html'));
});

// POST route to add a new student
app.post('/students/add', (req, res) => {
    // Call addStudent function with data from req.body
    addStudent(req.body)
        .then(() => {
            // If student is added successfully, redirect to /students route
            res.redirect('/students');
        })
        .catch(error => {
            // Handle errors appropriately
            console.error('Error adding student:', error);
            res.status(500).send('Error adding student');
        });
});

var HTTP_PORT = process.env.PORT || 3000;




// Initialize collegeData
collegeData.initialize()
    .then(() => {
        // setup http server to listen on HTTP_PORT
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT);
        });
    })
    .catch((err) => {
        console.error("Error initializing collegeData:", err);
    });
 // Import the addStudent function from your collegeData.js module
// Routes

// GET /students
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then(students => {
            res.json(students);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /students?course=value
app.get("/students", (req, res) => {
    const course = req.query.course;
    if (course) {
        collegeData.getStudentsByCourse(course)
            .then(students => {
                res.json(students);
            })
            .catch(() => {
                res.status(404).json({ message: "no results" });
            });
    } else {
        res.status(400).json({ message: "Course parameter missing" });
    }
});

// GET /tas
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(tas => {
            res.json(tas);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(courses => {
            res.json(courses);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /student/num
app.get("/student/:num", (req, res) => {
    const num = req.params.num;
    collegeData.getStudentByNum(num)
        .then(student => {
            res.json(student);
        })
        .catch(() => {
            res.status(404).json({ message: "no results" });
        });
});

// GET /
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET /about
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET /htmlDemo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});


// Handle 404
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

