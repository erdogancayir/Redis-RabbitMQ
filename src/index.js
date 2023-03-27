const redis = require('redis');

const client = redis.createClient({
    host: '172.17.0.2',
    port: 6379
});
client.on('connect', () => console.log('::> Redis Client Connected'));

client.on('error', (err) => {
  console.log('Redis sunucusuna bağlanırken hata:', err);
});

client.set("mykey", "myvalue", (err, reply) => {
    if (err) {
        return console.error('SET hatası:', err);
    }
    console.log('SET işlemi tamamlandı:', reply);
})