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


// const client = new kafka.KafkaClient({ kafkaHost: "192.168.88.208:9092" });

const Producer = kafka.Producer
const producer = new Producer(client);



//PRODUCER SERDER VALUES
// uuid is REFID for 
publish("941a3018-d599-4f9a-9365-17e2c397aa00", "topicA", 'message hello');
//publish("941a3018-d599-4f9a-9365-17e2c397aa00", "topicB", '{"key","val"}');


function publish(uuid, topic, payload) {
    message = {
        "uuid": uuid,
        "timestamp": new Date(),
        "topic": topic,
        "payload": payload
    }

    payloads = [
        {
            topic: message['topic'],
            messages: JSON.stringify(message),
            partition: 0
        }
    ];

    //SENDER MESSAGE
    producer.send(payloads, function (err, data) {
        if (err){
            //ON ERROR
            console.log("send data error", err);
        }else{
            //ON SUCCESS
            console.log("send data sucess", data, message);
            
        }
    });
}