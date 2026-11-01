import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class StartFileHandler implements HttpHandler {
    private String startHtmlPath;

    StartFileHandler(String startHtmlPath){
        this.startHtmlPath = startHtmlPath;
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            // Read contents of htmlPath.
            byte[] html = Files.readAllBytes(Paths.get(this.startHtmlPath));

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
