# Redis

cd rabbitmq-redis

cd redis 

sudo docker build -t redis-image .

sudo docker run -d -p 6379:6379 --name redis_container redis-image

docker exec -it redis-container sh

redis-cli

config set protected-mode no
