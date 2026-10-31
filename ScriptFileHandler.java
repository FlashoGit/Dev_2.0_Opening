import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class ScriptFileHandler implements HttpHandler {
    private int requestHeaderLength;

    ScriptFileHandler(String requestHeader){
        this.requestHeaderLength = requestHeader.length();
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //Define URI as a string.
            String uriString = exchange.getRequestURI().getPath();

            // Read contents of scriptPath.
            byte[] script = Files.readAllBytes(Paths.get((uriString.substring(requestHeaderLength))));

            System.out.println("Getting script.");

            exchange.sendResponseHeaders(200, script.length);

            // Write contents of scriptPath.
            OutputStream os = exchange.getResponseBody();
            os.write(script);
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
