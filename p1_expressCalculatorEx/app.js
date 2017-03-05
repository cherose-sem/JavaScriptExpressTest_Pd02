var express = require("express");
var app = express();
// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended: false})) ;

app.use( "/api/calculator/:operation/:n1/:n2" , function (req,res,next){
   var calculatorRequest ={
   operation :  req.params.operation,
   n1 : Number (req.params.n1),
   n2 : Number (req.params.n2)
   };
  req.calc = calculatorRequest; 
  next();
})


app.get("/api/calculator/*", function (req,res){
var calc = req.calc;
var calculation = eval(calc.n1 + calc.operation + calc.n2);
res.send(calc.n1 + " " + calc.operation + " " + calc.n2 + " = " + calculation);
})


app.listen(3000, function (){
console.log("Server Started Listing on: " + 3000);
})