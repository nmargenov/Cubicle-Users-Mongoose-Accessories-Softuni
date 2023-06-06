const express = require('express');

const app = express();

app.get(['/','/index'],(req,res)=>{
    res.send('Working');
})

const PORT = 5000;
app.listen(PORT,()=>console.log(`Server is working on port ${PORT}...`));