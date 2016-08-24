var base64 = require('base-64');
var db = require('./database.js');
var fs = require('fs');
var ttn = require('ttn');

var appEUI = 'YOUR appEUI';
var appKey = 'YOUR appKey';



console.log('Connecting to AppEUI: ' + appEUI);
// Start the TTN Client
  var client = new ttn.Client('staging.thethingsnetwork.org', appEUI,appKey);
  client.on('uplink', function (msg) {
    console.log('Uplink from Device: ' +msg.counter+' '+ msg.devEUI + '\r\n'  )
    console.log('Received message',base64.decode(msg.fields.raw));
    db.save_msg(msg);
  });
  // Forward connection ok
  client.on('connect', function (msg) {
    console.log('Connected to TTN MQTT');
  });
  // Forward errors
  client.on('error', function (err) {
    console.log('Nav => Error: ' + err);
  });
