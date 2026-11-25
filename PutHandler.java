import java.io.IOException;
import java.io.InputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class PutHandler extends FileHandler {
    PutHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Get inputstream from the POST request.
            InputStream inputStream = exchange.getRequestBody();
            //Store the inputStream in a String.
            byte[] buffer = inputStream.readAllBytes();

            //Close the inputstream.
            inputStream.close();

            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            //Define the file path to store the file at.
            Path filePath = Paths.get(uriString.substring(requestHeaderLength));

            //Write the string into the file.
            Files.write(filePath, buffer);
        }
        catch(IOException e){
            System.out.println(e);
        }
    }//clementine
}
