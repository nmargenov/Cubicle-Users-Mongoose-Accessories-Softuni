const express = require('express');

const { PORT } = require('./config/config');
const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const connectToDb = require('./config/databaseConfig');

const app = express();
expressConfig(app);
handlebarsConfig(app);

connectToDb()
    .then(() => console.log('Successfully connected to the database!'))
    .catch(err =>{console.log('Error connecting to the database: ',err)});

app.get(['/','/index'],(req,res)=>{
    res.render('index');
})

app.listen(PORT,()=>console.log(`Server is working on port ${PORT}...`));