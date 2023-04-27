const express=require('express');

const bodyParser = require('body-parser');
const path=require('path');
const Userroute=require('./route/userroute');
const app=express();
const port=process.env.port ||2000;
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(Userroute);
const static_path=path.join(__dirname,"../","public");
app.use(express.static(static_path));

app.listen(port, () => {
   
    console.log(`Server listening on port ${port}`);
  });