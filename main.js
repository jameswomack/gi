#!/usr/bin/env node

var http = require('http');
var copyPaste = require('copy-paste'),
    program = require('commander'), 
    querystring = require('querystring'),
    errorMessagePrefix = 'A failure occurred. The response status is ';

program
  .usage('[gi URL]')
  .version('0.0.1')
  .parse(process.argv);

function gi(URL, callback) {
    var encoded = querystring.encode({ url: URL || process.argv[2] });

    var request = http.request({
        host: 'git.io',
        method: 'POST',
        headers: {
            'Content-Length': encoded.length
        }
    }, function(data) {
      var statusCodes = [ '200', '201' ], 
          status = data.statusCode;
      
      var requestSucceeded = statusCodes.some(function(code) {
          return status <= code;
      });
      
      if (program.args.length) {
        if (requestSucceeded){ 
          console.info(data.headers.location);
          copy(data.headers.location, function(){
            process.exit(0);
          });
        } else {
          console.error(status);
          if (status === 422) {
            console.error('Invalid Github URL');
          }
          process.exit(0);
        }
      } else {
        var err;
        if (!requestSucceeded) {
          err = new Error(status === 422 ? 'Invalid Github URL' : status);
        }
        if (callback) {
          callback(err, data.headers.location);
        } else {
          if (err)
            throw err;
          else
            throw new Error('URL converted to ' + data.headers.location + ' but no callback was provided.');
        }
      }
    });

    request.write(encoded);
    request.end();
    return {originalURL: URL, callbackUsed: !!callback};
}

if (program.args.length) 
  gi();
else
  module.exports = gi;
