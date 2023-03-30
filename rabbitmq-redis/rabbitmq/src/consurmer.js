const amqp = require('amqplib');
const redis = require('redis');
const data = require("./data.json")
const client = redis.createClient({
    host: '172.17.0.2',
    port: 6379
});

async function receiveFromQueue() {
    try {
        const _connection = await amqp.connect("amqp://localhost");
        const _channel = await _connection.createChannel();
        const _queue = "one_queue";

        await _channel.assertQueue(_queue);

        console.log('Waiting for messages...');

        _channel.consume(_queue, (msg) => {
            if (msg) {
                const _msgInfo = Number(msg.content.toString()); 
                const _userInfo = data.find(u => u.id == _msgInfo);
                if (_userInfo) {
                    console.log("processed record: ", _userInfo.id);
                    client.set(_userInfo.id, JSON.stringify(_userInfo), (err, status) => {
                        console.log("Status: ", status);
                        if (!err) {
                            _channel.ack(msg);
                        }
                    });
                }
            }
        });
    }
    catch (error) {
        console.error('Error:', error);
    }
}

receiveFromQueue();