package edu.uprm.cse.ths.testtwitter;

import twitter4j.*;
import twitter4j.auth.AccessToken;
import twitter4j.conf.ConfigurationBuilder;

/**
 * Hello world!
 *
 */
public class App 
{
    public static void main( String[] args )
    {

        System.out.println( "Twitter test Application" );
        //set up the credentials to listen to the tweets
        ConfigurationBuilder cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey("xSL5FtNNrXqYtj0qyLBAoEHJF")
                .setOAuthConsumerSecret("MlAkJxyGxAfJZ28HZxXu8XSWZpVG8zDepkTYdjqyoArPpdRM22")
                .setOAuthAccessToken("81409457-zSbn3elxFuBregKhjQQ4l3quNzLEuaA9KnKGgZ23l")
                .setOAuthAccessTokenSecret("i7frmi03QOrr0XBZ2t7jOgsHfwCmvGwIV6hkXW36EuD49");

        // create the factory for streams
        TwitterStreamFactory factory = new TwitterStreamFactory(cb.build());
        TwitterStream twitterStream = factory.getInstance();
        twitterStream.addListener(new StatusListener() {
            public void onStatus(Status status) {
                String text = status.getText();
                if (text.contains("Hillary")) {
                    System.out.println("Hillary-> " + status.getUser().getName() + " : " + status.getText());
                }
                else if (text.contains("Zika")) {
                    System.out.println("Zika-> " + status.getUser().getName() + " : " + status.getText());
                }
            }

            public void onDeletionNotice(StatusDeletionNotice statusDeletionNotice) {

            }

            public void onTrackLimitationNotice(int i) {

            }

            public void onScrubGeo(long l, long l1) {

            }

            public void onStallWarning(StallWarning stallWarning) {

            }

            public void onException(Exception e) {
                e.printStackTrace();
            }
        });

        twitterStream.sample();

    }
}
