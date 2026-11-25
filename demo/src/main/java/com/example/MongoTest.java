package com.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MongoTest {
    public static void main(String[] args) {
        String uri = "mongodb+srv://kevinsander2008_db_user:ujioKhe3nbDDrWu5@dev2-0-opening.rgbihdn.mongodb.net/";
        //Connect to the Database
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            //Get interface to the database
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");

            //Get the "users" collection
            MongoCollection<Document> users = database.getCollection("users");

            //Create an entry
            Document user = new Document("name", "The Yammer")
                .append("size", "smol")
                .append("age", "3.5");
            
            //Write the entry
            users.insertOne(user);
        }
        catch(Exception e){
            System.out.println("Could not connect to the database.");
            System.out.println(e);
        }
    }
}
