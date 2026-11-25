package com.example;

import java.io.IOException;
import java.io.OutputStream;

import java.util.List;
import java.util.ArrayList;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class GetMultipleHandler extends FileHandler{
    GetMultipleHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Debug print
            System.out.println("Handling GET multiple request.");

            //Store the URI in a string
            String uriString = exchange.getRequestURI().getPath();

            //Store the path of the directory which contains the disired files
            Path dir = Paths.get(uriString.substring(requestHeaderLength));

            //Create an output stream to the response body.
            OutputStream os = exchange.getResponseBody();

            //Create an array list that contains byte arrays so that all buffers can be stored.
            ArrayList<byte[]> buffers = new ArrayList<byte[]>();

            //Create a variable to track length of what was written to the buffers.
            //Note: This is initialized to 6 because the file always has '[' added
            //      and so is "null]" (as bytes not as chars and strings).
            int responseLength = 6;

            //Create stream of file paths to the files in the directory.
            List<Path> paths = Files.list(dir).toList();

            //Iterate through the files paths.
            for(Path path : paths){
                //Store the current file in the buffer.
                byte[] buffer = Files.readAllBytes(path);

                //Add the buffer to the list of buffers.
                buffers.add(buffer);
                responseLength += buffer.length + 1;
            }

            //Populate the response header.
            exchange.getResponseHeaders().set("Content-Type", "text/json; charset-utf-8");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");

            //Send response header.
            exchange.sendResponseHeaders(200, responseLength);  

            //Write the opening bracket '[' to the response body
            os.write(0x5B);
            
            //Loop through buffers
            for(byte[] buffer : buffers){
                //Write the current buffer to the response body
                os.write(buffer);
                os.write(0x2C);
                //System.out.println(new String(buffer));
            }

            //End the response body with "null]" 
            //Note: null is neccessary to keep the JSON syntactically valid due to
            //      , being after every profile.
            os.write(new byte[] {0x6E, 0x75, 0x6C, 0x6C, 0x5D});
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
