package nl.quintor.staq.graphql.movies.config;

import com.mongodb.Function;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class DatasetImporter {

    private static final Logger LOG = LoggerFactory.getLogger(DatasetImporter.class);
    private static final int DATABASE_BATCH_SIZE = 500;

    private final ResourceLoader resourceLoader;
    private final MongoDatabase database;

    @Autowired
    public DatasetImporter(WebApplicationContext resourceLoader, MongoDatabase database) {
        this.resourceLoader = resourceLoader;
        this.database = database;
    }

    @PostConstruct
    public void init() throws IOException {
        importFile("movies.csv", "movies", record -> new Document()
                .append("_id", Integer.parseInt(record.get("movieId")))
                .append("title", record.get("title"))
                .append("genres", Arrays.asList(record.get("genres").split("\\|"))));

        importFile("ratings.csv", "ratings", record -> new Document()
                .append("userId", Integer.parseInt(record.get("userId")))
                .append("movieId", Integer.parseInt(record.get("movieId")))
                .append("rating", Double.parseDouble(record.get("rating")))
                .append("timestamp", Long.parseLong(record.get("timestamp"))));

        importFile("tags.csv", "tags", record -> new Document()
                .append("userId", Integer.parseInt(record.get("userId")))
                .append("movieId", Integer.parseInt(record.get("movieId")))
                .append("tag", record.get("tag"))
                .append("timestamp", Long.parseLong(record.get("timestamp"))));

        importFile("links.csv", "links", record -> new Document()
                .append("movieId", Integer.parseInt(record.get("movieId")))
                .append("imdbId", record.get("imdbId"))
                .append("tmdbId", record.get("tmdbId")));
    }

    private void importFile(String fileName, String collectionName, Function<CSVRecord, Document> mapper) throws IOException {
        MongoCollection<Document> collection = database.getCollection(collectionName);
        List<Document> documentBatch = new ArrayList<>(DATABASE_BATCH_SIZE);

        if(collection.count() == 0) {
            LOG.info("Importing dataset " + fileName);
        }

        for(CSVRecord record : parse(fileName)) {
            addDocumentToBatch(mapper.apply(record), documentBatch, collection);
        }

        if(!documentBatch.isEmpty()) {
            collection.insertMany(documentBatch);
        }
    }

    private void addDocumentToBatch(Document document, List<Document> documentBatch, MongoCollection<Document> collection) {
        if(documentBatch.size() >= DATABASE_BATCH_SIZE) {
            collection.insertMany(documentBatch);
            documentBatch.clear();
        }
        documentBatch.add(document);
    }

    private CSVParser parse(String fileName) throws IOException {
        Resource dataFile = resourceLoader.getResource("classpath:dataset/" + fileName);
        return CSVParser.parse(dataFile.getURL(), StandardCharsets.UTF_8, CSVFormat.DEFAULT.withFirstRecordAsHeader());
    }
}
