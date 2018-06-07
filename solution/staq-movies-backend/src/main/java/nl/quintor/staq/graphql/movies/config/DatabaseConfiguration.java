package nl.quintor.staq.graphql.movies.config;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoDatabase;
import de.flapdoodle.embed.mongo.MongodExecutable;
import de.flapdoodle.embed.mongo.MongodProcess;
import de.flapdoodle.embed.mongo.MongodStarter;
import de.flapdoodle.embed.mongo.config.IMongodConfig;
import de.flapdoodle.embed.mongo.config.MongodConfigBuilder;
import de.flapdoodle.embed.mongo.config.Net;
import de.flapdoodle.embed.mongo.distribution.Version;
import de.flapdoodle.embed.process.runtime.Network;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoClientFactory;
import org.springframework.boot.autoconfigure.mongo.MongoProperties;
import org.springframework.boot.autoconfigure.mongo.embedded.EmbeddedMongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.io.IOException;

@Configuration
public class DatabaseConfiguration {
    private static final String MONGO_DB_URL = "localhost";
    private static final String MONGO_DB_NAME = "staq_movies";

    private final MongoProperties properties;

    @Autowired
    public DatabaseConfiguration(MongoProperties properties) {
        this.properties = properties;
    }

    @Bean
    public MongoDatabase database(MongoClient mongo) {
        return mongo.getDatabase(MONGO_DB_NAME);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoClient mongo) {
        return new MongoTemplate(mongo, MONGO_DB_NAME);
    }

    @Bean(destroyMethod = "close") @Primary
    public MongoClient mongo(MongodProcess mongodProcess, Environment environment) throws IOException {
        Net net = mongodProcess.getConfig().net();
        properties.setHost(net.getServerAddress().getHostName());
        properties.setPort(net.getPort());
        return new MongoClientFactory(properties, environment).createMongoClient(null);
    }

    @Bean(destroyMethod = "stop")
    public MongodProcess mongodProcess(MongodExecutable embeddedMongoServer) throws IOException {
        return embeddedMongoServer.start();
    }

    @Bean(destroyMethod = "stop")
    public MongodExecutable embeddedMongoServer() throws IOException {
        MongodStarter starter = MongodStarter.getDefaultInstance();

        final int port = Network.getFreeServerPort();

        IMongodConfig mongodConfig = new MongodConfigBuilder()
                .version(Version.Main.V3_4)
                .net(new Net(MONGO_DB_URL, port, Network.localhostIsIPv6()))
                .build();

        return starter.prepare(mongodConfig);
    }
}
