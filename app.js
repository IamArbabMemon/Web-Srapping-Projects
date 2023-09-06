 const express = require('express');
 const path = require('path');
 const database = require('./database');
const { type } = require('os');
const app = express();
app.use(express.json());

app.post('/employee/insert',(req,res)=>{
    // console.log(req.body.firstName);
    // console.log(req.body.Email);
    const employee  = req.body;
    employee.phone = parseInt(employee.phone);
    database.insertEmployeToDB(employee);
});

app.get('/',(req,res)=>{
    const indexPath = path.join(__dirname, 'index.html');
    res.sendFile(indexPath);

});

app.get('/style.css',(req,res)=>{
    const indexPath = path.join(__dirname, 'style.css');
    res.sendFile(indexPath);

});



app.listen(3000,()=>{
    console.log("I AM LISTENING");
})