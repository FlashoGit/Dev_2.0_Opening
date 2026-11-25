public class Main {
    public static void main(String args[]){
        try{
            BasicServer server = new BasicServer(ServerNetworkEnum.LOCAL);

            server.start();
        }
        catch(Exception e){
            System.out.println(e);
        }
    }//spatula
}
