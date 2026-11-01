import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class GetHandler extends JsonFileHandler {
    GetHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            System.out.println("Handling GET request.");

            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            // Read contents of the requested file path (ideally a JSON).
            byte[] json = Files.readAllBytes(Paths.get(uriString.substring(requestHeaderLength)));

            exchange.sendResponseHeaders(200, json.length);

            // Write contents of scriptPath.
            OutputStream os = exchange.getResponseBody();
            os.write(json);
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
