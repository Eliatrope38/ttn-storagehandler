var config = require('./config');

var Waterline = require('waterline');


// Require any waterline compatible adapters here
var diskAdapter = require('sails-disk'),
    mysqlAdapter = require('sails-mysql'),
    mongoAdapter = require('sails-mongo');
// Create the waterline instance.
var waterline = new Waterline();
var Msg;

// Create a specification for a Message model.
var msgCollection = Waterline.Collection.extend({
	identity: 'msg',
	connection: 'myLocalMongo',
	attributes: {
		counter: 'integer',
		gateway: 'string',
		devEUI: 'string',
    frequency: 'string',
    rssi: 'string',
    datarate: 'string',
    payload_64: 'string',
	}
});


waterline.loadCollection(msgCollection);

// Build A Config Object
var config = {
  // Setup Adapters
  // Creates named adapters that have have been required
  adapters: {
    'default': mongoAdapter,
    disk: diskAdapter,
    mysql: mysqlAdapter,
    mongo:mongoAdapter
  },

  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
    myLocalDisk: {
      adapter: 'disk'
    },

    myLocalMySql: {
		 adapter : 'mysql',
		 module    : 'sails-mysql',
     host      : config.DB_HOST,
     port      : 3306,
     user      : config.DB_USER,
     password  : config.DB_PWD,
     database  : 'msgcollection'
   },

    myLocalMongo:{
      adapter: 'mongo',
      module:'sails-mongo',
      host: config.DB_HOST, // defaults to `localhost` if omitted
      port: 27017, // defaults to 27017 if omitted
      user: config.DB_USER, // or omit if not relevant
      password: config.DB_PWD, // or omit if not relevant
      database: 'msgcollection' // or omit if not relevant
    }
  }

};

// Initialise the waterline instance.
waterline.initialize(config, function (err, ontology) {
	if (err) {
		return console.error(err);
	}
  Msg = ontology.collections.msg;
});

function save_msg(data){
  Msg.create({		counter: data.counter,
  		gateway: data.metadata.gateway_eui,
  		devEUI: data.devEUI,
      frequency: data.metadata.frequency,
      rssi: data.metadata.rssi,
      datarate: data.metadata.datarate,
      payload_64: data.fields.raw,})
      .then(console.log)
      .catch(console.error);
}

exports.save_msg = save_msg;
