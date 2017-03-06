
//getting undefined - having a hard time to test the 'make it modular'

const {expect} = require("chai");
var module = require("../modular/module");

describe("Testing async behaviour", function(){
  var foo = "";
  var dir = "../p3_testing/model";
  var filterExtension = "";

  var callback = function (err, list) {
    if (err) throw err;
    list.forEach(function (file) {
        // console.log(file);
        return file;
    })
}
  before(function(done){
    setTimeout(function(){
      foo = module(dir, filterExtension, callback);
      done();  //Test will fail without this
    }, 1000);
  });
  it("should pass (with done called)", function(){
    expect(foo).to.equal(undefined);
  });
});  
