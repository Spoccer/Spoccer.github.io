
/**
 * Write a description of class FileDemoRunner here.
 * 
 * @author (your name) 
 * @version (a version number or a date)
 */
public class FileDemoRunner
{
    //--------MAIN METHOD (Makes it runnable)---------------
    public static void main(String[] args)
    {
        FileDemo myObj = new FileDemo();
        myObj.writeLineToFile("test2011.txt","THIS IS NEW!");
        myObj.openFile("test2011.txt");
        myObj.readFileByWords();
        myObj.printData();
    }
}
