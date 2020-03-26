const express = require('express');
const app = express();
const Joi = require('joi');

// ========================================================================================
const personRoute = require('./routes/person');
const customerRoute = require('./routes/customer');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body);
    //res.send()
    next();
});

app.use(personRoute);
app.use(customerRoute)
app.use(express.static('public'));

//handler for 404 - Resource Not Found!
app.use((req, res, next)=>{
    res.status(404).send('we think you are lost!')
});

app.use((err, req, res, next) => {
    console.error(err.stack());
    res.sendFile(path.join(__dirname, '/public/500.html'));
});

// ========================================================================================
app.use(express.json());


const courses = [
    {
        id: 1, name: 'course1'
    },
    {
        id: 2, name: 'course2'
    },
    {
        id: 3, name: 'course3'
    }
]

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));

app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The course with given id: ${req.params.id} not found!`);
    }
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

app.post('/api/courses', (req, res) => {

    const result = validateCourse(req.body);
    // console.log(result);
    
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id : courses.length + 1,
        name : req.body.name
    };

    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The course with given id: ${req.params.id} not found!`);
    }
    
    // const result = validateCourse(req.body);
    const {error} = validateCourse(req.body);

    if(error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
  
    course.name = req.body.name;
    res.send(course);

});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send(`The course with given id: ${req.params.id} not found!`);
    }
    
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

function validateCourse(course){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

// app.post();
// app.put();
// app.delete();