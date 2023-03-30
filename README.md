# Redis

cd rabbitmq-redis

cd redis 

sudo build -t redis-image .

sudo docker run -d -p 6379:6379 --name redis_container redis-image

sudo docker exec -it redis_container sh

redis-cli

config set protected-mode no
