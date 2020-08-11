import java.util.Scanner;

public class ReplaceDemo 
{
    public static void main(String[] args)
    {              
        Scanner keyboard;
        keyboard = new Scanner(System.in);
        
        System.out.println("What is your name?");
        
        String name = keyboard.next();
        
        name = name.replace('M','Z');

        System.out.println("Hello, " + name);
    }
}