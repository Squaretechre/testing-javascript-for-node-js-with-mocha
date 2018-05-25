var assert = require('assert')
var authController = require('../../controllers/auth.controller');
var expect = require('chai').expect;

// Should adds itself to Object.prototype
// Will be available on all objects even without require statement
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

// There is an implied describe block around all tests
beforeEach (function beforeEachGlobal() {
  console.log('beforeEach - global');
})

describe('AuthController', function() {
  // beforeEach - before each test
  // before - global test environment setup
  // Using named functions with beforeEach helps troubleshoot errors
  beforeEach('you can also add messages', function settingUpRoles() {
    console.log('running before each');
    authController.setRoles(['user']);
  })

  // Can use describe.only / it.only to target specific tests
  // Can use describe.skip / it.skip / this.skip to omit specific tests
  describe('isAuthorized', function() {
    it('Should return false if not authorized', function() {
      var isAuth = authController.isAuthorized('admin');
      expect(isAuth).to.be.false;
    })
    it('Should return true if authorized', function() {
      authController.setRoles(['user', 'admin']);
      var isAuth = authController.isAuthorized('admin');
      isAuth.should.be.true;
    })

    // Can stub out tests are classed as 'pending'
    it('should be implemented at some point');
    it('should not allow a get if not authorized');
    it('should allow a get if authorized');
  })

  describe('isAuthorizedAsync', function() {
    it('Should return false if not authorized', function(done) {
      // Access Mocha context
      // Recommended not to use arrow functions with Mocha due to the way this is bound
      this.timeout(2500);
      
      authController.isAuthorizedAsync('admin', function(isAuth) {
        assert.equal(false, isAuth);
        done();
      });
    })
  })

  describe('isAuthorizedPromise', function() {
    it('Should return false if not authorized', function() {
      return authController.isAuthorizedPromise('admin').should.eventually.be.false;
    })
  })
});