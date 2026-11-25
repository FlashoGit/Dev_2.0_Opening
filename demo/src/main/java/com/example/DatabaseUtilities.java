package com.example;

import java.util.ArrayList;
import java.util.function.*;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CountOptions;
import com.mongodb.client.model.ReplaceOptions;

import org.bson.Document;
import org.bson.conversions.Bson;

import java.nio.file.*;

import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import static com.mongodb.client.model.Filters.*;

public class DatabaseUtilities {
    private static MongoDatabase database;

    public static void setDatabase(MongoDatabase database){
        DatabaseUtilities.database = database;
    }

    public static ArrayList<String> filteredQuery(String queryString){
        System.out.println("Starting filtered query.");

        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        ArrayList<String> matchingProfiles = new ArrayList<String>();
        
        String[] query = queryString.split(" ");
        String key = query[0];
        String operator = query[1];

        FindIterable<Document> result = null;

        //Applies or does not apply a not
        Function<Bson, Bson> notLambda;

        if(operator.charAt(0) == '!'){
            notLambda = x -> not(x);
            operator = operator.substring(1);
        }
        else{
            notLambda = x -> x;
        }
        
        try{
            switch(operator){
                case "str=":
                    result = profileCollection.find(notLambda.apply(eq(key, query[2])));
                    break;
                case "=":
                    result = profileCollection.find(notLambda.apply(eq(key, Integer.parseInt(query[2]))));
                    break;
                case ">":
                    result = profileCollection.find(notLambda.apply(gt(key, Integer.parseInt(query[2]))));
                    break;
                case "<":
                    result = profileCollection.find(notLambda.apply(lt(key, Integer.parseInt(query[2]))));
                    break;
                case ">=":
                    result = profileCollection.find(notLambda.apply(gte(key, Integer.parseInt(query[2]))));
                    break;
                case "<=":
                    result = profileCollection.find(notLambda.apply(lte(key, Integer.parseInt(query[2]))));
                    break;
                //This range is exclusive
                case "range":
                    result = profileCollection.find(notLambda.apply(and(gt(key, Integer.parseInt(query[2])), lt(key, Integer.parseInt(query[3])))));
                    break;
                default:
                    System.out.println("Invalid operator");
            }
        }
        catch(Exception e){
            System.out.println(e);
        }

        for(Document doc : result){
            System.out.println("boop");
            matchingProfiles.add(doc.getString("json"));
            System.out.println("beep");
            System.out.println(doc.getString("json"));
        }

        System.out.println("Returning matching profiles");

        return matchingProfiles;
    }

    //Returns the json string of the profile of the matching name
    public static String queryProfile(String name){
        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        //Query and store the disired profile.
        Document profile = profileCollection.find(eq("name", name)).first();

        System.out.println(profile);

        //Return the json as a string
        return profile.getString("json");
    }

    //Returns true if there is a match, false if there is not
    public static boolean isMatch(String query){
        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        //Query and if there are at least one document.
        //return this value
        boolean match = profileCollection.countDocuments(eq("file", query), new CountOptions()) > 0;

        System.out.println(match);

        //Return the json as a string
        return match;
    }

    //Creates profile if it doesn't exists and updates its contents if it does.
    public static void replaceProfile(byte[] buffer, String fileName){
        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        //Create an ObjectMapper to convert the json strings in profiles to an object.
        ObjectMapper mapper = new ObjectMapper();

        try {
            //Map the current profile to a Profile object.
            Profile profile = mapper.readValue(buffer, Profile.class);
            
            //Create documents

            // Create bio_data 
            Document dbBioData = new Document("Name", profile.bio_data.Name)
                                    .append("Age", profile.bio_data.Age)
                                    .append("Gender", profile.bio_data.Gender)
                                    .append("Picture", profile.bio_data.Picture)
                                    .append("Bio_Description", profile.bio_data.Bio_Description);

            //Create Chess_Data
            Document dbChessData = new Document("Chesscom", new Document("Username", profile.Chess_Data.Chesscom.Username)
                                        .append("Time_Control", new Document()
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Blitz.Games_Played))
                                            .append("Bullet", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Bullet.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Bullet.Games_Played)))
                                        .append("fav_time_control", profile.Chess_Data.Chesscom.fav_time_control))
                                    .append("lichess", new Document("time_control", new Document()
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.lichess.time_control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.lichess.time_control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Blitz.Games_Played))
                                            .append("Bullet", new Document("Elo", profile.Chess_Data.lichess.time_control.Bullet.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Bullet.Games_Played)))
                                        .append("fav_time_control", profile.Chess_Data.lichess.fav_time_control))
                                    .append("FIDE", new Document("time_control", new Document()
                                            .append("Classical", new Document("Elo", profile.Chess_Data.FIDE.time_control.Classical.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.FIDE.time_control.Classical.Games_Played))
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.FIDE.time_control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.FIDE.time_control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.FIDE.time_control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.FIDE.time_control.Blitz.Games_Played)))
                                        .append("Fav_Time_Control", profile.Chess_Data.FIDE.Fav_Time_Control));

            //Create Location_Data
            Document dbLocationData = new Document("City", profile.Location_Data.City);

            //Create Account_Data
            Document dbAccountData = new Document()
                                        .append("Username", profile.Account_Data.Username)
                                        .append("Password", profile.Account_Data.Password)
                                        .append("Chat_ID", profile.Account_Data.Chat_ID);

            //Create an element.
            Document dbProfile = new Document("file", fileName)
                                    .append("json", new String(buffer))
                                    .append("bio_data", dbBioData)
                                    .append("Chess_Data", dbChessData)
                                    .append("Location_Data", dbLocationData)
                                    .append("Account_Data", dbAccountData);

            //Write the element to the collection.
            profileCollection.replaceOne(eq("file", fileName), dbProfile, new ReplaceOptions().upsert(true));
        }
        catch (Exception e){
            System.out.println("Failed to map the profile to an object.");
            System.out.println(e);
        }
    }

    public static void insertProfile(Path file){
        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        //Create an ObjectMapper to convert the json strings in profiles to an object.
        ObjectMapper mapper = new ObjectMapper();

        try {
            //Parse file into byte[].
            byte[] buffer = Files.readAllBytes(file);

            //Map the current profile to a Profile object.
            Profile profile = mapper.readValue(buffer, Profile.class);
            
            //Create documents

            // Create bio_data (added Gender, which was in the JSON but missing from your snippet)
            Document dbBioData = new Document("Name", profile.bio_data.Name)
                                    .append("Age", profile.bio_data.Age)
                                    .append("Gender", profile.bio_data.Gender)
                                    .append("Picture", profile.bio_data.Picture)
                                    .append("Bio_Description", profile.bio_data.Bio_Description);

            //Create Chess_Data
            Document dbChessData = new Document("Chesscom", new Document("Username", profile.Chess_Data.Chesscom.Username)
                                        .append("Time_Control", new Document()
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Blitz.Games_Played))
                                            .append("Bullet", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Bullet.Elo)
                                                                .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Bullet.Games_Played)))
                                        .append("fav_time_control", profile.Chess_Data.Chesscom.fav_time_control))
                                    .append("lichess", new Document("time_control", new Document()
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.lichess.time_control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.lichess.time_control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Blitz.Games_Played))
                                            .append("Bullet", new Document("Elo", profile.Chess_Data.lichess.time_control.Bullet.Elo)
                                                                .append("Games_Played", profile.Chess_Data.lichess.time_control.Bullet.Games_Played)))
                                        .append("fav_time_control", profile.Chess_Data.lichess.fav_time_control))
                                    .append("FIDE", new Document("time_control", new Document()
                                            .append("Classical", new Document("Elo", profile.Chess_Data.FIDE.time_control.Classical.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.FIDE.time_control.Classical.Games_Played))
                                            .append("Rapid", new Document("Elo", profile.Chess_Data.FIDE.time_control.Rapid.Elo)
                                                                .append("Games_Played", profile.Chess_Data.FIDE.time_control.Rapid.Games_Played))
                                            .append("Blitz", new Document("Elo", profile.Chess_Data.FIDE.time_control.Blitz.Elo)
                                                                .append("Games_Played", profile.Chess_Data.FIDE.time_control.Blitz.Games_Played)))
                                        .append("Fav_Time_Control", profile.Chess_Data.FIDE.Fav_Time_Control));

            //Create Location_Data
            Document dbLocationData = new Document("City", profile.Location_Data.City);

            //Create Account_Data
            Document dbAccountData = new Document()
                                        .append("Username", profile.Account_Data.Username)
                                        .append("Password", profile.Account_Data.Password)
                                        .append("Chat_ID", profile.Account_Data.Chat_ID);

            //Create an element.
            Document dbProfile = new Document()
                                    .append("json", new String(buffer))
                                    .append("bio_data", dbBioData)
                                    .append("Chess_Data", dbChessData)
                                    .append("Location_Data", dbLocationData)
                                    .append("Account_Data", dbAccountData);

            //Write the element to the collection.
            profileCollection.insertOne(dbProfile);
        }
        catch (Exception e){
            System.out.println("Failed to map the profile to an object.");
            System.out.println(e);
        }
        
    }
    public static void insertMultipleProfiles(List<Path> files){
        //Get the profile collection from the database (so we can write our profiles to it).
        MongoCollection<Document> profileCollection = database.getCollection("profiles");

        //Create an ObjectMapper to convert the json strings in profiles to an object.
        ObjectMapper mapper = new ObjectMapper();

        //Iterate through the profiles.
        for(Path file : files){
            try {
                //Parse file into byte[].
                byte[] buffer = Files.readAllBytes(file);

                //Map the current profile to a Profile object.
                Profile profile = mapper.readValue(buffer, Profile.class);
                
                //Create documents

                // Create bio_data (added Gender, which was in the JSON but missing from your snippet)
                Document dbBioData = new Document("Name", profile.bio_data.Name)
                                        .append("Age", profile.bio_data.Age)
                                        .append("Gender", profile.bio_data.Gender)
                                        .append("Picture", profile.bio_data.Picture)
                                        .append("Bio_Description", profile.bio_data.Bio_Description);

                //Create Chess_Data
                Document dbChessData = new Document("Chesscom", new Document("Username", profile.Chess_Data.Chesscom.Username)
                                            .append("Time_Control", new Document()
                                                .append("Rapid", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Rapid.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Rapid.Games_Played))
                                                .append("Blitz", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Blitz.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Blitz.Games_Played))
                                                .append("Bullet", new Document("Elo", profile.Chess_Data.Chesscom.Time_Control.Bullet.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.Chesscom.Time_Control.Bullet.Games_Played)))
                                            .append("fav_time_control", profile.Chess_Data.Chesscom.fav_time_control))
                                        .append("lichess", new Document("time_control", new Document()
                                                .append("Rapid", new Document("Elo", profile.Chess_Data.lichess.time_control.Rapid.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.lichess.time_control.Rapid.Games_Played))
                                                .append("Blitz", new Document("Elo", profile.Chess_Data.lichess.time_control.Blitz.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.lichess.time_control.Blitz.Games_Played))
                                                .append("Bullet", new Document("Elo", profile.Chess_Data.lichess.time_control.Bullet.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.lichess.time_control.Bullet.Games_Played)))
                                            .append("fav_time_control", profile.Chess_Data.lichess.fav_time_control))
                                        .append("FIDE", new Document("time_control", new Document()
                                                .append("Classical", new Document("Elo", profile.Chess_Data.FIDE.time_control.Classical.Elo)
                                                                        .append("Games_Played", profile.Chess_Data.FIDE.time_control.Classical.Games_Played))
                                                .append("Rapid", new Document("Elo", profile.Chess_Data.FIDE.time_control.Rapid.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.FIDE.time_control.Rapid.Games_Played))
                                                .append("Blitz", new Document("Elo", profile.Chess_Data.FIDE.time_control.Blitz.Elo)
                                                                    .append("Games_Played", profile.Chess_Data.FIDE.time_control.Blitz.Games_Played)))
                                            .append("Fav_Time_Control", profile.Chess_Data.FIDE.Fav_Time_Control));

                //Create Location_Data
                Document dbLocationData = new Document("City", profile.Location_Data.City);

                //Create Account_Data
                Document dbAccountData = new Document()
                                            .append("Username", profile.Account_Data.Username)
                                            .append("Password", profile.Account_Data.Password)
                                            .append("Chat_ID", profile.Account_Data.Chat_ID);

                //Create an element.
                Document dbProfile = new Document()
                                        .append("json", new String(buffer))
                                        .append("bio_data", dbBioData)
                                        .append("Chess_Data", dbChessData)
                                        .append("Location_Data", dbLocationData)
                                        .append("Account_Data", dbAccountData);

                //Write the element to the collection.
                profileCollection.insertOne(dbProfile);
            }
            catch (Exception e){
                System.out.println("Failed to map the profile to an object.");
                System.out.println(e);
            }
        }
    }
}
