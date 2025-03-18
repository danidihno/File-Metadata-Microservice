/*
Using Multer to upload documents, multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
*/
// https://www.npmjs.com/package/multer --- usage of the Multer module
require('dotenv').config();
var express = require('express');
var cors = require('cors');
var app = express();
const multer  = require('multer');
const bodyParser = require("body-parser"); 
let resultObj ={};
//
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});
  //
 // require and use "multer"...
//

const upload = multer({ dest: './assets/uploads/' });

app.post("/api/fileanalyse", upload.single('upfile'), async(req, res)=> {
    resultObj["name"] = req.file.originalname; 
    resultObj["type"] = req.file.mimetype;
    resultObj["size"] = req.file.size ;
    res.json(resultObj);
});

const PORT = process.env.PORT;

app.listen(PORT || 3000, function () {
  console.log(`Node.js listening on port ${PORT}...`);
});
