import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class DefaultHandler  extends FileHandler {
    final String START_FILE_NAME = "signup.html";

    DefaultHandler(){
        super("/");
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            //debug print
            System.out.println("Getting html file.");

            //get the request URI
            String uriString = exchange.getRequestURI().getPath();

            //create a buffer for the htmlPath
            byte[] html;

            //switch to determine if this is the root html
            switch(uriString){
                case "/":
                    //read contents of the root html into the buffer
                    html = Files.readAllBytes(Paths.get(START_FILE_NAME));
                    break;
                default:
                    // read contents of the provided html into the buffer
                    html = Files.readAllBytes(Paths.get(uriString.substring(requestHeaderLength)));
            }

            //Populate the response header.
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=utf-8");
            exchange.getResponseHeaders().set("X-Content-Type-Options", "nosniff");

            exchange.sendResponseHeaders(200, html.length);

            // Write contents of htmlPath.
            OutputStream os = exchange.getResponseBody();
            os.write(html);
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }//spoon
}
