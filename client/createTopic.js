var kafka = require('kafka-node');
var client = new kafka.KafkaClient({kafkaHost: "192.168.88.201:9092,192.168.88.203:9092,192.168.88.202:9092" });
 
var topicsToCreate = [{
  topic: 'topicA',
  partitions: 3,
  replicationFactor: 3
}];
 
client.createTopics(topicsToCreate, (error, result) => {
  // result is an array of any errors if a given topic could not be created
});