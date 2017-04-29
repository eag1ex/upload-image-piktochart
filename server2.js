//require express library
var express = require('express');
var app = express();
//require the express router
var router = express.Router();
//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './images/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({ dest: DIR }).single('upload');
/* GET home page. */



app.use(express.static('./'));
app.use(express.static('./app/**'));
app.use(express.static('./app/**/**'));


app.use(function(req, res, next) {
    //set headers to allow cross origin request.
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});





app.get('/', function(req, res, next) {
    // render the index page, and pass data to it.
    res.sendFile(__dirname + '/app/index.html');
});

//our file upload function.
app.post('/uploads', function(req, res, next) {
    console.log('req1223', req)
    var path = '';
    upload(req, res, function(err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file;
        return res.send("Upload Completed for " + path);
    });
})


app.listen(8000, _ => {
    console.log('server started. listening to 8000');
})