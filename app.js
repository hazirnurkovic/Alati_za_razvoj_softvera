var express = require('express');
var app = express();
var mysql  = require('mysql');
var bodyParser =  require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'dbms',
    password: 'dbms',
    database: 'airline'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MYSQL!");
  });

app.use(express.static("assets"));
app.use(express.static("css"));
app.use(express.static("js"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    res.render("home");
});

app.get('/login',function(req,res){
    res.render("home");
});

app.get("/register",function(req,res){
    res.render("register");
});

app.get('/home',function(req,res){
    res.render('search');
});

app.get('/search',function(req,res){
    console.log(typeof req.query.date);
    res.redirect('/home');
});

app.post("/login",function(req,res){
    var body = req.body;
    var email = body.email;
    var pass = body.pass;
    var getPass = "SELECT password FROM login WHERE email='"+email+"'";

    connection.query(getPass,function(err,result, fields){
        if(err){
            console.log(err);
        }
        else{
            var dbpass = result[0].password;
            if(pass == dbpass){
                res.redirect('/home');
            }
            else{
                res.redirect('/login');
            }
        }
    });
});

app.post("/register",function(req,res){
    var body = req.body;
    var email = body.email;
    var pass = body.pass;
    var name = body.name;
    var age = body.age;
    var gender = body.gender;

    var sql = "INSERT INTO login VALUES('"+email+"','"+pass+"')";
    var datasql = "INSERT INTO user VALUES('"+email+"','"+name+"',"+age+",'"+gender+"')";
    connection.query(sql,function(err,result){
        connection.query(datasql,function(ierr,iresult){
            if(ierr) throw ierr;
            console.log(iresult);
            res.redirect('/login');
        });
    });
});

app.listen(8080,function(){
    console.log("Server has started");
});