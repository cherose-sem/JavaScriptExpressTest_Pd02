var angularAirline = require("./airline");

var date = new Date("2016-03-09");
angularAirline.getTickets("SXF",date,4,function(err,response){
  console.log(response);
});
