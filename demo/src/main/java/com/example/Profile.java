package com.example;

public class Profile {
    public BioData bio_data;
    public ChessData Chess_Data;
    public LocationData Location_Data;
    public AccountData Account_Data;

    public Profile() {}

    public Profile(BioData bd, ChessData cd, LocationData ld, AccountData ad){
        this.bio_data = bd;
        this.Chess_Data = cd;
        this.Location_Data = ld;
        this.Account_Data = ad;
    }

    public static class BioData {
        public String Name;
        public int Age;
        public String Gender;
        public String Picture;
        public String Bio_Description;
    }
    public static class ChessData{
        public Chesscom Chesscom;
        public LiChess lichess;
        public FIDE FIDE;
    }
    public static class LocationData {
        public String City;
    }
    public static class AccountData {
        public String Username;
        public String Password;
        public String Chat_ID;
    }
    public static class Chesscom {
        public String Username;
        public NonFIDETimeControl Time_Control;
        public String fav_time_control;
    }
    public static class LiChess {
        public String Username;
        public NonFIDETimeControl time_control;
        public String fav_time_control;
    }
    public static class FIDE {
        public FIDETimeControl time_control;
        public String Fav_Time_Control;
    }
    public static class NonFIDETimeControl {
        public Rapid Rapid;
        public Blitz Blitz;
        public Bullet Bullet;
    }
    public static class FIDETimeControl {
        public Classical Classical;
        public Rapid Rapid;
        public Blitz Blitz;
    }
    public static class Classical {
        public int Elo;
        public int Games_Played;
    }
    public static class Rapid {
        public int Elo;
        public int Games_Played;
    }
    public static class Blitz {
        public int Elo;
        public int Games_Played;
    }
    public static class Bullet {
        public int Elo;
        public int Games_Played;
    }
}
