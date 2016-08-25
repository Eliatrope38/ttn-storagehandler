var config = require('./config');

var Waterline = require('waterline');


// Require any waterline compatible adapters here
var diskAdapter = require('sails-disk'),
    mysqlAdapter = require('sails-mysql');

// Create the waterline instance.
var waterline = new Waterline();
var Msg;

// Create a specification for a Message model.
var msgCollection = Waterline.Collection.extend({
	identity: 'msg',
	connection: 'myLocalMySql',
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
    'default': mysqlAdapter,
    disk: diskAdapter,
    mysql: mysqlAdapter
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
