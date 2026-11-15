import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class GetHandler extends FileHandler {
    GetHandler(String requestHeader){
        super(requestHeader);
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Debug print.
            System.out.println("Handling GET request.");

            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            //Read contents of the requested file path (ideally a JSON).
            byte[] buffer = Files.readAllBytes(Paths.get(uriString.substring(requestHeaderLength)));

            //Populate the response header.
            switch(uriString.substring(0, requestHeaderLength - 1)){
                case "/script":
                    exchange.getResponseHeaders().set("Content-Type", "text/javascript; charset=utf-8");
                    break;
                case "/json_get":
                    exchange.getResponseHeaders().set("Content-Type", "text/json; charset=utf-8");
                    break;
                default:
                    System.out.println("Unsupported file.");
            }
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");

            //Send a the response header.
            exchange.sendResponseHeaders(200, buffer.length);

            //Write contents of scriptPath.
            OutputStream os = exchange.getResponseBody();
            os.write(buffer);
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
