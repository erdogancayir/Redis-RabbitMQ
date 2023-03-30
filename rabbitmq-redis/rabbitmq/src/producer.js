const amqp = require("amqplib");

const data = require("./data.json");
const _queue = process.argv[2] || "one_queue";
let _message;
async function _send() {
    try {
        const _connection = await amqp.connect("amqp://myuser:mypassword@172.17.0.3");
        const _channel = await _connection.createChannel();
        await _channel.assertQueue(_queue);

        data.forEach(i => {
            _message = i.id
            _channel.sendToQueue(_queue, Buffer.from(_message.toString()));
            console.log("Send : ", i.id);
        })
        setTimeout(async () => {
            await _channel.close();
            await _connection.close();
            console.log("Channel and connection closed.");
          }, 1000);
    }
    catch (error) {
        console.log("Error: ", error);
    }
}

_send();