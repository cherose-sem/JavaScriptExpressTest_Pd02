const {expect} = require ("chai");
var calc = require("../calculator/calculator");

describe('calculator', function(){
  before(function (){
  });

  describe('#sum', function(){
    it('should return 2', function(){
      expect(calc.sum(1,1)).to.be.equal(2);
    })
  })

  describe('#sub', function(){
    it('should return 0', function(){
      expect(calc.subtract(1,1)).to.be.equal(0);
    })
  })

  describe('#mul', function(){
    it('should return 1', function(){
      expect(calc.multiply(1,1)).to.be.equal(1);
    })
  })

  describe('#div', function(){
    it('should return 1', function(){
      expect(calc.divide(1,1)).to.be.equal(1);
    })
  })
})

