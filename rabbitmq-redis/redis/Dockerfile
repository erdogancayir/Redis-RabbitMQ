# Start with a base image
FROM debian:buster-slim

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Expose the Redis port
EXPOSE 6379

# Start Redis
CMD [ "redis-server"]

# ***** dışarıya açmak için redisi ya da redis.conf da düzenleriz******
#sudo docker build -t redis-image .
#sudo docker run -d -p 6379:6379 --name redis_container redis-image
#docker exec -it redis_container sh
#redis-cli
#config set protected-mode no

#RUN: RUN komutu, Docker imajını oluştururken çalıştırılır 
#CMD: CMD komutu, Docker konteyneri başlatıldığında çalıştırılacak varsayılan komutu veya betiği belirtir.
#Bir Dockerfile'da birden fazla CMD komutu bulunabilir, ancak sadece sonuncusu etkili olur. 
