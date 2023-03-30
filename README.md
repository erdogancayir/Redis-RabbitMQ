# Redis

cd rabbitmq-redis

cd redis 

sudo build -t redis-image .

sudo docker run -d -p 6379:6379 --name redis_container redis-image

sudo docker exec -it redis_container sh

redis-cli

config set protected-mode no


cd rabbit-mq

sudo docker build -t my-rabbitmq-image .
sudo docker run -d --name my-rabbitmq-container -p 5672:5672 -p 15672:15672 my-rabbitmq-image
node src/consumer.js
node src/producer.js


