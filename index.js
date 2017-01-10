const request = require('request');
const host = process.env.HOST;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  request({
    url: host + event.path,
    method: 'POST',
    json: true,
    body: {
      text: 'Hello World!'
    }
  }, (err, res, body) => {
    callback(err, {
      statusCode: res.statusCode,
      headers: res.headers,
      body: body
    });
  });
};
