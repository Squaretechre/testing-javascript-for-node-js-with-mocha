// CommonJs requires are cached, if modified will be modified for all consumers
var chai = require('chai');
var sinon = require('sinon');
var https = require('https');
var PassThrough = require('stream').PassThrough;

var gitJson = {
  "login": "jonathanfmills",
  "id": 138754,
  "avatar_url": "https://avatars0.githubusercontent.com/u/138754?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/jonathanfmills",
  "html_url": "https://github.com/jonathanfmills",
  "followers_url": "https://api.github.com/users/jonathanfmills/followers",
  "following_url": "https://api.github.com/users/jonathanfmills/following{/other_user}",
  "gists_url": "https://api.github.com/users/jonathanfmills/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/jonathanfmills/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/jonathanfmills/subscriptions",
  "organizations_url": "https://api.github.com/users/jonathanfmills/orgs",
  "repos_url": "https://api.github.com/users/jonathanfmills/repos",
  "events_url": "https://api.github.com/users/jonathanfmills/events{/privacy}",
  "received_events_url": "https://api.github.com/users/jonathanfmills/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Jonathan Mills",
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 34,
  "public_gists": 3,
  "followers": 278,
  "following": 0,
  "created_at": "2009-10-12T16:05:52Z",
  "updated_at": "2018-05-17T16:13:40Z"
}

var repoJson = [
  {
    "id": 28144218,
    "name": "AngularForTheNetDev",
    "full_name": "jonathanfmills/AngularForTheNetDev",
    "owner": {
      "login": "jonathanfmills",
      "id": 138754,
      "avatar_url": "https://avatars0.githubusercontent.com/u/138754?v=4",
      "gravatar_id": "",
      "url": "https://api.github.com/users/jonathanfmills",
      "html_url": "https://github.com/jonathanfmills",
      "followers_url": "https://api.github.com/users/jonathanfmills/followers",
      "following_url": "https://api.github.com/users/jonathanfmills/following{/other_user}",
      "gists_url": "https://api.github.com/users/jonathanfmills/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/jonathanfmills/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/jonathanfmills/subscriptions",
      "organizations_url": "https://api.github.com/users/jonathanfmills/orgs",
      "repos_url": "https://api.github.com/users/jonathanfmills/repos",
      "events_url": "https://api.github.com/users/jonathanfmills/events{/privacy}",
      "received_events_url": "https://api.github.com/users/jonathanfmills/received_events",
      "type": "User",
      "site_admin": false
    }
  }
];

chai.should();
var gitService = require('../../services/gitService')();

describe('GitService', function () {
  describe('GetUser', function () {

    beforeEach(function () {
      this.request = sinon.stub(https, 'request');
    });

    it('should return user and repos', function () {
      var gitResponse = new PassThrough();
      gitResponse.write(JSON.stringify(gitJson));
      gitResponse.end();
      
      var repoResponse = new PassThrough();
      repoResponse.write(JSON.stringify(repoJson));
      repoResponse.end();

      this.request
      .onFirstCall().stub.callsArgWithAs(1, gitResponse).returns(new PassThrough())
      .onSecondCall().stub.callsArgWith(1, repoResponse).returns(new PassThrough());

      return gitService.getUser('jonathanfmills').then(
        function (user) {
          console.log(user);
          user.login.should.equal('jonathanfmills');
          user.should.have.property('repos');
        }
      )
    });

    afterEach(function () {
      this.request.restore();
    });
  })
})