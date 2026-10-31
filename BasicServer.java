import com.sun.net.httpserver.*;

import java.net.InetSocketAddress;

import java.io.IOException;

public class BasicServer {
    private String name;

    BasicServer(ServerNetworkEnum networkMode) throws Exception{
        switch(networkMode){
            case LOCAL:
                this.name = "127.0.0.1";
                break;
            case LAN:
                this.name = "0.0.0.0";
                break;
            default:
                throw new Exception("Network mode unsupported.");
        }
    }

    public void start(){
        try{
            HttpServer server = HttpServer.create(new InetSocketAddress(this.name, 8080), 0);

            server.createContext("/", new StartFileHandler("start.html"));
            server.createContext("/script", new ScriptFileHandler("/script/"));
            server.createContext("/json_post", JsonFileHandler.getFileHandler("/json_post/", "POST"));
            server.createContext("/json_get", JsonFileHandler.getFileHandler("/json_get/", "GET"));


            server.setExecutor(null);
            server.start();
            System.out.println("Server started.");
        }
        catch(IOException e){
            System.out.println(e);
        }
        catch(Exception e){
            System.out.println(e);
        }
    }
}