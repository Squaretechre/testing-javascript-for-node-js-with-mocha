var assert = require('assert')
var authController = require('../../controllers/authController');
var expect = require('chai').expect;

// Should adds itself to Object.prototype
// Will be available on all objects even without require statement
var should = require('chai').should();
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');

chai.use(chaiAsPromised);
chai.should();

// There is an implied describe block around all tests
beforeEach (function beforeEachGlobal() {
  console.log('beforeEach - global');
})

describe('AuthController', function() {
  var user = {};
  // beforeEach - before each test
  // before - global test environment setup
  // Using named functions with beforeEach helps troubleshoot errors
  beforeEach('you can also add messages', function settingUpRoles() {
    user = {
      roles: ['user'],
      isAuthorized: function(neededRole) {
        return this.roles.indexOf(neededRole) >= 0;
      }
    }
    sinon.spy(user, 'isAuthorized');
    authController.setUser(user);
  })

  // Can use describe.only / it.only to target specific tests
  // Can use describe.skip / it.skip / this.skip to omit specific tests
  describe('isAuthorized', function() {
    it('Should return false if not authorized', function() {
      var isAuth = authController.isAuthorized('admin');
      user.isAuthorized.calledOnce.should.be.true;
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

      authController.setRoles(['user']);
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

  describe('getIndex', function() {
    beforeEach(function() {
      user = {
        roles: ['user'],
        isAuthorized: function(neededRole) {
          return this.roles.indexOf(neededRole) >= 0;
        }
      }
    })

    it('should render index if authorized', function() {
      var isAuth = sinon.stub(user, 'isAuthorized').returns(true);
      var req = {user: user};
      var res = {
        render: function() {}
      };

      var mock = sinon.mock(res);
      mock.expects('render').once().withExactArgs('index');

      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;

      mock.verify();
    })

    it('should render error page if exception is thrown', function() {
      // Can use throws to throw a specific type of exception too
      var isAuth = sinon.stub(user, 'isAuthorized').throws();
      var req = {user: user};
      var res = {
        render: sinon.spy()
      };
      authController.getIndex(req, res);
      isAuth.calledOnce.should.be.true;
      res.render.calledOnce.should.be.true;
      res.render.firstCall.args[0].should.equal('error');
    })
  })
});