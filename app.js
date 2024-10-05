const fs = require('fs');
const express = require('express');
const app = express();
const {check, validionresult} = require('express-validator');
app.use(express.json());  
const port = 3000;


const postTodo = (req,res) => {
    const newID = (testd.tasks[testd.tasks.length - 1].id) + 1;
    const newTODO = Object.assign({id: newID}, req.body);
    testd.tasks.push(newTODO);
    fs.writeFile(`${__dirname}/test-data.json`, JSON.stringify(testd.tasks), err => {
        res.status(201).json({                 
            status:'success', 
            data : {
                list: newTODO
        }});
    } );    
};
 
const getTodo = (req,res) => {
    const idd = req.params.id * 1 ;
    if (idd > testd.tasks.length) {
        return res.status(404).json({
            status:'fail',  
            message : 'invalid id'
        });
    }
    res.status(200).json({
        status:'success', 
        data : testd.tasks[idd-1]
    })
};
 
const updateTodo = (req,res) => {
    const idd = req.params.id * 1 ;
    const idtodo = (testd[idd - 1]);
    if (idd > testd.tasks.length) {
        return res.status(404).json({
            status:'fail',  
            message : 'invalid id'
        });
    };
    testd.tasks[idd - 1] = '';
    testd.tasks[idd - 1] = req.body;
    testd.tasks = Object.assign(testd.tasks, req.body);
    fs.writeFile(`${__dirname}/test-data.json`, JSON.stringify(testd.tasks), err => {
            } );  
    res.status(200).json({
        status:'update success ', 
        data : req.body
    })
};

const deleteTodo = (req,res) => {
    const idd = req.params.id * 1 ;
    const idtodo = (testd[idd - 1]);
    if (idd > testd.tasks.length) {
        return res.status(404).json({
            status:'fail',  
            message : 'invalid id'
        });
    };
    testd.tasks[idd - 1] = '';
    fs.writeFile(`${__dirname}/test-data.json`, JSON.stringify(testd.tasks), err => {
            } );  
    res.status(200).json({
        status:'delete success ', 
        data : testd.tasks[idd - 1]
    })
};

const getAllTodo = (req,res) => {
    res.status(200).json({
        status:'success', 
        data : testd
    })
};

const testd = JSON.parse(fs.readFileSync(`${__dirname}/test-data.json`));

//GETALLTODO
app.get('/api/v1/todolist',getAllTodo);

//GET
app.get('/api/v1/todolist/:id',getTodo);

//UPDATE
app.put('/api/v1/todolist/:id',updateTodo);

//DELETE
app.delete('/api/v1/todolist/:id',deleteTodo);

//POST
app.post('/api/v1/todolist',postTodo);

app.all('*', (req,res,next) => {
    res.status(404).json({
        status: 'fail',
        message: "Can't find the URL typed"
    });
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});