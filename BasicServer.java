import com.sun.net.httpserver.*;

import java.net.InetSocketAddress;

import java.io.IOException;

public class BasicServer {
    public static void main(String args[]){
        try{
            HttpServer server = HttpServer.create(new InetSocketAddress("0.0.0.0", 8080), 0);

            server.createContext("/", new HtmlFileHandler("start.html"));
            server.createContext("/test.js", new ScriptFileHandler("test.js"));

            server.setExecutor(null);
            server.start();
            System.out.println("Server started.");
        }
        catch(IOException e){
            System.out.println(e);
        }
        


    }
}