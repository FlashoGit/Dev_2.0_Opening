import java.io.IOException;
import java.io.OutputStream;

import java.nio.file.*;

import com.sun.net.httpserver.*;

public class ScriptFileHandler implements HttpHandler {
    private String scriptPath;

    ScriptFileHandler(String scriptPath){
        this.scriptPath = scriptPath;
    }

    @Override 
    public void handle(HttpExchange exchange){
        try{
            // Read contents of scriptPath.
            byte[] script = Files.readAllBytes(Paths.get(this.scriptPath));

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
