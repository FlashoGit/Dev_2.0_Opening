package com.example;

import java.net.InetSocketAddress;

import java.io.IOException;

import com.mongodb.client.*;
import com.sun.net.httpserver.HttpServer;

public class BasicServer {
    private String url;
    private final String MONGO_DB_CONNECTION_STRING = "mongodb+srv://kevinsander2008_db_user:ujioKhe3nbDDrWu5@dev2-0-opening.rgbihdn.mongodb.net/";

    BasicServer(ServerNetworkEnum networkMode) throws Exception{
        switch(networkMode){
            case LOCAL:
                this.url = "127.0.0.1";
                break;
            case LAN:
                this.url = "0.0.0.0";
                break;
            default:
                throw new Exception("Network mode unsupported.");
        }
    }

    public void start(){
        try{
            HttpServer server = HttpServer.create(new InetSocketAddress(this.url, 8080), 0);

            //Connect to the database
            MongoClient client = MongoClients.create(MONGO_DB_CONNECTION_STRING);

            //Set the database for the interface for inteacting with the database.
            DatabaseUtilities.setDatabase(client.getDatabase("profile_database"));

            server.createContext("/", new DefaultHandler());
            server.createContext("/script", new GetHandler("/script/"));
            server.createContext("/json_put", new PutHandler("/json_put/"));
            server.createContext("/json_get", new GetHandler("/json_get/"));
            server.createContext("/json_gets", new GetMultipleHandler("/json_gets/"));
            server.createContext("/filtered_get", new GetFilteredHandler("/filtered_get/"));

            server.setExecutor(null);
            server.start();
            System.out.println("Server started.");
        }
        catch(IOException e){
            System.out.println(e);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}