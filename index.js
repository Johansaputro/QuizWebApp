const express = require("express");
var router = express.Router();
const app = express();
const port = 3000
const bodyParser = require("body-parser");
var name1 = "";
var counter = 0;
var mysql = require("mysql");
var db = mysql.createPool({
  host: "103.146.203.58",
  user: "teamiee",
  password: "cit2019teamiee",
  port: "3306",
  database: "cit2019"
})

//
app.use(bodyParser.urlencoded({extended: true}))

//static files
app.use(express.static('public'))
app.use('/CSS', express.static(__dirname + 'public/CSS'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/php', express.static(__dirname + 'public/php'))

//set engines
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
  res.render('index');
});

app.post('/form1', (req,res) => {
  name1 = req.body.name1;
  counter = 0;
  db.query("INSERT INTO Mobil(IdMobil) VALUES (?)",[name1] , function(err, rs) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  db.query("UPDATE Mobil SET Sequence = ? WHERE IdMobil = ?",[0, name1], function(err,rs) {
    if (err) throw err;
    console.log("Sequence updated")
  });
});

app.post('/formnext', (req,res) => {
  var correctorwrong = req.body.status;
  counter = counter + 1
  db.query("UPDATE Mobil SET Movement = ? WHERE IdMobil = ?",[correctorwrong, name1] , function(err, rs) {
    if (err) throw err;
    console.log("Movement updated");
  });
  db.query("UPDATE Mobil SET Sequence = ? WHERE IdMobil = ?",[counter, name1], function(err,rs) {
    if (err) throw err;
    console.log("Sequence updated")
  });
});

app.get('/test', (req,res) => {
  if (db!=null) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get('/show', function(req,res,next)  {
  db.query('SELECT * FROM questions', function(err,rs){
    if(err) {
      console.log(err);
    } else {
      alert(rs);
    }
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
