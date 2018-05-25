var assert = require('assert')
var authController = require('../../controllers/auth.controller');

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
      assert.equal(false, authController.isAuthorized('admin'));
    })
    it('Should return false if not authorized', function() {
      authController.setRoles(['user', 'admin']);
      assert.equal(true, authController.isAuthorized('admin'));
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
});