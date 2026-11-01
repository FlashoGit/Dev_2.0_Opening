import com.sun.net.httpserver.*;

abstract public class JsonFileHandler implements HttpHandler {
    protected int requestHeaderLength;

    JsonFileHandler(String requestHeader){
        this.requestHeaderLength = requestHeader.length();
    }

    static JsonFileHandler getFileHandler(String requestHeader, String requestType) throws Exception{
        switch(requestType){
            case "POST":
                return new PostHandler(requestHeader);
            case "GET":
                return new GetHandler(requestHeader);
            default:
                throw new Exception("Request unsupported");
        }
    }
}
