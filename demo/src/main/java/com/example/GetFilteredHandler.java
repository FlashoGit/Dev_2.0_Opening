package com.example;

import java.util.ArrayList;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.*;

public class GetFilteredHandler extends FileHandler{
    GetFilteredHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Debug print.
            System.out.println("Handling GET filtered request.");

            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            OutputStream os = exchange.getResponseBody();

            System.out.println("This is the URI substring for the file: " + uriString.substring(requestHeaderLength));

            ArrayList<String> profiles = DatabaseUtilities.filteredQuery(uriString.substring(requestHeaderLength));

            //This is initialized to 6 for '[' and 'null]'
            int requestLength = 6;

            for(String profile : profiles){
                requestLength += profile.length() + 1;
                System.out.println(profile);
            }

            exchange.getResponseHeaders().set("Content-Type", "text/json; charset=utf-8");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");

            //Send a the response header.
            exchange.sendResponseHeaders(200, requestLength);

            //Write the opening bracket '[' to the response body
            os.write(0x5B);

            for(String profile : profiles){
                os.write(profile.getBytes(StandardCharsets.UTF_8));
                System.out.println(profile);
                os.write(0x2C);
            }

            os.write(new byte[] {0x6E, 0x75, 0x6C, 0x6C, 0x5D});
            
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}
