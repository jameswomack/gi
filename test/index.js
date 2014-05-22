/*jshint -W030 */

require('should');

var gi = require(process.cwd() + '/main');

describe('gi', function(){
  describe('main', function(){
    it('should receive a callback with no error and a short URL if a Github URL is passed', function(done){
      gi('http://github.com/jameswomack', function(error, shortUrl) {
        if (error) {
          throw err;
        }
        shortUrl.should.be.a.string;
        done();
      });
    });

    it('should receive a callback with an error and no short URL if no Github URL is passed', function(done){
      gi('http://github.yarg/nyan_neko', function(error, shortUrl) {
        error.should.be.an.object;
        done();
      });
    });
  });
});
