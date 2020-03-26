const express = require('express');
const router = express.Router();


//http://localhost:5000/person?name=Gaurav
router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`you have requested a person! ${req.query.name}`);
    }else{
        res.send('you have requested a person!');
    }
    
});

router.get('/error', (req, res) =>{
    res.send(`you have requested a person ${req.params.name}`);
});

//http://localhost:5000/person/Amit
router.get('/person/:name', (req, res) =>{
    res.send(`you have requested a person! ${req.params.name}`);
});
module.exports = router;