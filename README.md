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




RabbitMQ

const exchange = "direct_hello_world"; const routingKey = "hello_routing_key"; const message = "Hello World with exchange";

await channel.assertExchange(exchange, "direct", { durable: false});

Exchange bir isimdir ve direkt bir tip oluşturmak için kullanılan bir değişkendir. Exchange'ler, mesajların alıcılara nasıl yönlendirileceğini belirlemek için kullanılır. Exchange'ler farklı türlerde olabilir, örneğin fanout, topic, headers ve direct gibi. Exchange, gelen mesajları yönlendirme anahtarına (routing ) göre doğru kuyruğa gönderir. Kısacası, geçici kuyruklar, bağlantı açan istemci tarafından kullanılmak üzere oluşturulan, tek kullanımlık kuyruklardır. Exchange ile birlikte kullanıldıklarında, exchange ve kuyruk arasındaki bağlantı için geçici kuyruklar oluşturulabilir.

assertExchange fonksiyonu, verilen isimde bir exchange oluşturur veya mevcut bir exchange'i döndürür. Bu örnekte, exchange isimli bir exchange oluşturuyoruz. İkinci parametre olarak direct tipini veriyoruz, bu da exchange'in direkt tipinde olacağını belirtir. durable seçeneği, exchange'in dayanıklılığını (durable) belirler. Eğer durable değeri true olarak ayarlanmışsa

const queue = await channel.assertQueue('', { exclusive: true });

İlk parametre boş bir string ('') olarak belirtilmiştir, çünkü RabbitMQ'ya otomatik olarak benzersiz bir isimle kuyruk oluşturması için talimat vermek istiyoruz. Bu sayede, otomatik olarak oluşturulan isimle çakışma riski olmadan kuyrukları kullanabiliriz.

Eğer siz özel bir isim belirtmek isterseniz, boş string yerine kendi isminizi kullanabilirsiniz. Ancak, bu durumda kuyruk isimlerinin benzersiz olduğundan emin olmanız gerekmektedir. Aksi takdirde, mevcut bir kuyruğa bağlanabilirsiniz veya yeni bir kuyruk oluştururken hata alabilirsiniz.

Özetle, boş bir string ('') kullanarak, RabbitMQ'dan benzersiz ve otomatik olarak oluşturulan bir kuyruk ismi atamasını istiyoruz. Bu, özellikle geçici kuyruklar için kullanışlıdır ve bu örnekte exclusive: true ile kuyruğun geçici olduğunu belirtiyoruz

channel.publish(exchange, routingKey, Buffer.from(message));

channel.publish() fonksiyonu, RabbitMQ sunucusuna bir mesaj göndermek için kullanılır. Bu fonksiyon, üç parametre alır:

exchange: Mesajın gönderileceği exchange'in ismi. routingKey: Exchange ve kuyruk arasındaki yönlendirme anahtarıdır. Mesajın hangi kuyruğa yönlendirileceğini belirler. content: Gönderilecek mesajın içeriğidir. Bu içerik Buffer türünde bir veri olmalıdır. Bu örnekte, exchange, routingKey ve message değişkenleri önceden tanımlanmıştır. Buffer.from() fonksiyonu ise, message stringini Buffer veri türüne dönüştürür.

Yani, channel.publish() fonksiyonu bu örnekte, exchange ve routingKey parametreleri ile belirtilen exchange'e ve kuyruğa mesaj gönderir. Buffer.from(message) ise, message değişkeninin Buffer türünde bir veriye dönüştürülmesini sağlar.

peki consumer kısmında neden geçici kuyruk oluşturduk, nasıl bulacak kuyrduğu ? 

Kısacası, consumer, assertQueue() fonksiyonu ile bir geçici kuyruk oluşturur ve bu kuyruğun adını alarak, bindQueue() fonksiyonu ile exchange'e bağlanır. Bu sayede, consumer, belirli bir kuyruk adı belirtmek zorunda kalmadan mesajları alabilir ve exchange'ten gelen mesajların doğru kuyruğa yönlendirilmesi sağlanır.

Direct: 

direct exchange, mesajların belirli bir kuyruğa yönlendirilmesi için kullanılır. Bu exchange tipi, mesajların direkt olarak bir kuyruğa yönlendirilmesi için kullanılır.

Bu örnekte, direct exchange tipi kullanılmıştır, çünkü mesajlar doğrudan belirli bir kuyruğa yönlendirilecektir. direct exchange tipi, fanout exchange tipine kıyasla daha spesifik bir yönlendirme işlevi görür. fanout exchange tipi, tüm kuyruklara mesaj yayınlar, ancak direct exchange tipi belirli bir kuyruğa yönlendirir.

Bu örnekte, mesajları alacak olan consumer'lar için belirli bir kuyruk oluşturulmuştu. Producer, bu kuyruğa doğrudan mesaj göndermek için direct exchange tipini kullanmıştı. Bu sayede, mesajlar sadece belirli bir kuyruğa yönlendirilerek diğer consumer'ların gereksiz yere mesajları işlemesinin önüne geçilmiştir.

Kısacası, direct exchange tipi, mesajların belirli bir kuyruğa doğrudan yönlendirilmesi için kullanılır ve bu örnekte belirli bir kuyruğa doğrudan mesaj göndermek için tercih edilmiştir.

RabbitMQ'da dört farklı exchange tipi bulunmaktadır:

Direct Exchange: Mesajlar, belirli bir routing key'e göre direkt olarak ilgili kuyruğa yönlendirilir.

Fanout Exchange: Mesajlar, tüm kuyruklara eşit olarak dağıtılır. Yani, mesajlar herhangi bir routing key kontrolü olmadan tüm kuyruklara yönlendirilir.

Topic Exchange: Mesajlar, belirli bir routing key'e göre ilgili kuyruklara yönlendirilir. Ancak, routing key'lerin özel bir formatta yazılması gerekmektedir.

Headers Exchange: Mesajlar, belirli bir routing key yerine, mesajın header'ındaki belirli değerlere göre yönlendirilir.

Bu dört exchange tipi, farklı senaryolarda kullanılabilir. Örneğin, Direct Exchange tipi, belirli bir kuyruğa mesaj göndermek için kullanılabilirken, Fanout Exchange tipi, tüm kuyruklara eşit olarak mesaj göndermek için kullanılabilir.

direct vs fanout

RabbitMQ'da, Exchange'ler mesajların doğru kuyruklara iletilebilmesi için kullanılır. Exchange'ler, farklı tiplerde ve özelliklerde olabilirler. İki yaygın Exchange tipi Fanout Exchange ve Direct Exchange'dir.

Fanout Exchange, mesajları aldığı anda tüm kuyruklara eşit şekilde dağıtan bir Exchange tipidir. Bu Exchange tipi, yayın yapmak istediğiniz tüm kuyrukların aynı anda güncellenmesini sağlar. Örneğin, bir blog yazısı yayınladığınızda, tüm takipçilerinize aynı mesajın gönderilmesini istersiniz. Bu durumda, Fanout Exchange kullanarak tek bir mesajın tüm kuyruklara iletilmesini sağlayabilirsiniz.

Diğer yandan, Direct Exchange, mesajları belirli bir anahtar ile eşleştiren Exchange tipidir. Anahtar, mesajın hedef kuyruğunu belirleyen bir kriterdir. Örneğin, bir e-ticaret uygulamasında, sipariş verildiğinde siparişin durumunu güncellemek için Direct Exchange kullanabilirsiniz. Bu durumda, siparişin durumunu belirleyen bir anahtar kullanarak mesajın doğrudan hedef kuyruğa iletilmesini sağlayabilirsiniz.

Bu nedenle, Fanout Exchange, tüm kuyruklara eşit şekilde dağıtım yapmak istediğiniz durumlarda kullanılırken, Direct Exchange, mesajların belirli bir kuyruğa gönderilmesi gereken durumlarda kullanılır.
