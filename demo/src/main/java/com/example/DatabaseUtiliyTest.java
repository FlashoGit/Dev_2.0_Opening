package com.example;

import java.util.List;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import java.nio.file.*;

public class DatabaseUtiliyTest {
    public static void main(String[] args){
        MongoClient client = MongoClients.create("mongodb+srv://kevinsander2008_db_user:ujioKhe3nbDDrWu5@dev2-0-opening.rgbihdn.mongodb.net/");
        DatabaseUtilities.setDatabase(client.getDatabase("profile_database"));

        Path dir = Paths.get("profiles");

        try{
            List<Path> files = Files.list(dir).toList();

            DatabaseUtilities.insertMultipleProfiles(files);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
