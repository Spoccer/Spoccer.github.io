import java.util.Scanner;
import java.io.FileReader;

import java.io.PrintWriter;
import java.io.FileWriter;

import java.util.ArrayList;

public class FileDemo
{
    private Scanner file;
    private ArrayList<String> theList = new ArrayList<String>();
   
    //****************************************************
    public void openFile(String fileName)
    {
        try 
        { 
            file = new Scanner(new FileReader(fileName) ); 
        }
        catch (java.io.FileNotFoundException e) 
        {
            System.out.println("Unable to open file.");
        }
    }        
    
    //****************************************************
    public void readFileByWords()
    {
        while( file.hasNext() )
        {
            theList.add(file.next());
            System.out.println( "Read a word: "+theList.get(theList.size()-1) );
        }
    }

    //****************************************************
    public void printData()
    {
        System.out.println("The sorted results are:");
        for(int z=0;z<theList.size();z++)
        {
            System.out.println(theList.get(z));
        }
    }
    
    //****************************************************
    public void writeLineToFile(String fileName, String line) 
    {
        PrintWriter out = null;
        try
        {
            out = new PrintWriter (new FileWriter(fileName, true));
        }
        catch (java.io.IOException e)
        {
            System.out.println("Unable to open file.");
        }
        
        out.println(line);
        out.close();
    }
    
} //--end of FileDemo class--
