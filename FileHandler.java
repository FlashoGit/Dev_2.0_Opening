import com.sun.net.httpserver.*;

abstract public class FileHandler implements HttpHandler {
    protected int requestHeaderLength;

    FileHandler(String requestHeader){
        this.requestHeaderLength = requestHeader.length();
    }
}//beaker
