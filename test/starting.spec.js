var assert = require('assert');
var should = require('chai').should();

describe('Basic Mocha Test', function() {
  it('should throw errors', function() {
    assert.equal(3, 3);
  })
  
  it('should deal with objects', function() {
    var objA = {name: 'Jon', gender: 'male'}; 
    var objB = {name: 'Jon', gender: 'male'}; 
    
    objA.should.have.property('name').equal('Jon');
    objA.should.deep.equal(objB);
  })

  it('should allow testing null', function() {
    var iAmNull = null;
    should.not.exist(iAmNull);
  })  
})