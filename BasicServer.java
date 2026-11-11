import com.sun.net.httpserver.*;

import java.net.InetSocketAddress;

import java.io.IOException;

public class BasicServer {
    private String url;

    BasicServer(ServerNetworkEnum networkMode) throws Exception{
        switch(networkMode){
            case LOCAL:
                this.url = "127.0.0.1";
                break;
            case LAN:
                this.url = "0.0.0.0";
                break;
            default:
                throw new Exception("Network mode unsupported.");
        }
    }

    public void start(){
        try{
            HttpServer server = HttpServer.create(new InetSocketAddress(this.name, 8080), 0);

            server.createContext("/", new DefaultHandler());
            server.createContext("/script", new GetHandler("/script/"));
            server.createContext("/json_post", new GetHandler("/json_post/"));
            server.createContext("/json_get", new PostHandler("/json_get/"));


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