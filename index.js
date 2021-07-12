const express = require('express')

const profile = require('./api/calls')

const bodyParser = require('body-parser');
const path = require('path');
const app = express()

app.use(express.json())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use("/api/controls", profile)
app.get('/',function(req,res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
  });

app.use((req, res) => {
    res.status(400).json("Invalid API request");
})


const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Server started on port ${port}`))