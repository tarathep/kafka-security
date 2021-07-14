const kafka = require("kafka-node")

var fs = require('fs');

var kafkaClientOption = {
    clientId: 'user',
    kafkaHost : '192.168.88.208:9092',
    ssl: true,
    sslOptions: {
      rejectUnauthorized: false,
      ca: [fs.readFileSync('./cert/ca_cert.pem', 'utf-8')],
      cert: [fs.readFileSync('./cert/cert.pem', 'utf-8')],
      key: [fs.readFileSync('./cert/cert_key.pem', 'utf-8')],
      passphrase: "P@ssw0rd!@#",
    },
    autoConnect: true,
    connectTimeout: 1000,
    requestTimeout: 1000
  }
  
var client = new kafka.KafkaClient(kafkaClientOption);


// const client = new kafka.KafkaClient({kafkaHost: "192.168.88.201:9092,192.168.88.203:9092,192.168.88.202:9092"});

var options = {
    groupId: 'kafka-node-group',//consumer group id, default `kafka-node-group`
    // Auto commit config
    autoCommit: true,
    autoCommitIntervalMs: 5000,
    // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
    fetchMaxWaitMs: 100,
    // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
    fetchMinBytes: 1,
    // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
    fetchMaxBytes: 1024 * 1024,
    // If set true, consumer will fetch message from the given offset in the payloads
    fromOffset: false,
    // If set to 'buffer', values will be returned as raw buffer objects.
    encoding: 'utf8',
    keyEncoding: 'utf8'
};

//SUBSCRIBE TOPIC : topicA and topicB
new kafka.Consumer(client,[{topic:"topicA"}],options).on("message", function(message) { 
    //RECIVED MESSAGE
    message = message['value'];
    console.log(message)
});