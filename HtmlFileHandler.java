import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class HtmlFileHandler implements HttpHandler {
    private String htmlPath;

    HtmlFileHandler(String htmlPath){
        this.htmlPath = htmlPath;
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            // Read contents of htmlPath.
            byte[] html = Files.readAllBytes(Paths.get(this.htmlPath));

            exchange.sendResponseHeaders(200, html.length);

            // Write contents of htmlPath.
            OutputStream os = exchange.getResponseBody();
            os.write(html);
            os.close();
        }
        catch(IOException e){
            System.out.println(e);
        }
    }
}
