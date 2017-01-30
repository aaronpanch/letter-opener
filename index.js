const request = require('request');
const GithubToSlack = require('./GithubToSlack');
const host = process.env.HOST;

exports.handler = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const slackBody = GithubToSlack[event.headers['X-GitHub-Event']](JSON.parse(event.body));

  if (slackBody) {
    request({
      url: host + event.path,
      method: 'POST',
      json: true,
      body: slackBody
    }, (err, res, body) => {
      callback(err, {
        statusCode: res.statusCode,
        headers: res.headers,
        body: body
      });
    });
  } else {
    callback(null, {
      statusCode: 200,
      headers: {},
      body: 'ok'
    });
  }
};
