# Resmi RabbitMQ Docker imajını kullanın
FROM rabbitmq:3.9-management

# Gerekli ayarları yapın (örneğin, kullanıcı adı, şifre ve erişim izinleri)
ENV RABBITMQ_DEFAULT_USER=myuser
ENV RABBITMQ_DEFAULT_PASS=mypassword

# Yönetim eklentisini etkinleştirin
RUN rabbitmq-plugins enable --offline rabbitmq_management

# 5672: Varsayılan RabbitMQ AMQP bağlantı noktası
# 15672: RabbitMQ yönetim eklentisi için bağlantı noktası
EXPOSE 5672 15672

# RabbitMQ sunucusunu başlatın
CMD ["rabbitmq-server"]
