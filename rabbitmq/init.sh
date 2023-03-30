#!/bin/sh

# RabbitMQ sunucusunu başlat
rabbitmq-server -detached

# Kullanıcıyı ekle
rabbitmqctl add_user erdog 123
rabbitmqctl set_user_tags erdog administrator
rabbitmqctl set_permissions -p / erdog ".*" ".*" ".*"

# RabbitMQ sunucusunu ön planda çalıştır
rabbitmq-server
