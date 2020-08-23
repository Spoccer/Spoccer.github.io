/*
 * BankRunner 8-23-20 Spock
 * 
 */

public class BankRunner
{
    public static void main(String[] args)
    {
        BankAccount theAccount = new BankAccount(100000);
        
        theAccount.withdrawMoney(5000);
        theAccount.getBalance(); //This line is a waste of time. The return value is ignored.
        theAccount.depositMoney(250000);
        double myBalance = theAccount.getBalance();
        System.out.println("The balance is: " + myBalance);
    }
}
        