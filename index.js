const request = require('request');
const GithubToSlack = require('GithubToSlack');
const host = process.env.HOST;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  request({
    url: host + event.path,
    method: 'POST',
    json: true,
    body: GithubToSlack[event.headers['X-GitHub-Event']](JSON.parse(event.body))
  }, (err, res, body) => {
    callback(err, {
      statusCode: res.statusCode,
      headers: res.headers,
      body: body
    });
  });
};
