# Start with a base image
FROM debian:buster-slim

# Install Redis
RUN apt-get update && apt-get install -y redis-server

# Expose the Redis port
EXPOSE 6379
# Start Redis
CMD [ "redis-server"]

# ***** dışarıya açmak için redisi ya da redis.conf da düzenleriz******
#docker run --name redis-container -d redis
#docker exec -it redis-container sh
#redis-cli
#config set protected-mode no

#COPY komutu ana makinede çalışır.
#RUN komutu image uzerınde çalışır
#CMD komutu ana makine de çalışır.
