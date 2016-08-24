// database management for Storing all LoraWan Frame in Raw mode
var Waterline = require('waterline');
var sailsMemoryAdapter = require('sails-disk');

// Create the waterline instance.
var waterline = new Waterline();
var Msg;

// Create a specification for a Message model.
var msgCollection = Waterline.Collection.extend({
	identity: 'msg',
	connection: 'default',
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

// Set up the storage configuration for waterline.
var config = {
	adapters: {
		'memory': sailsMemoryAdapter
	},

	connections: {
		default: {
			adapter: 'memory'
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
