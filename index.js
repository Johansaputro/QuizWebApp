const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
var testVar = "";
var router = express.Router();
var name1 = "";
var datatostring = "";
var counterr = 0;
var mysql = require("mysql");
// var timeout = require('connect-timeout');
var db = mysql.createPool({
  host: "",
  user: "",
  password: "",
  port: "",
  database: ""
})

// function haltOnTimedout (req, res, next) {
//   if (!req.timedout) next()
// }


// app
app.use(bodyParser.urlencoded({extended: true}))

//static files
app.use(express.static('public'))
app.use('/CSS', express.static(__dirname + 'public/CSS'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

//set engines
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req,res) => {
  res.render('index');
});

app.post('/form1', (req,res) => {
  name1 = req.body.name1;
  counterr = 0;
  // db.query("INSERT INTO Mobil(IdMobil) VALUES (?)",[name1] , function(err, rs) {
  //   if (err) throw err;
  //   // console.log("1 record inserted");
  // });
  db.query("UPDATE Mobil SET Sequence = ? WHERE IdMobil = ?",[0, name1], function(err,rs) {
    if (err) throw err;
    // console.log("Sequence updated")
  });
  res.status(204).send();
  // res.redirect('/');
});

app.post('/formnext', (req,res) => {
  var correctorwrong = req.body.status;
  counterr = counterr + 1;
  console.log(counterr);
  console.log(correctorwrong);

  db.query("UPDATE Mobil SET Movement = ? WHERE IdMobil = ?",[correctorwrong, name1] , function(err, rs) {
    if (err) throw err;
    // var datatoSend = {
    //   IdMobil: name1,
    //   Movement: correctorwrong,
    //   Counterr: counterr
    // };

    // datatostring = JSON.stringify(datatoSend);
    // console.log("Movement updated");
  });
  db.query("UPDATE Mobil SET Sequence = ? WHERE IdMobil = ?",[counterr, name1], function(err,rs) {
    if (err) throw err;
    // console.log("Sequence updated")
  });
  // db.query("SELECT * FROM Mobil WHERE IdMobil = ?",[name1] , function(err,rs) {
  //   if (err) throw err;
  //   console.log(rs)
  //   datatostring = JSON.stringify(rs);
  // })
  // res.redirect('/');
  res.status(204).send();
});

app.get('/form1', (req,res) => {
  var data = {
    IdMobil: name1
  }
  res.send(JSON.stringify(data));
})

app.get('/formnext', (req, res) => {
  db.query("SELECT * FROM Mobil Where IdMobil = ?", [name1], function(err,rs) {
    if (err) throw err;
    console.log(rs);
    datatostring = JSON.stringify(rs);
  })
  res.send(datatostring);
});

app.get('/test', (req,res) => {
  if (db!=null) {
    res.send("success");
  } else {
    res.send("fail");
  }
});

app.get('/show', function(req,res,next)  {
  db.query('SELECT * FROM Mobil WHERE IdMobil = ?',[name1], function(err,rs){
    if(err) {
      console.log(err);
    } else {
      console.log(rs);
    }
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
