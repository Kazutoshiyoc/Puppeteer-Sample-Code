const INCOMING_WEBHOOKS_URI = 'https://hooks.slack.com/services/****/****/*********';
const ICON_URL = 'https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png';

exports.message = async (message, app_name) => {
  var request = require('request');
  var options = {
    uri: INCOMING_WEBHOOKS_URI,
    headers: { 'Content-Type': 'application/json' },
    json: {
      username: app_name,
      icon_url: ICON_URL,
      text: message
    }
  };
  request.post(options);
};