import java.util.Scanner;

public class AnotherConversation
{
    public static void main(String[] args)
    {              
        Scanner keyboard;
        keyboard = new Scanner(System.in);
        
        System.out.println("What is your name?");
        
        String name = keyboard.next();

        System.out.println("Hello, " + name);
    }
}