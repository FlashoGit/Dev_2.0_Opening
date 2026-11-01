import java.io.IOException;
import java.io.InputStream;

import java.nio.file.*;
import java.nio.charset.StandardCharsets;

import com.sun.net.httpserver.*;

public class PostHandler extends JsonFileHandler {
    PostHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Get inputstream from the POST request.
            InputStream inputStream = exchange.getRequestBody();
            //Store the inputStream in a String.
            String jsonString = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

            //Close the inputstream.
            inputStream.close();

            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            //Define the file path to store the JSON at.
            Path filePath = Paths.get(uriString.substring(requestHeaderLength));

            //Write the string into the file.
            Files.writeString(filePath, jsonString);
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
