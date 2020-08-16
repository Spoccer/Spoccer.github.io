package src; 

import java.io.FileReader;
import java.util.ArrayList;
import java.util.Scanner;

/**
 *
 * @author spockm
 */
public class EvilHangman 
{
    private ArrayList<String> currentWordList = new ArrayList<String>();
    private ArrayList<String> lettersInWord = new ArrayList<String>();
    private int numGuessesRemaining; 

    public void initializeGame()
    {
        //Load the currentWordList from the dictionary file
        //Choose a hidden word length
        //Initialize the lettersInWord to have the correct number of blanks
        //loop through currentWordList
            //remove any words that are not the right length.
        //reset variables (num of guesses remaining)
    }
    
    
    public void loadDictionary()
    {
        Scanner file;
        try 
        { 
            file = new Scanner(new FileReader("dictionary.txt") ); 
            while( file.hasNext() )
            {
                currentWordList.add(file.next());
                System.out.println( "Read a word: "+currentWordList.get(currentWordList.size()-1) );
            }
        }
        catch (java.io.FileNotFoundException e) 
        {
            System.out.println("Unable to open file.");
        }
        
    }
    
    public void getNextLetterGuess()
    {
        
    }
    
    public void pairDownDictionary(char guess)
    {
        ArrayList<ArrayList<String>> manyLists = new ArrayList<ArrayList<String>>();
        //loop through each word in the currentWordList
          //see if the current word matches the pattern in a list within manyLists
            //if so, add it to that list
            //if not, add a new list to manyLists. 
        //find the longest list in manyLists, make it the new currentWordList
        //update the shown letters and game status to match
    }
    
    /**
     * This method checks to see if a word uses a letter in the same way as
     * another word. 
     * @param letter - the current guess
     * @param word - a word from the currentWordList
     * @param wordFromList - the top word in a list of manyLists
     * @return true if the two words use the letter in the same way
     */
    public boolean wordPatternMatch(char letter, String word, String wordFromList)
    {
        //
        
        return false;
    }
    
    public void displayGameStatus()
    {
        //Show turns left, known and unknown letters, and any other game status.
    }
}
